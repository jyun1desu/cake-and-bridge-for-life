import React, { useEffect } from 'react';
import styled from 'styled-components';
import ModalBinding from 'components/GameRoom/Modal/ModalBinding';
import ModalSendAdvice from 'components/GameRoom/Modal/ModalSendAdvice';
import ModalGiveUp from 'components/GameRoom/Modal/ModalGiveUp';
import ModalConfirmLeave from 'components/GameRoom/Modal/ModalConfirmLeave';
import ModalResult from 'components/GameRoom/Modal/ModalResult';
import { trumpState, isGameEndState } from 'store/game';
import { modalState } from 'store/modal';
import { OKtoPlay } from 'store/deck';
import { useRecoilState, useRecoilValue } from 'recoil';

const Root = styled.div`
`

const ModalRoot = () => {
    const trump = useRecoilValue(trumpState);
    const isOKtoPlay = useRecoilValue(OKtoPlay);
    const isGotWinner = useRecoilValue(isGameEndState);
    const [modalType, setModalType] = useRecoilState(modalState)

    useEffect(()=>{
        if (isGotWinner) {
            setModalType('result');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isGotWinner])

    const closeModal = () => setModalType(null);

    return (
        <Root className="modal_root">
            { !trump && isOKtoPlay && <ModalBinding /> }
            { !isOKtoPlay &&  <ModalGiveUp /> }
            { modalType === 'result' && <ModalResult winTeam={isGotWinner} /> }
            { modalType === 'advice' && <ModalSendAdvice closeModal={closeModal} /> }
            { modalType === 'cofirm-leave' && <ModalConfirmLeave closeModal={closeModal} />}
        </Root>
    )
}

export default ModalRoot;
