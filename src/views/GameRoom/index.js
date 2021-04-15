import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import db from "database";
import styled from 'styled-components';
import newDeck, { isBadLuck } from 'util/deck';
import { userIndexState } from 'store/user';
import { userDeckState } from 'store/game';
import { userRoomState } from "store/user";

// import ModalBinding from 'components/GameRoom/Modal/ModalBinding';
// import ModalSendAdvice from 'components/GameRoom/Modal/ModalSendAdvice';
// import ModalGiveUp from 'components/GameRoom/Modal/ModalGiveUp';
import ModalConfirmLeave from 'components/GameRoom/Modal/ModalConfirmLeave';
import ModalResult from 'components/GameRoom/Modal/ModalResult';
import Cards from 'components/GameRoom/Cards';
import CardTable from 'components/GameRoom/CardTable';
import MainInfo from 'components/GameRoom/MainInfo';
import Navbar from 'components/GameRoom/Navbar';

const Room = styled.div`
        background-color: #f3e9e9;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
`

const GameRoom = () => {
    const [toReissue,setReissue] = useState(false);
    const [showModalReissue, setModalReissue] = useState(false);
    const userIndex = useRecoilValue(userIndexState);
    const setUserDeck = useSetRecoilState(userDeckState);
    const roomName = useRecoilValue(userRoomState);
    const roomRef = db.database().ref(`/${roomName}`);

    useEffect(()=>{
        dealDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[setReissue]);

    const dealDeck = async() => {
        const gameInfoRef = roomRef.child('gameInfo');
        if(userIndex === 3 || toReissue){
            await gameInfoRef.update({deck: newDeck});
        };

        gameInfoRef.child('deck').on("value",(data) => {
            const deck = data.val();
            if(deck){
                setUserDeck(deck[userIndex]);
                if(isBadLuck(deck[userIndex])){
                    setModalReissue(true);
                }
                gameInfoRef.child('deck').off();
            }
        })
    }

    return (
    <Room className="game_room">
        <Cards />
        <CardTable />
        <MainInfo />
        <Navbar />
        {showModalReissue && <div>倒牌兒</div>}
        {/* <ModalSendAdvice /> */}
        {/* <ModalBinding /> */}
        {/* <ModalGiveUp /> */}
        {/* <ModalConfirmLeave /> */}
        {/* <ModalResult /> */}
    </Room>)
}

export default GameRoom;