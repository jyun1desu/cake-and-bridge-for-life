/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import db, { getFirebaseData } from "database";
import {
  child,
  ref,
  update,
  onValue,
  remove,
  off,
  onDisconnect,
} from "firebase/database";
import { useHistory } from "react-router-dom";
import { color } from "style/theme";
import styled from "styled-components";

import { playersData, teamArray } from "store/players";
import { userIDState, userRoomState, userTeamState } from "store/user";
import { themeState } from "store/theme";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";

import { TeamTypes, PlayerData } from "types/player";
import { ReadyTypes } from "types/types";

import PlayerWindow from "components/WaitRoom/PlayerWindow";
import SendInviteLinkButton from "components/WaitRoom/SendInviteLinkButton";
import TeamRadios from "components/WaitRoom/TeamRadios";
import Button from "components/Global/atoms/Button";
import Loading from "components/Global/molecules/Loading";
import useUserReadyStatus from "util/hook/useUserReadyStatus";

const themeData = {
  light: {
    bg: color.$theme_background,
  },
  dark: {
    bg: color.$dark_bg_color,
  },
};

const Room = styled.div`
  padding: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transition: 0.3s background-color;
  background-color: ${({ theme }) => theme.bg};
  position: relative;

  .start_game {
    letter-spacing: 2px;
    font-size: 16px;
  }

  .copy_link_button {
    margin-left: auto;
  }
`;
interface ReadyButtonProperty {
  className: string;
  buttonMessage: string;
  onClick: () => void;
}
const ReadyButton = (props: ReadyButtonProperty) => {
  const { onClick, className, buttonMessage } = props;
  const [theme] = useRecoilState(themeState);

  const getButtonColor = () => {
    switch (theme) {
      case "light":
      default:
        return buttonMessage === "開打！"
          ? `${color.$pink_color}`
          : `${color.$unable_color}`;
      case "dark":
        return buttonMessage === "開打！"
          ? `${color.$fluorescent_pink_color}`
          : `${color.$dark_dim_border_color}`;
    }
  };

  return (
    <Button className={className} onClick={onClick} color={getButtonColor()}>
      {buttonMessage}
    </Button>
  );
};

const WaitRoom = () => {
  const history = useHistory();
  const [theme] = useRecoilState(themeState);
  const [buttonMessage, setButtonMessage] = useState("");
  const setPlayerData = useSetRecoilState(playersData);
  const userID = useRecoilValue(userIDState);
  const userTeam = useRecoilValue(userTeamState);
  const roomName = useRecoilValue(userRoomState);
  const team = useRecoilValue(teamArray);
  const [{ userReadyStatus }, { setReadyStatus }] = useUserReadyStatus(
    ReadyTypes.EnterGame
  );
  const roomRef = ref(db, `/${roomName}`);
  const playersInfo = child(roomRef, `playersInfo`);
  const isAllReady = child(roomRef, ReadyTypes.EnterGame);

  const handleUserData = async () => {
    const rawPlayersList = await getFirebaseData(`${roomName}/playersInfo`);
    const playersData = Object.values(rawPlayersList) as PlayerData[];
    const sortedByTimestamp = playersData.sort(
      (a, b) => a.timestamp - b.timestamp
    );
    const userOrder = sortedByTimestamp.findIndex((data) => data.id === userID);
    const userDefaultTeam =
      userOrder === 0 || userOrder === 3
        ? TeamTypes.TeamOne
        : TeamTypes.TeamTwo;

    update(child(playersInfo, userID), {
      team: userTeam || userDefaultTeam,
      ready: false,
    });
  };

  useEffect(() => {
    const prepareWaitRoom = async () => {
      await initWaitRoomData();
      detectUserDisConnect();

      handleUserData();

      onValue(playersInfo, async (data) => {
        if (!data.val()) return;
        const playersData = Object.values(data.val()) as PlayerData[];
        const sortedByTimestamp = playersData.sort(
          (a, b) => a.timestamp - b.timestamp
        );
        setPlayerData(sortedByTimestamp);
      });

      onValue(isAllReady, async (data) => {
        if (data.val()) {
          await enterGame();
          remove(isAllReady);
        }
      });
    };

    prepareWaitRoom();

    return () => {
      setReadyStatus(false);
      off(playersInfo);
      onDisconnect(child(playersInfo, userID)).cancel();
    };
  }, []);

  useEffect(() => {
    if (team.length < 4) {
      return setButtonMessage("人數不足⋯⋯");
    }
    const teamOneAmount = team.filter((team) => team === TeamTypes.TeamOne)
      .length;
    const teamTwoAmount = team.filter((team) => team === TeamTypes.TeamTwo)
      .length;
    if (teamOneAmount !== teamTwoAmount) {
      return setButtonMessage("欸欸橋牌是二打二捏！");
    }
    return setButtonMessage("開打！");
  }, [team]);

  const detectUserDisConnect = () => {
    onDisconnect(child(playersInfo, userID)).remove();
  };

  const initWaitRoomData = async () => {
    await update(child(playersInfo, userID), { ready: false });
  };

  const enterGame = async () => {
    await initWaitRoomData();
    history.push(`/g/${roomName}/${userID}`);
  };

  return (
    <Room theme={themeData[theme]}>
      <SendInviteLinkButton className="copy_link_button" />
      <PlayerWindow />
      <TeamRadios roomName={roomName} userID={userID} />
      <ReadyButton
        className="start_game"
        buttonMessage={buttonMessage}
        onClick={() => {
          if (buttonMessage !== "開打！") return;
          setReadyStatus(true);
        }}
      />
      <Loading
        active={userReadyStatus}
        cancelReady={() => setReadyStatus(false)}
      />
    </Room>
  );
};

export default WaitRoom;
