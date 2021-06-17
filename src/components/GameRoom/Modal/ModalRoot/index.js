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

    const refreshGame = async () => {
        await initGameData();
        roomRef.child('restart').remove();
    }

    const closeModal = () => setModalType('');

    return (
        <Root className="modal_root">
            <ModalBinding active={!trump && isOKtoPlay} />
            <ModalGiveUp active={!isOKtoPlay} />
            <ModalResult
                active={modalType === 'result'}
                openLoadingWindow={() => toggleLoading(true)} winTeam={isGotWinner} />
            <ModalSendAdvice 
                active={modalType === 'advice'} 
                closeModal={closeModal} />
            <ModalConfirmLeave 
                active={modalType === 'cofirm-leave'} 
                closeModal={closeModal} />
            <Loading
                active={modalType === 'countdown-leave'}
                type={modalType}
                countdown={3}
                action={backToWaitRoom}
                actionText="回到等待室"
                text="有人離開嚕！"
            />
            <Loading
                active={modalType === 'countdown-change-mate'}
                type={modalType}
                countdown={3}
                action={backToWaitRoom}
                actionText="回到等待室"
                text="有人要換隊友唷！"
            />
            <Loading
                active={modalType === 'countdown-restart'}
                type={modalType}
                countdown={3}
                action={refreshGame}
                actionText="重新牌局"
                text="倒牌啦！"
                noOpacity
            />
            <Loading
                active={isLoading}
                cancelReady={() => toggleLoading(false)}
            />
        </Root>
    )
}

export default ModalRoot;
