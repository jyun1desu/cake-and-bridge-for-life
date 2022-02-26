import React, { useEffect, useMemo } from "react";
import db from "database";
import { child, ref, onValue, off, get, update } from "firebase/database";
import classnames from "classnames";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Suit from "components/Global/atoms/Suit";
import { color } from "style/theme";
import { ThemeTypes } from "types/theme";
import { CalledBind } from "types/bind";
import {
  userPickBindState,
  nowBindState,
  availibleTricksState,
} from "store/bind";
import { isUserTurnState, trumpState } from "store/game";
import { relationWithUser, OrderedStartFromTeamOne } from "store/players";
import { playersCalledListState } from "store/bind";
import { userNameState, userRoomState } from "store/user";
import OptionList from "./OptionList";

interface BoxProperty {
  themeType: ThemeTypes;
}

const Box = styled.div<BoxProperty>`
  border-radius: 4px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 0.3s all;
  background-color: ${({ theme }) => theme.bg};
  border-width: ${({ themeType }) =>
    themeType === ThemeTypes.Light ? 0 : "1px"};
  border-style: solid;
  border-color: ${({ theme }) => theme.border};

  & > p {
    padding: 8px 0;
    font-size: 16px;
    text-align: center;
    letter-spacing: 1px;
    margin-bottom: 5px;
    transition: 0.3s all;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.status_unable_bg};
    color: ${({ theme }) => theme.status_unable_fg};
  }

  & > button {
    padding: 8px 0;
    margin-top: 5px;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 2px;
    transition: 0.3s all;
    border-top: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.call_unable_bg};
    color: ${({ theme }) => theme.call_unable_fg};
  }

  &.is_user_turn {
    & > p {
      background-color: ${({ theme }) => theme.status_active_bg};
      color: ${({ theme }) => theme.status_active_fg};
    }
    & > button {
      background-color: ${({ theme }) => theme.call_pass_bg};
      color: ${({ theme }) => theme.call_pass_fg};

      &.has_pick_bind {
        background-color: ${({ theme }) => theme.call_active_bg};
        color: ${({ theme }) => theme.call_active_fg};
      }
    }
  }
`;

const Hint = styled.p`
  text-align: center;
  margin-top: 4px;
  letter-spacing: 1px;
  font-size: 12px;
  transition: 0.3s all;
  color: ${({ theme }) => theme.hint};
`;

const themeData = {
  light: {
    bg: "white",
    status_unable_bg: color.$unable_color,
    status_active_bg: color.$highlight_color,
    status_unable_fg: color.$unable_font_color,
    status_active_fg: color.$title_font_color,
    call_unable_bg: color.$unable_color,
    call_unable_fg: color.$unable_font_color,
    call_pass_bg: color.$pass_color,
    call_pass_fg: "white",
    call_active_bg: color.$pink_color,
    call_active_fg: "white",
    border: "transparent",
    hint: color.$default_font_color,
  },
  dark: {
    bg: color.$dark_dim_bg_color,
    status_unable_bg: color.$dark_dim_bg_color,
    status_unable_fg: color.$unable_font_color,
    status_active_bg: color.$dark_dim_bg_color,
    status_active_fg: color.$fluorescent_yellow_color,
    call_unable_bg: color.$dark_dim_bg_color,
    call_unable_fg: "#7B7B7B",
    call_pass_bg: color.$dark_dim_bg_color,
    call_pass_fg: color.$fluorescent_green_color,
    call_active_bg: color.$dark_dim_bg_color,
    call_active_fg: color.$fluorescent_pink_color,
    border: color.$dark_dim_border_color,
    hint: "white",
  },
};

interface BindListProperty {
  theme: ThemeTypes;
}

