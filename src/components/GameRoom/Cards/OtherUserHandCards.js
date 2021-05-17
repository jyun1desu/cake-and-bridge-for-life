import React from 'react';
import Card from '../Card'

const generateArray = number => {
    return Array.from(Array(number), (_, x) => x);
}

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