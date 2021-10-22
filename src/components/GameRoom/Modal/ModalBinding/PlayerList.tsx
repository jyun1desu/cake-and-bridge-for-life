import React, { useEffect } from "react";
import classnames from "classnames";
import db from "database";
import { ref, onValue, off } from "firebase/database";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeState } from "store/theme";
import { color } from "style/theme";
import { suitColor } from "util/suit";
import { OrderedStartFromTeamOne } from "store/players";
import { currentPlayerName } from "store/game";
import { playersCalledListState } from "store/bind";
import { userRoomState } from "store/user";
import Suit from "components/Global/atoms/Suit";
import ThinkingIcon from "components/GameRoom/ThinkingIcon";
import { TeamTypes } from "types/player";
import { CalledBind } from "types/bind";
import { ThemeTypes } from "types/theme";
import { CardSuitType } from "types/card";

const themeData = {
  light: {
    t1_name_fg: "white",
    t2_name_fg: "white",
    t1_name_bg: color.$pink_color,
    t2_name_bg: color.$brown_color,
    binds_bg: "white",
    border: "none",
    red_suit_color: color.$red_suit_color,
    black_suit_color: color.$black_suit_color,
    pass_color: color.$pass_color,
  },
  dark: {
    t1_name_fg: color.$fluorescent_pink_color,
    t2_name_fg: color.$fluorescent_yellow_color,
    t1_name_bg: color.$dark_dim_bg_color,
    t2_name_bg: color.$dark_dim_bg_color,
    binds_bg: color.$dark_dim_bg_color,
    border: "1px solid" + color.$dark_dim_border_color,
    red_suit_color: color.$dark_red_suit_color,
    black_suit_color: "white",
    pass_color: color.$fluorescent_green_color,
  },
};

interface getUserTurnEffectProperty {
  team: TeamTypes;
  theme: ThemeTypes;
}

const getUserTurnEffect = (props: getUserTurnEffectProperty) => {
  const { theme, team } = props;
  switch (theme) {
    case "light":
    default:
      return `box-shadow: 0px 0px 0px 2px ${color.$highlight_color};`;
    case "dark":
      const teamColor =
        team === TeamTypes.TeamOne
          ? color.$fluorescent_pink_color
          : color.$fluorescent_yellow_color;
      return `
            border: none;
            box-shadow: 0 0 2px 1px ${teamColor};
            `;
  }
};

interface PlayIProperty {
  team: TeamTypes;
}

const Player = styled.div<PlayIProperty>`
  position: relative;
  flex: 0 1 25%;
  font-size: 13px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.binds_bg};
  border: ${({ theme }) => theme.border};

  &.is_player_turn {
    ${({ theme, team }) => getUserTurnEffect({ theme, team })};
  }

  & + div {
    margin-left: 6px;
  }

  .name {
    position: relative;
    border-radius: 4px 4px 0 0;
    max-width: calc(85vw / 4 - 38px / 4);
    text-align: center;
    line-height: 20px;
    padding: 6px;
    box-sizing: border-box;
    letter-spacing: 1px;
    transition: 0.3s all;
    border-bottom: ${({ theme }) => theme.border};

    & > p {
      overflow: hidden;
      white-space: nowrap;
    }
  }

  &:nth-child(2n + 1) {
    .name {
      background-color: ${({ theme }) => theme.t1_name_bg};
      color: ${({ theme }) => theme.t1_name_fg};
    }
  }

  &:nth-child(2n + 2) {
    .name {
      background-color: ${({ theme }) => theme.t2_name_bg};
      color: ${({ theme }) => theme.t2_name_fg};
    }
  }

  .called_bind {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    box-sizing: border-box;
    min-height: 8vh;
    .bind {
      & + .bind {
        margin-top: 3px;
      }
      &.red {
        color: ${({ theme }) => theme.red_suit_color};
      }
      &.black {
        color: ${({ theme }) => theme.black_suit_color};
      }
      &.pass {
        letter-spacing: 1px;
        color: ${({ theme }) => theme.pass_color};
      }
    }
  }
`;

interface PlayInfoProperty {
  name: string;
  team: TeamTypes;
  calledList: CalledBind[];
}
const PlayInfo = (props: PlayInfoProperty) => {
  const { name, team, calledList } = props;
  const [theme] = useRecoilState(themeState);
  const nowPlayer = useRecoilValue(currentPlayerName);
  const isPlayerTurn = nowPlayer === name;

  return (
    <Player
      theme={themeData[theme]}
      team={team}
      className={classnames("player", { is_player_turn: isPlayerTurn })}
    >
      {isPlayerTurn && <ThinkingIcon className="on_bind_list" />}
      <div className="name">
        <p>{name}</p>
      </div>
      <div className="called_bind">
        {calledList.map((called, index) => {
          const isPassed = called === "pass";
          const bind =
            called === "pass" ? { number: 0, suit: CardSuitType.Club } : called;
          if (isPassed) {
            return (
              <span key={"pass" + index} className={classnames("bind", "pass")}>
                PASS
              </span>
            );
          }
          return (
            <span
              key={"called" + index}
              className={classnames("bind", suitColor(bind.suit))}
            >
              <span>{bind.number}</span>
              <Suit suit={bind.suit} />
            </span>
          );
        })}
      </div>
    </Player>
  );
};

interface PlayerListProperty {
  className: string;
}
const PlayerList = (props: PlayerListProperty) => {
  const { className } = props;
  const playerList = useRecoilValue(OrderedStartFromTeamOne);
  const roomId = useRecoilValue(userRoomState);
  const [calledList, setCalledList] = useRecoilState(playersCalledListState);

  useEffect(() => {
    const calledBindsRef = ref(db, `${roomId}/gameInfo/calledBinds`);
    onValue(calledBindsRef, (data) => {
      const allCalledBinds = data.val();
      setCalledList(allCalledBinds || {});
    });
    return () => {
      off(calledBindsRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      {playerList.map((player, index) => {
        const team = ("team" + (index % 2) + 1) as TeamTypes;
        return (
          <PlayInfo
            key={player + index}
            name={player}
            team={team}
            calledList={calledList[player] || []}
          />
        );
      })}
    </div>
  );
};

export default PlayerList;
