import React from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import db from "database";
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import ModalBinding from 'components/GameRoom/Modal/ModalBinding';
import ModalGiveUp from 'components/GameRoom/Modal/ModalGiveUp';
import ModalConfirmLeave from 'components/GameRoom/Modal/ModalConfirmLeave';
import ModalResult from 'components/GameRoom/Modal/ModalResult';
import Loading from 'components/Global/Loading';
import { trumpState, isGameEndState } from 'store/game';
import { userRoomState, userIDState } from 'store/user';
import { modalState } from 'store/modal';
import { OKtoPlay } from 'store/deck';
import { ReadyTypes, GameStatusTypes, RefreshGameTypes } from 'types/types';
import useUserReadyStatus from 'util/hook/useUserReadyStatus';

const Root = styled.div`
`

interface ModalRootProperty {
    initGameData: () => Promise<void>;
}

const ModalRoot = (props: ModalRootProperty) => {
    const { initGameData } = props;
    const history = useHistory();
    const trump = useRecoilValue(trumpState);
    const userID = useRecoilValue(userIDState);
    const roomId = useRecoilValue(userRoomState);
    const isOKtoPlay = useRecoilValue(OKtoPlay);
    const isGotWinner = useRecoilValue(isGameEndState);
    const [modalType, setModalType] = useRecoilState(modalState);
    const initModalType = useResetRecoilState(modalState);
    const [{ userReadyStatus } ,{ setReadyStatus }] = useUserReadyStatus(ReadyTypes.OneMoreGame);
    const roomRef = db.database().ref(`/${roomId}`);
    

    const backToWaitRoom = () => {
        const toPath = `/w/${roomId}/${userID}`;
        history.push(toPath);
        initGameData();
        initModalType();
        roomRef.child(GameStatusTypes.ChangeMate).remove();
        roomRef.child(GameStatusTypes.SomeoneLeaveGame).remove();
    }

    const refreshGame = async (type: RefreshGameTypes = GameStatusTypes.Restart) => {
        await initGameData();
        roomRef.child(type).remove();
    }

    const closeModal = () => initModalType();

    return (
        <Root className="modal_root">
            <ModalBinding active={!trump && isOKtoPlay} />
            <ModalGiveUp active={!isOKtoPlay} />
            <ModalResult
                setReadyStatus={setReadyStatus}
                active={!!isGotWinner}
                refreshGame={()=>refreshGame(GameStatusTypes.OneMoreGame)}
                openConfirmLeaveModal={()=>setModalType('cofirm-leave')}
                winTeam={isGotWinner}
            />
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
                action={()=>refreshGame(GameStatusTypes.Restart)}
                actionText="重新牌局"
                text="倒牌啦！"
                noOpacity
            />
            <Loading
                active={userReadyStatus}
                cancelReady={() => setReadyStatus(false)}
            />
        </Root>
    )
}

export default ModalRoot;
