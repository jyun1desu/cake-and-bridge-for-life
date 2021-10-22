import React, { useEffect } from "react";
import db from "database";
import { child, ref, set, onValue, off, remove } from "firebase/database";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import classnames from "classnames";
import { Team } from "types/player";
import { Card as CardInterface, CardSuitType } from "types/card";
import { userRoomState, userNameState } from "store/user";
import { teamScoresState } from "store/score";
import { userWinTricksState } from "store/winTricks";
import { otherPlayerDeckState } from "store/deck";
import {
  thisRoundCardsState,
  isThisRoundEndState,
  trumpState,
  thisRoundSuitState,
} from "store/game";
import { relationWithUser, OrderedStartFromTeamOne } from "store/players";
import { getBiggestCard } from "util/game";
import sleep from "util/sleep";
import Card from "components/GameRoom/Card";

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
`;

const PlayedCard = () => {
  const roomId = useRecoilValue(userRoomState);
  const user = useRecoilValue(userNameState);
  const { teammate, nextPlayer, previousPlayer } = useRecoilValue(
    relationWithUser
  );
  const teamArray = useRecoilValue(OrderedStartFromTeamOne);
  const trump = useRecoilValue(trumpState);
  const currentSuit = useRecoilValue(thisRoundSuitState);
  const [thisRoundCards, updateThisRoundCards] = useRecoilState(
    thisRoundCardsState
  );
  const [teamScores, updateTeamScores] = useRecoilState(teamScoresState);
  const isThisRoundEnd = useRecoilValue(isThisRoundEndState);
  const setOtherPlayerDeck = useSetRecoilState(otherPlayerDeckState);
  const setUserWinTricks = useSetRecoilState(userWinTricksState);
  const roomRef = ref(db, roomId);
  const gameInfoRef = child(roomRef, "gameInfo");

  useEffect(() => {
    const cardsRef = child(gameInfoRef, "thisRoundCards");
    onValue(cardsRef, (d) => {
      const cards = d.val() || [];
      updateThisRoundCards(orderCards(cards));

      const playedPlayer = cards[cards.length - 1]?.player;
      if (playedPlayer && playedPlayer !== user) {
        setOtherPlayerDeck((pre) => ({
          ...pre,
          [playedPlayer]: pre[playedPlayer] - 1,
        }));
      }
    });

    return () => {
      off(cardsRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isThisRoundEnd) {
      handleRoundEnded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isThisRoundEnd]);

  const handleRoundEnded = async () => {
    const currentPlayerRef = child(roomRef, "currentPlayer");
    await remove(currentPlayerRef);
    await sleep(2000);
    const winner = getRoundWinner();
    updatePoints(winner);
    if (winner === user) {
      collectThisTrick();
    }
    await initRoundData();
    set(currentPlayerRef, winner);
  };

  const initRoundData = async () => {
    const thisRoundSuitRef = child(gameInfoRef, "thisRoundSuit");
    const thisRoundCardsRef = child(gameInfoRef, "thisRoundCards");
    await Promise.allSettled([
      remove(thisRoundSuitRef),
      remove(thisRoundCardsRef),
    ]);
  };

  const getRoundWinner = () => {
    const winnerIndex = getBiggestCard(
      trump?.suit as CardSuitType,
      currentSuit as CardSuitType,
      thisRoundCards
    );
    const playersOrder = [teammate, nextPlayer, previousPlayer, user];
    return playersOrder[winnerIndex];
  };

  const updatePoints = (winner: string) => {
    const winnerTeam = teamArray
      .map((player, i) => ({ player, team: `team${(i % 2) + 1}` }))
      .find((p) => p.player === winner)?.team as Team;

    if (winnerTeam) {
      updateTeamScores({
        ...teamScores,
        [winnerTeam]: teamScores[winnerTeam] + 1,
      });
    }
  };

  interface PlayedCard {
    player: string;
    card: CardInterface;
  }

  const orderCards = (cards: PlayedCard[]) => {
    if (!cards.length) return [];
    const orderedPlayers = [teammate, nextPlayer, previousPlayer, user];
    const result = orderedPlayers.map((playerName) => {
      const card = cards.find(
        (card) => card.player === playerName
      ) as PlayedCard | null;
      return card?.card;
    });
    return result as CardInterface[];
  };

  const collectThisTrick = () => {
    setUserWinTricks((pre) => [...pre, thisRoundCards]);
  };

  return (
    <CardGroup className="played_cards_group">
      {thisRoundCards.map((card, index) => {
        const order = ["cross", "left", "right", "user"];
        return (
          card && (
            <Card
              key={order[index]}
              className={classnames("played_card", order[index])}
              number={card.number}
              suit={card.suit}
              hasDetail
            />
          )
        );
      })}
    </CardGroup>
  );
};

export default PlayedCard;
