import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import db from "database";
import styled from 'styled-components';
import { color } from "style/theme";
import newDeck from 'util/deck';
import { userIndexState, userRoomState } from 'store/user';
import { userDeckState } from 'store/deck';
import { themeState  } from 'store/theme';
import { currentPlayerName, thisRoundSuitState } from 'store/game';
import ModalRoot from 'components/GameRoom/Modal/ModalRoot';
import Cards from 'components/GameRoom/Cards';
import CardTable from 'components/GameRoom/CardTable';
import MainInfo from 'components/GameRoom/MainInfo';
import Navbar from 'components/GameRoom/Navbar';

const Room = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        transition: .5s background-color;
        background-color: ${({theme}) => themeData[theme].bg };
`

const themeData = {
    light: { bg: '#f3e9e9'},
    dark: { bg: color.$dark_bg_color},
}

const GameRoom = () => {
    const [theme] = useRecoilState(themeState);
    const userIndex = useRecoilValue(userIndexState);
    const setUserDeck = useSetRecoilState(userDeckState);
    const setNowPlayerState = useSetRecoilState(currentPlayerName);
    const setThisRoundSuit = useSetRecoilState(thisRoundSuitState);
    const roomName = useRecoilValue(userRoomState);
    const roomRef = db.database().ref(`/${roomName}`);

    useEffect(()=>{
        dealDeck();
        listenOnCurrentPlayer();
        listenOnThisRoundSuit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const dealDeck = async () => {
        const gameInfoRef = roomRef.child('gameInfo');
        if(userIndex === 3){
            await gameInfoRef.update({deck: newDeck});
        };

        gameInfoRef.child('deck').on("value",(data) => {
            const deck = data.val();
            if(deck){
                setUserDeck(deck[userIndex]);
                gameInfoRef.child('deck').off();
            }
        })
    };

    const listenOnCurrentPlayer = () => {
        const currentPlayerRef = roomRef.child('gameInfo').child('currentPlayer');
        currentPlayerRef.on("value",(data) => {
            const nowPlayerID = data.val();
            setNowPlayerState(nowPlayerID);
        })
    };

    const listenOnThisRoundSuit = () => {
        const roundSuitRef = roomRef.child('gameInfo').child('thisRoundSuit');
        roundSuitRef.on("value",(data) => {
            const roundSuit = data.val();
            if(roundSuit) {
                setThisRoundSuit(roundSuit)
            }
        })
    };

    return (
    <Room theme={theme} className="game_room">
        <Cards />
        <CardTable />
        <MainInfo />
        <ModalRoot />
        <Navbar />
    </Room>)
}

export default GameRoom;