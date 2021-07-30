import React from 'react';
import db from "database";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userRoomState } from 'store/user';
import { responseToBadDeck } from 'store/deck';
import ModalConfirm from 'components/Global/molecules/ModalConfirm';
import Kanahei from 'assets/kanaheiclap.gif';

interface ModalGiveUpProperty  {
    active: boolean;
}

const ModalGiveUp = (props: ModalGiveUpProperty) => {
    const {active} = props;
    const roomId = useRecoilValue(userRoomState);
    const setResponseToBadDeck = useSetRecoilState(responseToBadDeck);

    const restartGame = () => {
        const roomRef = db.database().ref(`/${roomId}`);
        roomRef.child('restart').set(true);
    }
    return (
        <ModalConfirm
            active={active}
            className="give_up_modal"
            description="好像可以倒牌捏"
            imageUrl={Kanahei}
            onConfirmText="倒爆"
            onCancelText="不倒"
            onConfirm={restartGame}
            onCancel={()=>setResponseToBadDeck(true)}
        />
    );
}

export default ModalGiveUp