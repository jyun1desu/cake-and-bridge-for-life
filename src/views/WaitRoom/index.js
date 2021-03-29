/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import db from "database";
import {color} from 'style/theme'
import styled from 'styled-components';

import { playersData } from "store/players";
import { useSetRecoilState } from "recoil";

import PlayerWindow from 'components/WaitRoom/PlayerWindow';
import TeamRadios from 'components/WaitRoom/TeamRadios';
import Button from 'components/Global/Button';

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

const WaitRoom = ({ match:{ params }}) => {
    const setPlayersData = useSetRecoilState(playersData)

    React.useEffect(async() => {
        const roomRef = db.database().ref(`/${params.roomName}`);
        const playersInfo = roomRef.child('playersInfo');

        await playersInfo.once("value", (data) => {
            const userID = params.userID;
            const playersData = Object.values(data.val());
            const sortedByTimestamp = playersData.sort((a,b) => a.timestamp-b.timestamp);
            const userOrder = sortedByTimestamp.findIndex(data=>data.userID === userID);
            const userDefaultTeam = userOrder === 0 || userOrder === 3 ? '1':'2';
            playersInfo.child(userID).update({team: userDefaultTeam})
        });

        playersInfo.on("value", (data) => {
            const playersData = Object.values(data.val());
            const sortedByTimestamp = playersData.sort((a,b) => a.timestamp-b.timestamp);
            setPlayersData(sortedByTimestamp)
        });

        return () => playersInfo.off();
    }, [])

    return (
        <Room>
            <PlayerWindow className="cool" />
            <TeamRadios />
            <Button
                color={`${color.$pink_color}`}
                className="start_game"
            >開打！</Button>
        </Room>
    )
}

export default WaitRoom;