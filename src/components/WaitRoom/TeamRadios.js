import React from "react";
import classnames from 'classnames'
import styled from 'styled-components';
import db from "database";
import { color } from 'style/theme';
import { userTeamState } from 'store/user';
import { useRecoilValue } from 'recoil';
import Radio from 'components/Global/Radio'

const team = ['ショートケーキ', 'カヌレ'];

const StyledRadio = styled.div`
    font-size: 18px;
    letter-spacing: 1px;
    color: rgb(167, 167, 167);

    &.chosen {
        &.team1 {
            color: ${color.$pink_color};

            .radio::after {
                background-color: ${color.$pink_color};
            }
        }

        &.team2 {
            color: ${color.$brown_color};

            .radio::after {
                background-color: ${color.$brown_color};
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

const TeamOption = ({team, isChosen, onClick=()=>{}, teamIndex}) => {
    return (
        <StyledRadio
        onClick={onClick}
        className={classnames('option',`team${teamIndex}`,{
            'chosen': isChosen,
        })}>
        <Radio 
            className="radio"
            size="15"
            marginRight="8"/>
        <span>{team}</span>
    </StyledRadio>
    )
}

const TeamRadios = ({roomName, userID}) => {
    const userTeam = useRecoilValue(userTeamState);

    const handleChooseTeam = (team) => {
        const roomRef = db.database().ref(`/${roomName}`);
        const userInfo = roomRef.child('playersInfo').child(`${userID}`);
        userInfo.update({team});
    };

    return (
        <RadioArea className="choose_team">
            <div className="options">
                {team.map((team, index) => {
                    const teamIndex = `${index + 1}`;
                    return (
                        <TeamOption 
                            onClick={()=>handleChooseTeam(teamIndex)}
                            isChosen={ userTeam === teamIndex }
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