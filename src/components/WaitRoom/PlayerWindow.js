import React from 'react';
import classnames from 'classnames'
import { color } from 'style/theme'

import styled from 'styled-components';
import { playersData } from 'store/players';
import { useRecoilValue, useRecoilState } from 'recoil';
import { themeState } from 'store/theme';

const themeData = {
    light: { 
        w_border: 'none',
		st_bg: 'rgb(241, 224, 224)',
        st_border: 'none',
		cl_bg: 'rgb(206, 190, 180)',
        cl_border: 'none',
        name_bg: 'white',
        name_st_fg: color.$title_font_color,
        name_cl_fg: color.$title_font_color,
        ready_fg: color.$title_font_color,
        ready_bg: '#F3DE93',
        ready_border: '2px solid white',
	},
    dark: { 
        w_border: '1px solid' + color.$dark_dim_border_color ,
		st_bg: color.$dark_dim_bg_color,
		st_border: '1px solid' + color.$fluorescent_pink_color,
		cl_bg: color.$dark_dim_bg_color,
		cl_border: '1px solid' + color.$fluorescent_yellow_color,
        name_bg: 'transparent',
        name_st_fg: color.$fluorescent_pink_color,
        name_cl_fg: color.$fluorescent_yellow_color,
        ready_fg: color.$title_font_color,
        ready_bg: 'transparent',
        ready_border: '2px solid white',
	},
}

const playersOrder = ['first', 'second', 'third', 'fourth'];

const Window = styled.div`
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
    height: 90vw;
    margin-bottom: 30px;
    border: ${({theme}) => themeData[theme].w_border };

    .player {
        flex-basis: 50%;
        height: 45vw;
        display: flex;
        flex-direction: column;
        letter-spacing: 1px;
        justify-content: flex-end;
        align-items: stretch;
        transition: all 0.3s;
        position: relative;
        padding: 15px;
        box-sizing: border-box;

        &:nth-child(1) {
            border-right: ${({theme}) => themeData[theme].w_border };
            border-bottom: ${({theme}) => themeData[theme].w_border };
        }

        &:nth-child(2) {
            border-bottom: ${({theme}) => themeData[theme].w_border };
        }

        &:nth-child(3) {
            border-right: ${({theme}) => themeData[theme].w_border };
        }

        &.strawberry_team {
            background-color: ${({theme}) => themeData[theme].st_bg };
            
            .player__name {
                color: ${({theme}) => themeData[theme].name_st_fg };
                border: ${({theme}) => themeData[theme].st_border };
            }
        }

        &.canele_team {
            background-color: ${({theme}) => themeData[theme].cl_bg };
            .player__name {
                color: ${({theme}) => themeData[theme].name_cl_fg };
                border: ${({theme}) => themeData[theme].cl_border };
            }
        }

        &__name {
            text-align: center;
            flex: 0 1 auto;
            border: 2px solid transparent;
            border-radius: 20px;
            font-size: 20px;
            padding: 7px 10px;
            margin: 0;
            position: relative;
            transition: 0.3s all;
            background-color: ${({theme}) => themeData[theme].name_bg };
        }
    }    
`

const PlayerBox = ({ order, playerData }) => {
    const playerName = playerData? playerData.player : '';
    const defaultTeam = order === 'first' || order === 'fourth'? '1' : '2';
    const playerTeam = playerData? playerData.team : defaultTeam

    return(
    <div
        className={classnames(
            'player',
            `player__${order}`,{
            [`strawberry_team`]: playerTeam === '1',
            [`canele_team`]: playerTeam === '2',
            })}>
        {playerName && <p className={classnames('player__name',{'ready_to_go': playerData.ready})}>{playerName}</p>}
    </div>
)}

const PlayerWindow = ({ className }) => {
    const [theme] = useRecoilState(themeState);
    const playerList = useRecoilValue(playersData);
    return (
        <Window 
            theme={theme}
            className={className}>
            {playersOrder.map((order, index) => (
                <PlayerBox key={order} order={order} playerData={playerList[index]} />))}
        </Window >
    )
};

export default PlayerWindow;