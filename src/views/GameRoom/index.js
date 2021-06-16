import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import db from "database";
import styled from 'styled-components';
import { color } from "style/theme";
import { generateNewDeck } from 'util/deck';
import useInitData from "util/hook/useInitData";
import { userIndexState, userRoomState } from 'store/user';
import { modalState } from 'store/modal';
import { userDeckState, otherPlayerDeckState } from 'store/deck';
import { themeState  } from 'store/theme';
import { relationWithUser } from 'store/players';
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
    const [,{ initGameRoomData }] = useInitData();
    const userIndex = useRecoilValue(userIndexState);
    const setUserDeck = useSetRecoilState(userDeckState);
    const setOtherPlayerDeck = useSetRecoilState(otherPlayerDeckState);
    const { nextPlayer, teammate, previousPlayer } = useRecoilValue(relationWithUser);
    const setModalType = useSetRecoilState(modalState);
    const setNowPlayerState = useSetRecoilState(currentPlayerName);
    const setThisRoundSuit = useSetRecoilState(thisRoundSuitState);
    const roomName = useRecoilValue(userRoomState);
    const roomRef = db.database().ref(`/${roomName}`);

    useEffect(()=>{
        initGameData();
        listenOnCurrentPlayer();
        listenOnThisRoundSuit();
        listenOnChangeRouteEvent();

        return () => {
            removeListeners();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const initGameData = async () => {
        const gameInfoRef = roomRef.child('gameInfo');
        await gameInfoRef.remove();
        initGameRoomData();
        await dealDeck();
    }

    const dealDeck = async () => {
        const gameInfoRef = roomRef.child('gameInfo');
        if(userIndex === 1) {
            const newDeck = generateNewDeck();
            await gameInfoRef.update({deck: newDeck});
        }

        gameInfoRef.child('deck').on("value",(data) => {
            const deck = data.val();
            setOtherPlayerDeck({
                [nextPlayer]: 13,
                [teammate]: 13,
                [previousPlayer]: 13,
            })
            if(deck){
                setUserDeck(deck[userIndex]);
            }
        })
    };

    const listenOnCurrentPlayer = () => {
        const currentPlayerRef = roomRef.child('currentPlayer');
        currentPlayerRef.on("value",(data) => {
            const nowPlayerID = data.val();
            setNowPlayerState(nowPlayerID);
        })
    };

    const listenOnThisRoundSuit = () => {
        const roundSuitRef = roomRef.child('gameInfo').child('thisRoundSuit');
        roundSuitRef.on("value",(data) => {
            const roundSuit = data.val();
            setThisRoundSuit(roundSuit)
        })
    };

    const listenOnChangeRouteEvent = () => {
        const changeMateRef = roomRef.child('changeMate');
        const leaveRef = roomRef.child('someoneLeaveGame');
        const restartRef = roomRef.child('restart');
        changeMateRef.on("value",(data) => {
            const isTrigger = data.val();
            if(isTrigger) {
                setModalType('countdown-change-mate')
            }
        });
        leaveRef.on("value",(data) => {
            const isTrigger = data.val();
            if(isTrigger) {
                setModalType('countdown-leave')
            }
        });
        restartRef.on("value",(data) => {
            const isTrigger = data.val();
            if(isTrigger) {
                setModalType('countdown-restart')
            }
        });
    }

    const removeListeners = () => {
        const gameInfoRef = roomRef.child('gameInfo');
        const deckInfo = gameInfoRef.child('deck');
        const currentPlayerRef = roomRef.child('currentPlayer');
        const roundSuitRef = roomRef.child('gameInfo').child('thisRoundSuit');
        const changeMateRef = roomRef.child('changeMate');
        const leaveRef = roomRef.child('someoneLeaveGame');
        const restartRef = roomRef.child('restart');
        currentPlayerRef.off();
        deckInfo.off();
        roundSuitRef.off();
        changeMateRef.off();
        leaveRef.off();
        restartRef.off();
        gameInfoRef.remove();
    }

    return (
    <Room theme={theme} className="game_room">
        <Cards />
        <CardTable />
        <MainInfo />
        <ModalRoot initGameData={initGameData} />
        <Navbar />
    </Room>)
}

export default GameRoom;