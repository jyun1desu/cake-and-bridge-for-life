import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { useRecoilState } from 'recoil';
import { themeState } from 'store/theme';
import ThinkingIcon from 'components/GameRoom/ThinkingIcon';
import { color } from 'style/theme'

const Tag = styled.div`
    position: absolute;

    &.is_player_turn {
        .player_info {
            border-width: 2px;
        }
    }

    &.tag {
        &_cross {
            top: 0;
            transform: translate(-50%, -50%);
            left: 50%;
        }
        &_left {
            transform-origin: left top;
            transform: rotate(-90deg) translate(-50%, -50%);
            top: 50%;
            left: 0;
        }
        &_right {
            transform: rotate(90deg) translate(50%, -50%);
            transform-origin: right top;
            top: 50%;
            right: 0;
        }
        &_user {
            bottom: 0px;
            left: 50%;
            transform: translate(-50%, 50%);
        }
    }

    .player_info {
        display: flex;
        vertical-align: middle;
        border-radius: 5px;
        font-size: 14px;
        line-height: 26px;
        background-color: white;
        overflow: hidden;
        padding-right: 10px;
        transition: .5s all;
        border-style: solid;
        border-width: ${({theme}) => themeData[theme].bw };
        border-color: ${({theme, team}) => (theme === 'light'? 'transparent':themeData[theme].team[team])};
        background-color: ${({theme}) => themeData[theme].name_bg };
        color: ${({ theme }) => themeData[theme].fc};

        .team {
            padding: 5px 10px;
            transition: .5s all;
            background-color: ${({ theme, team }) => themeData[theme].team[team]};
        }

        .name {
            max-width: 32vw;
            letter-spacing: 1px;
            padding-left: 10px;
            white-space: nowrap;
            overflow: hidden;
        }
    }
`

const themeData = {
    light: { 
        name_bg: 'white',
        fc: color.$title_font_color,
        bw: '0px',
        border: 'transparent',
        team: {
            team1: color.$pink_color,
            team2: color.$brown_color,
        }
    },
    dark: { 
        name_bg: color.$dark_dim_bg_color,
        fc: color.$light_pink_color,
        bw: '1px',
        team: {
            team1: color.$fluorescent_pink_color,
            team2: color.$fluorescent_yellow_color
        }
    },
}

const fakeplayers = ['jyun1dusu','我是喜歡取很長的人哇哈','micheal','😉']

const PlayerNameTag = ({className, index, isNowPlayer = false}) => {
    const [theme] = useRecoilState(themeState);
    return (
        <Tag 
            theme={theme} 
            team={"team" + (index%2 + 1)}
            className={classnames(className,{"is_player_turn": isNowPlayer})}>
            {isNowPlayer && <ThinkingIcon className="on_table"/>}
            <div className="player_info">
                <div className="team"></div>
                <div className="name">{fakeplayers[index]}</div>
            </div>
        </Tag>
    )
} 

const order = ['cross', 'left', 'right', 'user'];

const Names = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
`

const Nameplate = () => {
    return (
        <Names className="players_name">
            {order.map((order,index)=>{
                return(
                    <PlayerNameTag 
                        key={order+'nameTag'} 
                        className={`tag_${order}`} 
                        index={index} 
                    />
                )
            })}
        </Names>
    )
}

export default Nameplate