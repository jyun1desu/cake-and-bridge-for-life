import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import db from "database";
import ModalBinding from 'components/GameRoom/Modal/ModalBinding';
import ModalSendAdvice from 'components/GameRoom/Modal/ModalSendAdvice';
import ModalGiveUp from 'components/GameRoom/Modal/ModalGiveUp';
import ModalConfirmLeave from 'components/GameRoom/Modal/ModalConfirmLeave';
import ModalResult from 'components/GameRoom/Modal/ModalResult';
import Loading from 'components/Global/Loading';
import { trumpState, isGameEndState } from 'store/game';
import { userRoomState, userIDState } from 'store/user';
import { modalState } from 'store/modal';
import { OKtoPlay } from 'store/deck';
import { useRecoilState, useRecoilValue } from 'recoil';

const Root = styled.div`
`

const ModalRoot = ({ initGameData }) => {
    const history = useHistory();
    const [isLoading, toggleLoading] = useState(false);
    const trump = useRecoilValue(trumpState);
    const userID = useRecoilValue(userIDState);
    const roomName = useRecoilValue(userRoomState);
    const isOKtoPlay = useRecoilValue(OKtoPlay);
    const isGotWinner = useRecoilValue(isGameEndState);
    const [modalType, setModalType] = useRecoilState(modalState);
    const roomRef = db.database().ref(`/${roomName}`);

    useEffect(() => {
        if (isGotWinner) {
            setModalType('result');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGotWinner])

    const backToWaitRoom = () => {
        const toPath = `/${roomName}/waiting_room/${userID}`;
        history.push(toPath);
        setModalType(null);
        roomRef.child('changeMate').remove();
        roomRef.child('someoneLeaveGame').remove();
    }

    const refreshGame = () => {
        initGameData();
        roomRef.child('restart').remove();
    }

    const closeModal = () => setModalType(null);

    return (
        <Root className="modal_root">
            {/* { !trump && isOKtoPlay && <ModalBinding /> } */}
            { isOKtoPlay && <ModalGiveUp />}
            { modalType === 'result' && <ModalResult openLoadingWindow={() => toggleLoading(true)} winTeam={isGotWinner} />}
            { modalType === 'advice' && <ModalSendAdvice closeModal={closeModal} />}
            { modalType === 'cofirm-leave' && <ModalConfirmLeave closeModal={closeModal} />}
            { modalType === 'countdown-leave' && (
                <Loading 
                    type={modalType} 
                    countdown={3} 
                    action={backToWaitRoom} 
                    actionText="回到等待室"
                    text="有人離開嚕！"
                />
            )}
            { modalType === 'countdown-change-mate' && (
                <Loading 
                    type={modalType} 
                    countdown={3} 
                    action={backToWaitRoom}
                    actionText="回到等待室"
                    text="有人要換隊友唷！"
                />
            )}
            { modalType === 'countdown-restart' && (
                <Loading 
                    type={modalType}
                    countdown={3}
                    action={refreshGame}
                    actionText="重新牌局"
                    text="倒牌啦！"
                    noOpacity
                />)}
            {isLoading && <Loading cancelReady={() => toggleLoading(false)} />}
        </Root>
    )
}

export default ModalRoot;
