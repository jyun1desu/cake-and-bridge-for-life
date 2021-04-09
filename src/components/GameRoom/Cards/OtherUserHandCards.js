import React from 'react';
import { useRecoilValue } from 'recoil';
import { otherPlayerDeckFamily } from 'store/game';
import Card from '../Card'

const OtherUserHandCards = ({ order, className }) => {
    const cardAmount = useRecoilValue(otherPlayerDeckFamily(order));
    return (
        <div className={className}>
            {cardAmount.map(card=>(
                <Card key={card} className="group other_player_card"></Card>
            ))}
        </div>
    )
}

export default OtherUserHandCards;