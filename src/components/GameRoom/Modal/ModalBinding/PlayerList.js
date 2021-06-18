import React, { useEffect } from 'react';
import classnames from 'classnames';
import db from "database";
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { themeState } from 'store/theme';
import { color } from 'style/theme';
import { suitInPoker, suitColor } from 'util/suit';
import { OrderedStartFromTeamOne } from 'store/players';
import { currentPlayerName } from 'store/game';
import { playersCalledListState } from 'store/bind';
import { userRoomState } from 'store/user';
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

    &.is_player_turn {
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
        transition: 0.3s all;
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
        min-height: 8vh;
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

const PlayInfo = ({name, team, calledList}) => {
    const [theme] = useRecoilState(themeState);
    const nowPlayer = useRecoilValue(currentPlayerName);
    const isPlayerTurn = nowPlayer === name;

    return(
    <Player
        theme={theme}
        team={team}
        className={classnames("player",{is_player_turn: isPlayerTurn})}
        >
        {isPlayerTurn && <ThinkingIcon className="on_bind_list"/>}
        <div className="name">
            <p>{name}</p>
        </div>
        <div className="called_bind">
            {calledList.map((called,index)=>{
                const isPassed = typeof called !== 'object';
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

const PlayerList = ({className}) => {
    const playerList = useRecoilValue(OrderedStartFromTeamOne);
    const roomName = useRecoilValue(userRoomState);
    const [calledList, setCalledList] = useRecoilState(playersCalledListState);

    useEffect(()=>{
        const calledBindsRef = db.database().ref(`/${roomName}`).child('gameInfo').child('calledBinds');
        calledBindsRef.on("value",(data) => {
            const allCalledBinds = data.val();
            setCalledList(allCalledBinds || {});
        })
        return () => {
            calledBindsRef.off();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={className}>
                {playerList.map((player, index) => (
                    <PlayInfo 
                        key={player+index}
                        name={player}
                        team={'team'+ (index%2)+1 }
                        calledList={calledList[player] || []}/>
                ))}
        </div>
    )
}

export default PlayerList;