import React from 'react';
import styled from 'styled-components';
import ModalBinding from 'components/GameRoom/Modal/ModalBinding';
import ModalSendAdvice from 'components/GameRoom/Modal/ModalSendAdvice';
import ModalGiveUp from 'components/GameRoom/Modal/ModalGiveUp';
import ModalConfirmLeave from 'components/GameRoom/Modal/ModalConfirmLeave';
import ModalResult from 'components/GameRoom/Modal/ModalResult';
import { trumpState } from 'store/game';
import { modalState } from 'store/modal';
import { OKtoPlay } from 'store/deck';
import { useRecoilState, useRecoilValue } from 'recoil';

const Root = styled.div`
`

const ModalRoot = () => {
    const trump = useRecoilValue(trumpState);
    const isOKtoPlay = useRecoilValue(OKtoPlay);
    const hasResult = false;
    const [modalType, setModalType] = useRecoilState(modalState)

    const closeModal = () => setModalType(null);

    return (
        <Root className="modal_root">
            { !trump && isOKtoPlay && <ModalBinding /> }
            { !isOKtoPlay &&  <ModalGiveUp /> }
            { hasResult && <ModalResult/> }
            { modalType === 'advice' && <ModalSendAdvice closeModal={closeModal} /> }
            { modalType === 'cofirm-leave' && <ModalConfirmLeave closeModal={closeModal} />}
        </Root>
    )
}

export default ModalRoot;
