import React from 'react';
import Card from '../../Card';
import generateArray from 'util/generateArray';

interface OtherUserHandCardsProperty  {
    className: string;
    cardAmount: number;
}
const OtherUserHandCards = (props: OtherUserHandCardsProperty) => {
    const { className, cardAmount } = props;
    const cardArray = generateArray(cardAmount);
    return (
        <div className={className}>
            {cardArray.map(card=>(
                <Card key={card} className="group other_player_card" />
            ))}
        </div>
    )
}

export default OtherUserHandCards;