const BindList = (props: BindListProperty) => {
  const { theme } = props;
  const [userPickBind, setUserPickBind] = useRecoilState(userPickBindState);
  const [nowBind, setNowBind] = useRecoilState(nowBindState);
  const playerList = useRecoilValue(OrderedStartFromTeamOne);
  const setTrump = useSetRecoilState(trumpState);
  const { nextPlayer, teammate, previousPlayer } = useRecoilValue(
    relationWithUser
  );
  const calledList = useRecoilValue(playersCalledListState);
  const availibleTricks = useRecoilValue(availibleTricksState);
  const isUserTurn = useRecoilValue(isUserTurnState);
  const roomId = useRecoilValue(userRoomState);
  const userName = useRecoilValue(userNameState);

  const roomRef = ref(db, roomId);
  const gameInfoRef = child(roomRef, "gameInfo");

  useEffect(() => {
    detectTrumpDecided();
    const nowBindRef = child(gameInfoRef, "nowBind");

    onValue(nowBindRef, (data) => {
      const nowBindData = data.val();
      if (nowBindData) {
        setNowBind(nowBindData);
      }
    });

    return () => {
      off(nowBindRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttonMessage = useMemo(() => {
    const noBind = nowBind.number === 0;
    if (isUserTurn) {
      if (noBind && !userPickBind) return "不能PASS!";
      if (userPickBind) {
        return (
          <>
            {`喊${userPickBind.number}`}
            <Suit suit={userPickBind.suit} />
          </>
        );
      } else {
        return "PASS";
      }
    } else {
      return "PASS";
    }
  }, [isUserTurn, userPickBind, nowBind]);

  const callBind = async () => {
    const userBindListRef = child(gameInfoRef, `calledBinds/${userName}`);

    const prevUserBinds = await get(userBindListRef)
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

    const nextPlayer = getNext();

    let toUpdate = {
      [`calledBinds/${userName}`]: [...prevUserBinds, userPickBind || "pass"],
      currentPlayer: nextPlayer,
    } as any;

    if (userPickBind) {
      toUpdate = {
        ...toUpdate,
        nowBind: { ...userPickBind, player: userName },
      };
    }

    await update(gameInfoRef, toUpdate);
    setUserPickBind(null);
  };

  const getNext = () => {
    const passedPlayers = Object.entries(calledList)
      .filter((v) => v[1].includes("pass"))
      .map((v) => v[0]);

    const playersOrder = [nextPlayer, teammate, previousPlayer];
    const next = playersOrder.filter((player) => {
      return !passedPlayers.includes(player);
    })[0];

    return next;
  };

  const detectTrumpDecided = () => {
    const bindListRef = child(gameInfoRef, "calledBinds");

    onValue(bindListRef, async (data) => {
      const binds = data.val();
      if (!binds) return;
      const playersCalledList = Object.values(binds) as CalledBind[][];
      const passAmount = playersCalledList.filter((playerCalledList) => {
        return playerCalledList.some((bind) => bind === "pass");
      }).length;
      if (passAmount === 3) {
        const nowBindRef = child(gameInfoRef, "nowBind");
        const { suit, number, player } = await get(nowBindRef)
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

        setTrump({ suit, number });

        update(gameInfoRef, {
          currentPlayer: getNextPlayer(player),
          calledBinds: null,
          nowBind: null,
        });

        off(bindListRef);
      }
    });
  };

  const getNextPlayer = (playerName: string) => {
    const playerIndex = playerList.indexOf(playerName);
    const nextPlayerIndex =
      playerIndex + 1 > 3 ? playerIndex - 3 : playerIndex + 1;
    return playerList[nextPlayerIndex];
  };

  return (
    <>
      <Box
        theme={themeData[theme]}
        themeType={theme}
        className={classnames("bind_list", { is_user_turn: isUserTurn })}
      >
        <p>{isUserTurn ? "" : "NOT "}YOUR TURN</p>
        <OptionList
          theme={theme}
          isUserTurn={isUserTurn}
          tricks={availibleTricks}
        />
        <button
          onClick={callBind}
          className={classnames({ has_pick_bind: userPickBind })}
          disabled={!isUserTurn || buttonMessage === "不能PASS!"}
        >
          {buttonMessage}
        </button>
      </Box>
      {userPickBind && (
        <Hint theme={themeData[theme]}>再次點擊相同選項可以取消選擇</Hint>
      )}
    </>
  );
};

export default BindList;
