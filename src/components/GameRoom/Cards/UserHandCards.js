import React from 'react';
import { useRecoilValue } from 'recoil';
import { userDeckState } from 'store/game';
import Card from '../Card'

const UserHandCards = ({ className }) => {
    const userDeck = useRecoilValue(userDeckState);
    return (
        <div className={className}>
            {userDeck.map(card =>
            (<Card
                className="group user_card"
                key={card.number + card.suit}
                number={card.number}
                suit={card.suit}
                hasDetail
            />))}
        </div>
    )

}

export default UserHandCards