import React from 'react';
import classnames from 'classnames'
import { color } from 'style/theme'

import styled from 'styled-components';
import { playersData } from 'store/players';
import { useRecoilValue } from 'recoil';

const playersOrder = ['first', 'second', 'third', 'fourth'];

const Window = styled.div`
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
    height: 90vw;
    margin-bottom: 30px;

    .player {
        flex-basis: 50%;
        height: 45vw;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        letter-spacing: 1px;
        justify-content: flex-end;
        align-items: stretch;
        transition: all 0.2s;
        position: relative;
        padding: 15px;
        box-sizing: border-box;

        &.strawberry_team {
            background-color: rgb(241, 224, 224);
        }

        &.canele_team {
            background-color: rgb(206, 190, 180);
        }

        &__name {
            text-align: center;
            flex: 0 1 auto;
            background-color: #fff;
            border-radius: 20px;
            font-size: 20px;
            color:${color.$title_font_color};
            padding: 7px 10px;
            margin: 0;
            position: relative;

            .ready_to_go {
                border: 3px solid ${color.$highlight_color};
            }
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
        {playerName && <p className="player__name">{playerName}</p>}
    </div>
)}

const PlayerWindow = ({ className }) => {
    const playerList = useRecoilValue(playersData);
    return (
        <Window className={className}>
            {playersOrder.map((order, index) => (
                <PlayerBox key={order} order={order} playerData={playerList[index]} />))}
        </Window >
    )
};

export default PlayerWindow;