/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import db from "database";
import { useHistory } from "react-router-dom";
import { useTransition } from "react-spring";
import {color} from 'style/theme'
import styled from 'styled-components';

import { playersData, teamArray } from "store/players";
import { userReadyState, userIDState, userRoomState, userTeamState } from "store/user";
import { useRecoilValue, useSetRecoilState } from "recoil";

import PlayerWindow from 'components/WaitRoom/PlayerWindow';
import TeamRadios from 'components/WaitRoom/TeamRadios';
import Button from 'components/Global/Button';
import Loading from 'components/Global/Loading';

const Room = styled.div`
        height: 100%;
        box-sizing: border-box;
        padding: 5vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .start_game {
            letter-spacing: 2px;
            font-size: 22px;
            margin-top: 30px;
        }
`

const WaitRoom = () => {
    const history = useHistory();
    const [buttonMessage,setButtonMessage] = useState('');
    const setPlayersData = useSetRecoilState(playersData);
    const userID = useRecoilValue(userIDState);
    const userTeam = useRecoilValue(userTeamState);
    const roomName = useRecoilValue(userRoomState);
    const team = useRecoilValue(teamArray);
    const isUserReady = useRecoilValue(userReadyState);

    useEffect(async() => {
        const roomRef = db.database().ref(`/${roomName}`);
        const playersInfo = roomRef.child('playersInfo');

        await roomRef.child('gameInfo').set(null);
        await playersInfo.once("value", (data) => {
            const playersData = Object.values(data.val());
            const sortedByTimestamp = playersData.sort((a,b) => a.timestamp-b.timestamp);
            const userOrder = sortedByTimestamp.findIndex(data=>data.userID === userID);
            const userDefaultTeam = userOrder === 0 || userOrder === 3 ? '1':'2';
            playersInfo.child(userID).update({ready: false})
            if(!userTeam){
                playersInfo.child(userID).update({team: userDefaultTeam})
            }
        });

        playersInfo.on("value", (data) => {
            const playersData = Object.values(data.val());
            const sortedByTimestamp = playersData.sort((a,b) => a.timestamp-b.timestamp);
            setPlayersData(sortedByTimestamp);

            // 監聽四人都ready時進入遊戲
            const allReady = playersData.filter(data=>data.ready).length === 4;
            if(allReady){
                playersInfo.off();
                enterGame();
            }
        });
    }, []);

    useEffect(()=>{
        if(team.length<4) {
            return setButtonMessage('人數不足⋯⋯');;
        };
        const teamOneAmount = team.filter(team=>team==='1').length;
        const teamTwoAmount = team.filter(team=>team==='2').length;
        if(teamOneAmount !== teamTwoAmount){
            return setButtonMessage('人數不一樣怎麼打！');
        }
        return setButtonMessage('開打！');
    },[team])

    const enterGame = () => {
        history.push(`/${roomName}/game_room/${userID}`);
    }

    const setReady = async (boolean) => {
        if(buttonMessage !== '開打！') return;
        const roomRef = db.database().ref(`/${roomName}`);
        const userInfo = roomRef.child('playersInfo').child(userID);

        await roomRef.child('playersInfo').once("value", async(data) => {
            const playersData = Object.values(data.val());
            const allReady = playersData.filter(data=>data.ready).length === 3;
            if(allReady){
                await roomRef.child('gameInfo').set({nowPlayer: userID});
            }
        })

        userInfo.update({ready: boolean});
    }

    const transitions = useTransition(isUserReady, {
		from: { opacity: 0},
		enter: { opacity: 1 },
		leave: { opacity: 0 }
	});

    return (
        <Room>
            <PlayerWindow />
            <TeamRadios roomName={roomName} userID={userID} />
            <Button
                onClick={()=>setReady(true)}
                color={buttonMessage === '開打！'?`${color.$pink_color}`:`${color.$unable_color}`}
                className="start_game"
            >{buttonMessage}</Button>
            {transitions(
				(props, item) =>
					item && (
						<Loading 
                            cancelReady={()=>setReady(false)}
                            style={props} />
					)
			)}
        </Room>
    )
}

export default WaitRoom;