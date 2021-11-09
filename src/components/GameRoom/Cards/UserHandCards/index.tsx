import React from "react";
import db from "database";
import { child, ref, set, get } from "firebase/database";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDeckState } from "store/deck";
import {
  isUserTurnState,
  thisRoundSuitState,
  isUserLastPlayerState,
} from "store/game";
import { userNameState, userRoomState } from "store/user";
import { relationWithUser } from "store/players";
import { Card, CardSuitType } from "types/card";
import CardLayout from "../../Card";

interface UserHandCardsProperty {
  className: string;
}
const UserHandCards = (props: UserHandCardsProperty) => {
  const { className } = props;
  const roomId = useRecoilValue(userRoomState);
  const userName = useRecoilValue(userNameState);
  const isUserTurn = useRecoilValue(isUserTurnState);
  const thisRoundSuit = useRecoilValue(thisRoundSuitState);
  const isUserLastPlayer = useRecoilValue(isUserLastPlayerState);
  const { nextPlayer } = useRecoilValue(relationWithUser);
  const [userDeck, setUserDeck] = useRecoilState(userDeckState);
  const [nowPickSuit, setNowPickSuit] = React.useState<CardSuitType | null>(
    null
  );
  const roomRef = ref(db, roomId);
  const gameInfoRef = child(roomRef, "gameInfo");

  const handlePickCard = async (
    e: React.MouseEvent<HTMLElement>,
    card: Card
  ) => {
    e.stopPropagation();
    const { suit, number } = card;
    if (!isUserTurn) return;
    if (!isValidCard(suit)) return setNowPickSuit(null);
    if (suit === nowPickSuit) {
      // 出牌
      await playCard({ number, suit });
      removeCardFromDeck({ number, suit });
      setNowPickSuit(null);
    } else {
      setNowPickSuit(suit);
    }
  };

  const isValidCard = (pickedSuit: CardSuitType) => {
    if (!thisRoundSuit) return true;
    if (thisRoundSuit && pickedSuit !== thisRoundSuit) {
      if (userDeck.some((card) => card.suit === thisRoundSuit)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const playCard = async (card: Card) => {
    const { suit, number } = card;
    const cardsRef = child(gameInfoRef, "thisRoundCards");
    const suitRef = child(gameInfoRef, "thisRoundSuit");

    const userPlayData = {
      player: userName,
      card: { number, suit },
    };

    const cards = await get(cardsRef)
      .then((data) => {
        if (data.exists()) {
          return data.val();
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.error(error);
      });

    if (!cards.length) {
      set(suitRef, suit);
    }

    await set(cardsRef, [...cards, userPlayData]);
    if (cards.length < 3) {
      switchToNextPlayer();
    }
  };

  const removeCardFromDeck = (card: Card) => {
    const { suit, number } = card;
    const newDeck = userDeck.filter((card) => {
      const isCard = card.number === number && card.suit === suit;
      return !isCard;
    });
    setUserDeck(newDeck);
  };

  const switchToNextPlayer = () => {
    const nextPlayerRef = child(roomRef, "currentPlayer");
    set(nextPlayerRef, nextPlayer);
  };

  return (
    <div className={className}>
      {userDeck.map(({ number, suit }) => (
        <CardLayout
          nowPickSuit={nowPickSuit}
          onClick={(e) => handlePickCard(e, { number, suit })}
          className="group user_card"
          key={number + suit}
          number={number}
          suit={suit}
          hasDetail
        />
      ))}
    </div>
  );
};

export default UserHandCards;
