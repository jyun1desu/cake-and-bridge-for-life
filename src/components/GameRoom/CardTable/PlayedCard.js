import React, { useEffect } from 'react';
import db from "database";
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import classnames from 'classnames';
import { userRoomState, userNameState } from 'store/user';
import { thisRoundCardsState } from 'store/game';
import { relationWithUser } from 'store/players';
import Card from 'components/GameRoom/Card';

const CardGroup = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    .played_card {
        position: absolute;
        &.user {
        left: 50%;
        bottom: 25px;
        transform: translateX(-50%);
        }
        &.cross {
            left: 50%;
            top: 25px;
            transform: translateX(-50%);
        }
        &.left {
            left: 25px;
            top: 50%;
            transform-origin: left top;
            transform: rotate(90deg) translate(-50%, -100%);
        }
        &.right {
            right: 25px;
            top: 50%;
            transform-origin: right top;
            transform: rotate(90deg) translateX(50%);
        }
    }
`

const PlayedCard = () => {
    const roomName = useRecoilValue(userRoomState);
    const user = useRecoilValue(userNameState);
    const { teammate, nextPlayer, previousPlayer } = useRecoilValue(relationWithUser);
    const [thisRoundCards, updateThisRoundCards] = useRecoilState(thisRoundCardsState);

    useEffect(()=>{
        const cardsRef = db.database().ref(`/${roomName}`).child('gameInfo').child('thisRoundCards');
        cardsRef.on("value", d => {
            const cards = d.val() || [];
            updateThisRoundCards(orderCards(cards));
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const orderCards = (cards) => {
        if(!cards.length) return [];
        const orderedPlayers = [teammate, nextPlayer, previousPlayer, user];
        const result = orderedPlayers.map(playerName => {
            const card = cards.find(card => card.player === playerName);
            return card?.card;
        })
        return result;
    }

    return (
        <CardGroup className="played_cards_group">
            {thisRoundCards.map((card,index) => {
                const order = ['cross', 'left', 'right', 'user'];
                return card && (
                <Card
                    key={order[index]}
                    className={classnames("played_card",order[index])}
                    number={card.number}
                    suit={card.suit}
                    hasDetail
                />
            )})}
        </CardGroup>
    )
}

export default PlayedCard