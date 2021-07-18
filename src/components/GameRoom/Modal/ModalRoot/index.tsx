import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import db from "database";
import ModalBinding from 'components/GameRoom/Modal/ModalBinding';
import ModalGiveUp from 'components/GameRoom/Modal/ModalGiveUp';
import ModalConfirmLeave from 'components/GameRoom/Modal/ModalConfirmLeave';
import ModalResult from 'components/GameRoom/Modal/ModalResult';
import Loading from 'components/Global/Loading';
import { trumpState, isGameEndState } from 'store/game';
import { userRoomState, userIDState } from 'store/user';
import { modalState } from 'store/modal';
import { OKtoPlay } from 'store/deck';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

const Root = styled.div`
`

interface ModalRootProperty {
    initGameData: () => void;
}

const ModalRoot = (props: ModalRootProperty) => {
    const { initGameData } = props;
    const history = useHistory();
    const [isLoading, toggleLoading] = useState(false);
    const trump = useRecoilValue(trumpState);
    const userID = useRecoilValue(userIDState);
    const roomName = useRecoilValue(userRoomState);
    const isOKtoPlay = useRecoilValue(OKtoPlay);
    const isGotWinner = useRecoilValue(isGameEndState);
    const [modalType, setModalType] = useRecoilState(modalState);
    const initModalType = useResetRecoilState(modalState);
    const roomRef = db.database().ref(`/${roomName}`);

    const backToWaitRoom = () => {
        const toPath = `/${roomName}/waiting_room/${userID}`;
        history.push(toPath);
        initModalType();
        roomRef.child('changeMate').remove();
        roomRef.child('someoneLeaveGame').remove();
    }

    const refreshGame = async () => {
        await initGameData();
        roomRef.child('restart').remove();
    }

    const closeModal = () => initModalType();

    return (
        <Root className="modal_root">
            <ModalBinding active={!trump && isOKtoPlay} />
            <ModalGiveUp active={!isOKtoPlay} />
            <ModalResult
                active={!!isGotWinner}
                openConfirmLeaveModal={()=>setModalType('cofirm-leave')}
                openLoadingWindow={() => toggleLoading(true)} winTeam={isGotWinner} />
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
                noOpacity
            />
            <Loading
                active={modalType === 'countdown-change-mate'}
                type={modalType}
                countdown={3}
                action={backToWaitRoom}
                actionText="回到等待室"
                text="有人要換隊友唷！"
                noOpacity
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
