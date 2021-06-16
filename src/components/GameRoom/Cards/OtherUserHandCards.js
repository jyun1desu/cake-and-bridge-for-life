import React from 'react';
import Card from '../Card';
import generateArray from 'util/generateArray';

const OtherUserHandCards = ({ className, cardAmount }) => {
    const cardArray = generateArray(cardAmount);
    return (
        <div className={className}>
            {cardArray.map(card=>(
                <Card key={card} className="group other_player_card"></Card>
            ))}
        </div>
    )
}

export default OtherUserHandCards;