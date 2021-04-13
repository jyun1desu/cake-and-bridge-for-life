import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { color } from 'style/theme';
import { suitInPoker, suitColor } from 'util/suit';
import ThinkingIcon from 'components/GameRoom/ThinkingIcon';

const Player = styled.div`
    position: relative;
    flex:  0 1 25%;
    background-color: white;
    font-size: 13px;
    border-radius: 4px;
    box-shadow: ${(props)=>(props.isUserTurn
            ?`0px 0px 0px 2px ${color.$highlight_color}`
            :'none')};


    & + div {
        margin-left: 6px;
    }

    .name {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom: none;
        max-width: calc(90vw/4 - 38px/4);
        text-align: center;
        line-height: 20px;
        padding: 6px;
        box-sizing: border-box;
        letter-spacing: 1px;
        color: white;
        background-color: ${color.$pink_color};

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

const PlayInfo = ({name, calledList, isUserTurn=false}) => (
    <Player 
        className="player"
        isUserTurn={isUserTurn}>
        {isUserTurn && <ThinkingIcon className="on_bind_list"/>}
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