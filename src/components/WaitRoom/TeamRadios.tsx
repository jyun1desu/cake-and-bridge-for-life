import React from "react";
import classnames from 'classnames'
import styled from 'styled-components';
import db from "database";
import { useRecoilValue, useRecoilState } from 'recoil';

import { Team, TeamTypes } from 'types/player';
import { themeState } from 'store/theme';
import { userTeamState } from 'store/user';
import { color } from 'style/theme';
import Radio from 'components/Global/Radio'

const themeData = {
    light: {
        default_f: '#A7A7A7',
        st_fg: color.$pink_color,
        cl_fg: color.$brown_color,
    },
    dark: {
        default_f: '#787878',
        st_fg: color.$fluorescent_pink_color,
        cl_fg: color.$fluorescent_yellow_color,
    },
}

const StyledRadio = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    letter-spacing: 1px;
    transition: 0.3s all;
    color: ${({ theme }) => theme.default_f};

    &.chosen {
        &.team1 {
            color: ${({ theme }) => theme.st_fg};

            .radio::after {
                transition: 0.3s all;
                background-color: ${({ theme }) => theme.st_fg};
            }
        }

        &.team2 {
            color: ${({ theme }) => theme.cl_fg};

            .radio::after {
                transition: 0.3s all;
                background-color: ${({ theme }) => theme.cl_fg};
            }
        }
    }
`
const RadioArea = styled.div`
    align-self: flex-start;
    width: 100%;

    .options {
        display: flex;
        width: 100%;
        justify-content: space-around;
        font-size: 0;
    }
`

interface TeamOptionProperty {
    team: '草莓糕' | '可麗露';
    isChosen: boolean;
    teamIndex: Team;
    onClick: () => void;
}

const TeamOption = (props: TeamOptionProperty) => {
    const { team, isChosen, onClick = () => { }, teamIndex } = props;
    const [theme] = useRecoilState(themeState);
    const getBorder = () => {
        switch (theme) {
            case 'light':
            default:
                return 'none'
            case 'dark':
                if (isChosen) {
                    return `1px solid ${teamIndex === TeamTypes.TeamOne 
                        ? themeData[theme].st_fg 
                        : themeData[theme].cl_fg}`
                } else {
                    return `1px solid ${color.$dark_dim_border_color}`
                }
        }
    }
    return (
        <StyledRadio
            theme={themeData[theme]}
            onClick={onClick}
            className={classnames('option', teamIndex, {
                'chosen': isChosen,
            })}>
            <Radio
                border={getBorder()}
                className="radio"
                size={15}
                marginRight={8} />
            <span>{team}</span>
        </StyledRadio>
    )
}

interface TeamRadiosProperty {
    roomName: string;
    userID: string;
}

const TeamRadios = (props: TeamRadiosProperty) => {
    const { roomName, userID } = props;
    const userTeam = useRecoilValue(userTeamState);
    const team = ['草莓糕', '可麗露'] as ['草莓糕', '可麗露'];

    const handleChooseTeam = (team: Team) => {
        const roomRef = db.database().ref(`/${roomName}`);
        const userInfo = roomRef.child('playersInfo').child(`${userID}`);
        userInfo.update({ team });
    };

    return (
        <RadioArea className="choose_team">
            <div className="options">
                {team.map((team, index) => {
                    const teamIndex = `team${index + 1}` as Team;
                    return (
                        <TeamOption
                            onClick={() => handleChooseTeam(teamIndex)}
                            isChosen={userTeam === teamIndex}
                            key={index}
                            team={team}
                            teamIndex={teamIndex}
                        />
                    )
                })}
            </div >
        </RadioArea >
    )
}

export default TeamRadios