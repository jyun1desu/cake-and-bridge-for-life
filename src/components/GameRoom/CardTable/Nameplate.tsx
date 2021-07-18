import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';
import { TeamTypes } from 'types/player';
import { ThemeTypes } from 'types/theme';
import { themeState } from 'store/theme';
import { relationWithUser } from 'store/players';
import { userNameState, userTeamState } from 'store/user';
import { currentPlayerName } from 'store/game';
import ThinkingIcon from 'components/GameRoom/ThinkingIcon';
import { color } from 'style/theme'

const themeData = {
    light: {
        name_bg: 'white',
        fc: color.$title_font_color,
        bw: '0px',
        border: 'transparent',
        team: {
            team1: color.$pink_color,
            team2: color.$brown_color,
        },
        highlight_color_team: {
            team1: color.$highlight_color,
            team2: color.$highlight_color,
        },

    },
    dark: {
        name_bg: color.$dark_dim_bg_color,
        fc: color.$light_pink_color,
        bw: '1px',
        team: {
            team1: color.$fluorescent_pink_color,
            team2: color.$fluorescent_yellow_color
        },
        highlight_color_team: {
            team1: color.$fluorescent_pink_color,
            team2: color.$fluorescent_yellow_color
        },
    },
}

interface TagProperty {
    themeType: ThemeTypes;
    team: TeamTypes;
}

const Tag = styled.div<TagProperty>`
    position: absolute;

    &.is_player_turn {
        .player_info {
            border-width: 2px;
            border-color: ${({ theme, team }) => theme.highlight_color_team[team]};
        }
    }

    &.tag {
        &_cross {
            top: 0;
            transform: translate(-50%, -50%);
            left: 50%;
        }
        &_left {
            transform-origin: left top;
            transform: rotate(-90deg) translate(-50%, -50%);
            top: 50%;
            left: 0;
        }
        &_right {
            transform: rotate(90deg) translate(50%, -50%);
            transform-origin: right top;
            top: 50%;
            right: 0;
        }
        &_user {
            bottom: 0px;
            left: 50%;
            transform: translate(-50%, 50%);
        }
    }

    .player_info {
        display: flex;
        vertical-align: middle;
        border-radius: 5px;
        font-size: 14px;
        line-height: 26px;
        background-color: white;
        overflow: hidden;
        padding-right: 10px;
        transition: .3s all;
        border-style: solid;
        border-width: ${({ theme }) => theme.bw};
        border-color: ${({ themeType, theme, team }) => (themeType === ThemeTypes.Light ? 'transparent' : theme.team[team])};
        background-color: ${({ theme }) => theme.name_bg};
        color: ${({ theme }) => theme.fc};

        .team {
            padding: 5px 10px;
            transition: .3s all;
            background-color: ${({ theme, team }) => theme.team[team]};
        }

        .name {
            max-width: 32vw;
            letter-spacing: 1px;
            padding-left: 10px;
            white-space: nowrap;
            overflow: hidden;
        }
    }
`

interface PlayerNameTagProperty {
    className: string;
    player: string;
    team: TeamTypes;
    isCurrentPlayer: boolean;
}

const PlayerNameTag = (props: PlayerNameTagProperty) => {
    const { className, isCurrentPlayer = false, player, team } = props;
    const theme = useRecoilValue(themeState);
    return (
        <Tag
            theme={themeData[theme]}
            themeType={theme}
            team={team}
            className={classnames(className, { "is_player_turn": isCurrentPlayer })}>
            {isCurrentPlayer && <ThinkingIcon className="on_table" />}
            <div className="player_info">
                <div className="team"></div>
                <div className="name">{player}</div>
            </div>
        </Tag>
    )
}

const Names = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
`

const Nameplate = () => {
    const players = useRecoilValue(relationWithUser);
    const user = useRecoilValue(userNameState);
    const currentPlayer = useRecoilValue(currentPlayerName);
    const userTeam = useRecoilValue(userTeamState);
    const order = ['cross', 'left', 'right', 'user'];
    const orderedPlayers = [players.teammate, players.nextPlayer, players.previousPlayer, user];
    const anotherTeam = [TeamTypes.TeamOne, TeamTypes.TeamTwo].find(team => team !== userTeam) as TeamTypes;
    const teamArray = [userTeam, anotherTeam, anotherTeam, userTeam];

    return (
        <Names className="players_name">
            {orderedPlayers.map((player, index) => (
                <PlayerNameTag
                    key={order[index]}
                    className={`tag_${order[index]}`}
                    player={player}
                    isCurrentPlayer={currentPlayer === player}
                    team={teamArray[index]}
                />
            )
            )}
        </Names>
    )
}

export default Nameplate