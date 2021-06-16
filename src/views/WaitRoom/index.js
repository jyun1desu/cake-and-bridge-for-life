/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import db from "database";
import { useHistory } from "react-router-dom";
import { useTransition } from "react-spring";
import {color} from 'style/theme'
import styled from 'styled-components';

import { playersData, teamArray } from "store/players";
import { userReadyState, userIDState, userRoomState, userTeamState, userNameState } from "store/user";
import { themeState } from 'store/theme';
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";

import PlayerWindow from 'components/WaitRoom/PlayerWindow';
import TeamRadios from 'components/WaitRoom/TeamRadios';
import Button from 'components/Global/Button';
import Loading from 'components/Global/Loading';
import ThemeToggler from 'components/Global/ThemeToggler';

const themeData = {
    light: { 
		bg: color.$theme_background,
	},
    dark: { 
		bg: color.$dark_bg_color,
	},
}

const Room = styled.div`
        padding: 5vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: .5s background-color;
        background-color: ${({theme}) => themeData[theme].bg };

        .start_game {
            letter-spacing: 2px;
            font-size: 20px;
            margin-top: 30px;
        }
`

const ReadyButton = ({onClick, className, buttonMessage}) =>  {
    const [theme] = useRecoilState(themeState);

    const getButtonColor = () => {
        switch(theme) {
            case 'light':
            default:
                return buttonMessage === '開打！'
                    ?`${color.$pink_color}`
                    :`${color.$unable_color}`;
            case 'dark': 
                return buttonMessage === '開打！'
                    ? `${color.$fluorescent_pink_color}`
                    : `${color.$dark_dim_border_color}`;
        }
    }

    return (
        <Button
            className={className}
            onClick={onClick}
            color={getButtonColor()}
        >
                {buttonMessage}
        </Button>
    )
}

const WaitRoom = () => {
    const history = useHistory();
    const [theme] = useRecoilState(themeState);
    const [buttonMessage,setButtonMessage] = useState('');
    const setPlayersData = useSetRecoilState(playersData);
    const userID = useRecoilValue(userIDState);
    const userName = useRecoilValue(userNameState);
    const userTeam = useRecoilValue(userTeamState);
    const roomName = useRecoilValue(userRoomState);
    const team = useRecoilValue(teamArray);
    const isUserReady = useRecoilValue(userReadyState);
    const roomRef = db.database().ref(`/${roomName}`);
    const playersInfo = roomRef.child('playersInfo');

    useEffect(async() => {
        await initWaitRoomData();
        await playersInfo.once("value", (data) => {
            const playersData = Object.values(data.val());
            const sortedByTimestamp = playersData.sort((a,b) => a.timestamp-b.timestamp);
            const userOrder = sortedByTimestamp.findIndex(data=>data.userID === userID);
            const userDefaultTeam = userOrder === 0 || userOrder === 3 ? '1':'2';
            if(!userTeam){
                playersInfo.child(userID).update({team: userDefaultTeam})
            }
        });

        playersInfo.on("value", async(data) => {
            const playersData = Object.values(data.val());
            const sortedByTimestamp = playersData.sort((a,b) => a.timestamp-b.timestamp);
            setPlayersData(sortedByTimestamp);

            // 監聽四人都ready時進入遊戲
            const allReady = playersData.filter(data=>data.ready).length === 4;
            if(allReady){
                await enterGame();
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

    const initWaitRoomData = async() => {
        const playersInfo = roomRef.child('playersInfo');
        await playersInfo.child(userID).update({ ready: false })
    }

    const enterGame = async() => {
        await initWaitRoomData();
        history.push(`/${roomName}/game_room/${userID}`);
    }

    const setReady = async (isReady) => {
        if(buttonMessage !== '開打！') return;
        const roomRef = db.database().ref(`/${roomName}`);
        const userInfo = roomRef.child('playersInfo').child(userID);
        await userInfo.update({ ready: isReady });
        if (isReady) {
            await roomRef.child('playersInfo').once("value", async (data) => {
                const playersData = Object.values(data.val());
                const allReady = playersData.filter(data => data.ready).length === 4;
                if (allReady) {
                    await roomRef.child('gameInfo').set({ currentPlayer: userName });
                    roomRef.child('playersInfo').off();
                }
            })
        }
    }

    const transitions = useTransition(isUserReady, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 }
	});

    return (
        <Room
            theme={theme}>
            <ThemeToggler className="on_page"/>
            <PlayerWindow />
            <TeamRadios roomName={roomName} userID={userID} />
            <ReadyButton
                buttonMessage={buttonMessage}
                onClick={()=>setReady(true)}
                className="start_game"
            />
            {transitions(
				(props, item) =>
					item && (<Loading cancelReady={()=>setReady(false)} style={props} />)
			)}
        </Room>
    )
}

export default WaitRoom;