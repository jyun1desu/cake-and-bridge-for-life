import React from 'react';
import db from "database";
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDeckState } from 'store/deck';
import { isUserTurnState, thisRoundSuitState, isUserLastPlayerState } from 'store/game';
import { userNameState, userRoomState } from 'store/user';
import { relationWithUser } from 'store/players';
import Card from '../Card'

const UserHandCards = ({ className }) => {
    const roomName = useRecoilValue(userRoomState);
    const userName = useRecoilValue(userNameState);
    const isUserTurn = useRecoilValue(isUserTurnState);
    const thisRoundSuit = useRecoilValue(thisRoundSuitState);
    const isUserLastPlayer = useRecoilValue(isUserLastPlayerState);
    const { nextPlayer } = useRecoilValue(relationWithUser);
    const [userDeck, setUserDeck] = useRecoilState(userDeckState);
    const [nowPickSuit, setNowPickSuit] = React.useState(null);
    const roomRef = db.database().ref(`/${roomName}`);
    const gameInfoRef = roomRef.child('gameInfo');

    const handlePickCard = async (e, { number, suit }) => {
        e.stopPropagation();
        if (!isUserTurn) return;
        if (!isValidCard(suit)) return setNowPickSuit(null);
        if (suit === nowPickSuit) {
            // 出牌
            await playCard({ number, suit });
            removeCardFromDeck({ number, suit });
            setNowPickSuit(null);
            if (!isUserLastPlayer) {
                await switchToNextPlayer();
            }
        } else {
            setNowPickSuit(suit);
        }
    }

    const isValidCard = (pickedSuit) => {
        if (!thisRoundSuit) return true;
        if (thisRoundSuit && pickedSuit !== thisRoundSuit) {
            if (userDeck.some(card => card.suit === thisRoundSuit)) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }

    const playCard = async ({ number, suit }) => {
        const cardsRef = gameInfoRef.child('thisRoundCards');
        const suitRef = gameInfoRef.child('thisRoundSuit');
        const userPlayData = {
            player: userName,
            card: { number, suit },
        }
        await cardsRef.once("value", d => {
            const cards = d.val() || [];
            if (!cards.length) {
                suitRef.set(suit);
            }
            cardsRef.set([...cards, userPlayData]);
        });
    }

    const removeCardFromDeck = ({ suit, number }) => {
        const newDeck = userDeck.filter(card => {
            const isCard = card.number === number && card.suit === suit;
            return !isCard;
        })
        setUserDeck(newDeck);
    };

    const switchToNextPlayer = async () => {
        const nextPlayerRef = roomRef.child('currentPlayer');
        await nextPlayerRef.set(nextPlayer);
    }

    return (
        <div
            className={className}>
            {userDeck.map(({ number, suit }) => (<Card
                nowPickSuit={nowPickSuit}
                onClick={(e) => handlePickCard(e, { number, suit })}
                className="group user_card"
                key={number + suit}
                number={number}
                suit={suit}
                hasDetail
            />))}
        </div>
    )

}

export default UserHandCards