import React from "react";
import classnames from 'classnames'
import styled from 'styled-components';
import { color } from 'style/theme';
import { userTeamState } from 'store/user';
import { useRecoilValue } from 'recoil';

const team = ['ショートケーキ', 'カヌレ'];

const StyledRadio = styled.div`
    font-size: 18px;
    letter-spacing: 1px;
    color: rgb(167, 167, 167);

    .radio {
        cursor: pointer;
        position: relative;
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background-color: #fff;
        margin-right: 8px;

        &::after {
            content: "";
            display: block;
            width: 70%;
            height: 70%;
            border-radius: 70%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

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

const Radio = ({team, isChosen, onClick=()=>{}, teamIndex}) => {
    return (
        <StyledRadio
        onClick={onClick}
        className={classnames('option',`team${teamIndex}`,{
            'chosen': isChosen,
        })}>
        <span className="radio"></span>
        <span>{team}</span>
    </StyledRadio>
    )
}

const TeamRadios = () => {
    const userTeam = useRecoilValue(userTeamState);

    const handleChooseTeam = (team) => {
        console.log(team)
    };

    return (
        <RadioArea className="choose_team">
            <div className="options">
                {team.map((team, index) => {
                    const teamIndex = `${index + 1}`;
                    return (
                        <Radio 
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