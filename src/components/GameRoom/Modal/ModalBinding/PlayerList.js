import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { themeState } from 'store/theme';
import { color } from 'style/theme';
import { suitInPoker, suitColor } from 'util/suit';
import ThinkingIcon from 'components/GameRoom/ThinkingIcon';

const themeData = {
    light: { 
        t1_name_fg: 'white', 
        t2_name_fg: 'white', 
        t1_name_bg: color.$pink_color,
        t2_name_bg: color.$brown_color,
        binds_bg: 'white',
        border: 'none',
        red_suit_color: color.$red_suit_color,
        black_suit_color: color.$black_suit_color,
        pass_color: color.$pass_color
    },
    dark: { 
        t1_name_fg: color.$fluorescent_pink_color, 
        t2_name_fg: color.$fluorescent_yellow_color, 
        t1_name_bg: color.$dark_dim_bg_color,
        t2_name_bg: color.$dark_dim_bg_color,
        binds_bg: color.$dark_dim_bg_color,
        border: "1px solid" + color.$dark_dim_border_color,
        red_suit_color: color.$dark_red_suit_color,
        black_suit_color: 'white',
        pass_color: color.$fluorescent_green_color
    },
}

const getUserTurnEffect = ({theme, team}) => {
    switch(theme){
        case 'light':
        default:
            return `box-shadow: 0px 0px 0px 2px ${color.$highlight_color};`
        case 'dark':
            const teamColor = team === 'team1'? color.$fluorescent_pink_color:color.$fluorescent_yellow_color
            return `
            border: none;
            box-shadow: 0 0 2px 1px ${teamColor};
            `
    }
}

const Player = styled.div`
    position: relative;
    flex:  0 1 25%;
    font-size: 13px;
    border-radius: 4px;
    background-color: ${({theme}) => themeData[theme].binds_bg };
    border: ${({theme}) => themeData[theme].border };

    &.is_user_turn {
        ${({theme, team}) => getUserTurnEffect({theme, team}) };
    }

    & + div {
        margin-left: 6px;
    }

    .name {
        position: relative;
        border-radius: 4px 4px 0 0;
        max-width: calc(85vw/4 - 38px/4);
        text-align: center;
        line-height: 20px;
        padding: 6px;
        box-sizing: border-box;
        letter-spacing: 1px;
        transition: 0.5s all;
        border-bottom: ${({theme}) => themeData[theme].border };

        &  > p {
            overflow: hidden;
            white-space: nowrap;
        }
    }

    &:nth-child(2n+1) {
        .name {
            background-color: ${({theme}) => themeData[theme].t1_name_bg };
            color: ${({theme}) =>themeData[theme].t1_name_fg };
        }   
    }

    &:nth-child(2n+2) {
        .name {
            background-color: ${({theme}) => themeData[theme].t2_name_bg };
            color: ${({theme}) => themeData[theme].t2_name_fg };
        }   
    }


    .called_bind {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px;
        box-sizing: border-box;
        min-height: 5vh;
        overflow: scroll;
        .bind {
            & + .bind {
                margin-top: 3px;
            }
            &.red {
                color: ${({theme}) => themeData[theme].red_suit_color};
            }
            &.black {
                color: ${({theme}) => themeData[theme].black_suit_color};
            }
            &.pass {
                letter-spacing: 1px;
                color: ${({theme}) => themeData[theme].pass_color};
            }
        }
    }
` 

const PlayInfo = ({name, calledList, isUserTurn=name==='jyun1', team}) => {
    const [theme] = useRecoilState(themeState);
    return(
    <Player 
        theme={theme}
        team={team}
        className={classnames("player",{is_user_turn: isUserTurn})}
        >
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
)};

const fackList = [{suit:'spades',number:1},{suit:'heart',number:1},"PASS"];

const PlayerList = ({className}) => {
    const fake = ['jyun1','故意取很長的名字','🎉','루루'];
    return (
        <div className={className}>
                {fake.map((player, index) => (
                    <PlayInfo 
                        key={player}
                        calledList={fackList}
                        name={player}
                        team={'team'+ (index%2)+1 }/>
                ))}
        </div>
    )
}

export default PlayerList;