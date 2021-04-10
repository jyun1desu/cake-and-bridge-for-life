import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { color } from 'style/theme';
import { suitInPoker, suitColor } from 'util/suit';

const Player = styled.div`
    background-color: white;
    flex:  1 1 25%;
    border-radius: 4px;
    overflow: hidden;
    font-size: 13px;

    & + div {
        margin-left: 5px;
    }

    .name {
        text-align: center;
        line-height: 20px;
        padding: 6px;
        box-sizing: border-box;
        letter-spacing: 1px;
        color: white;
        background-color: ${color.$pink_color};
        width: 100%;

        &  > p {
            overflow: hidden;
            white-space: nowrap;
        }
    }

    .called_bind {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px;
        box-sizing: border-box;
        min-height: 10vh;
        overflow: scroll;
        .bind {
            & + .bind {
                margin-top: 3px;
            }
            &.red {
            color: ${color.$red_suit_color};
            }
            &.black {
                color: ${color.$black_suit_color};
            }
            &.pass {
                letter-spacing: 1px;
                color: ${color.$pass_color};
            }
        }
    }
` 

const PlayInfo = ({name, calledList}) => (
    <Player className="player">
        <div className="name">
            <p>{name}</p>
        </div>
        <div className="called_bind">
            {calledList.map((called,index)=>{
                const isPassed = called === 'PASS';
                if (isPassed) {
                    return (<span key={'pass'+index} className={classnames("bind","pass")}>PASS</span>)
                } else {
                    return (
                        <span  key={'called'+index} className={classnames("bind",suitColor(called.suit))}>
                            {called.number} {suitInPoker(called.suit)}
                        </span>)
                }})
            }
        </div>
    </Player>
);

const fackList = [{suit:'heart',number:1},{suit:'heart',number:1},"PASS"];

const PlayerList = ({className}) => {
    const fake = ['jyun1','故意取很長的名字','🎉','루루'];
    return (
        <div className={className}>
                {fake.map(player => (
                    <PlayInfo 
                        key={player}
                        calledList={fackList}
                        name={player}/>
                ))}
            </div>
    )
}

export default PlayerList;