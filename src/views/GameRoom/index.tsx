import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import db from "database";
import {
  child,
  ref,
  update,
  remove,
  onValue,
  onDisconnect,
  off,
} from "firebase/database";
import styled from "styled-components";
import { color } from "style/theme";
import { generateNewDeck } from "util/deck";
import useInitData from "util/hook/useInitData";
import { userIndexState, userRoomState, userIDState } from "store/user";
import { modalState } from "store/modal";
import { userDeckState, otherPlayerDeckState } from "store/deck";
import { themeState } from "store/theme";
import { relationWithUser } from "store/players";
import { currentPlayerName, thisRoundSuitState } from "store/game";
import ModalRoot from "components/GameRoom/Modal/ModalRoot";
import Cards from "components/GameRoom/Cards";
import CardTable from "components/GameRoom/CardTable";
import MainInfo from "components/GameRoom/MainInfo";
import Navbar from "components/GameRoom/Navbar";
import { GameStatusTypes } from "types/types";

const Room = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: 0.3s background-color;
  background-color: ${({ theme }) => theme.bg};
`;

const themeData = {
  light: { bg: "#f3e9e9" },
  dark: { bg: color.$dark_bg_color },
};

const GameRoom = () => {
  const [theme] = useRecoilState(themeState);
  const [{ initGameRoomData }] = useInitData();
  const userIndex = useRecoilValue(userIndexState);
  const userID = useRecoilValue(userIDState);
  const setUserDeck = useSetRecoilState(userDeckState);
  const setOtherPlayerDeck = useSetRecoilState(otherPlayerDeckState);
  const { nextPlayer, teammate, previousPlayer } = useRecoilValue(
    relationWithUser
  );
  const setModalType = useSetRecoilState(modalState);
  const setNowPlayerState = useSetRecoilState(currentPlayerName);
  const setThisRoundSuit = useSetRecoilState(thisRoundSuitState);
  const roomId = useRecoilValue(userRoomState);
  const roomRef = ref(db, roomId);

  useEffect(() => {
    initGameData();
    listenOnCurrentPlayer();
    listenOnThisRoundSuit();
    listenOnChangeRouteEvent();
    detectUserDisConnect();

    return () => {
      removeListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initGameData = async () => {
    remove(child(roomRef, "gameInfo"));
    initGameRoomData();
    await dealDeck();
  };

  const dealDeck = async () => {
    const gameInfoRef = child(roomRef, "gameInfo");
    const newDeck = generateNewDeck();
    await update(gameInfoRef, { deck: newDeck });

    const deckRef = child(gameInfoRef, "deck");
    onValue(deckRef, (data) => {
      const deck = data.val();
      setOtherPlayerDeck({
        [nextPlayer]: 13,
        [teammate]: 13,
        [previousPlayer]: 13,
      });
      if (deck) {
        setUserDeck(deck[userIndex]);
      }
    });
  };

  const listenOnCurrentPlayer = () => {
    const currentPlayerRef = child(roomRef, "currentPlayer");
    onValue(currentPlayerRef, (data) => {
      const nowPlayerID = data.val();
      setNowPlayerState(nowPlayerID);
    });
  };

  const listenOnThisRoundSuit = () => {
    const gameInfoRef = child(roomRef, "gameInfo");
    const roundSuitRef = child(gameInfoRef, "thisRoundSuit");
    onValue(roundSuitRef, (data) => {
      const roundSuit = data.val();
      setThisRoundSuit(roundSuit);
    });
  };

  const listenOnChangeRouteEvent = () => {
    const eventRef = child(roomRef, "event");

    onValue(eventRef, (data) => {
      const type = data.val();
      if (type) {
        setModalType(type);
        remove(eventRef);
      }
    });
  };

  const detectUserDisConnect = () => {
    onDisconnect(roomRef).update({
      event: GameStatusTypes.SomeoneLeaveGame,
    });

    onDisconnect(child(roomRef, `playersInfo/${userID}`)).remove();
  };

  const removeListeners = () => {
    const gameInfoRef = child(roomRef, "gameInfo");
    const currentPlayerRef = child(roomRef, "currentPlayer");
    const eventRef = child(roomRef, "event");
    const deckInfo = child(gameInfoRef, "deck");
    const roundSuitRef = child(gameInfoRef, "thisRoundSuit");

    off(currentPlayerRef);
    off(deckInfo);
    off(roundSuitRef);

    remove(eventRef);

    onDisconnect(roomRef).cancel();
    onDisconnect(child(roomRef, `playersInfo/${userID}`)).cancel();
  };

  return (
    <Room theme={themeData[theme]} className="game_room">
      <Cards />
      <CardTable />
      <MainInfo />
      <ModalRoot initGameData={initGameData} />
      <Navbar />
    </Room>
  );
};

export default GameRoom;
