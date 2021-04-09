import React from 'react';
import styled from 'styled-components';
import { color } from 'style/theme'

const Tag = styled.div`
    position: absolute;

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
        color: ${color.$title_font_color};
        background-color: white;
        overflow: hidden;
        padding-right: 10px;

        .team {
            padding: 5px 10px;
            background-color: ${color.$pink_color};
        }
        .name {
            max-width: 32vw;
            letter-spacing: 1px;
            padding: 5px 0 5px 10px;
            white-space: nowrap;
            overflow: hidden;
            
        }
    }
`

const fakeplayers = ['아이유','我是喜歡取很長的人哇哈','micheal','😉']

const PlayerNameTag = ({className, index}) => {
    const isThinking = false;
    return (
        <Tag className={ className }>
            {isThinking && <div>thinking icon</div>}
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