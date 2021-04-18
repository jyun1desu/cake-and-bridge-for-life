import React from "react";
import classnames from 'classnames'
import styled from 'styled-components';
import db from "database";
import { useRecoilValue, useRecoilState } from 'recoil';

import { themeState } from 'store/theme';
import { userTeamState } from 'store/user';
import { color } from 'style/theme';
import Radio from 'components/Global/Radio'

const team = ['草莓糕', '可麗露'];

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
    color: ${({theme}) => themeData[theme].default_f };

    &.chosen {
        &.team1 {
            color: ${({theme}) => themeData[theme].st_fg };

            .radio::after {
                transition: 0.3s all;
                background-color: ${({theme}) => themeData[theme].st_fg };
            }
        }

        &.team2 {
            color: ${({theme}) => themeData[theme].cl_fg };

            .radio::after {
                transition: 0.3s all;
                background-color: ${({theme}) => themeData[theme].cl_fg };
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
    const [theme] = useRecoilState(themeState);
    const getBorder = () => {
        switch(theme) {
            case 'light':
            default:
                return 'none'
            case 'dark': 
                if(isChosen){
                    return `1px solid ${teamIndex === "1" ? themeData[theme].st_fg: themeData[theme].cl_fg}`
                } else {
                    return `1px solid ${color.$dark_dim_border_color}`
                }
        }
    }
    return (
        <StyledRadio
        theme={theme}
        onClick={onClick}
        className={classnames('option',`team${teamIndex}`,{
            'chosen': isChosen,
        })}>
            <Radio 
                border={getBorder()}
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