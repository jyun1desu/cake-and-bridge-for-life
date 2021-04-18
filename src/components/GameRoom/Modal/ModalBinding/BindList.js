import React from 'react';
import styled from 'styled-components';
import { color } from 'style/theme';
import { userPickBindState  } from 'store/bind';
import { suitInPoker } from 'util/suit';
import OptionList from './OptionList';
import { useRecoilValue } from 'recoil';
import classnames from 'classnames';

const Box = styled.div`
    border-radius: 4px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: 0.5s all;
    background-color: ${({theme}) => themeData[theme].bg };
    border-width: ${({theme}) => theme==='light'? 0 : '1px' };
    border-style: solid;
    border-color: ${({theme}) => themeData[theme].border };

    & > p {
        padding: 8px 0;
        font-size: 16px;
        text-align: center;
        letter-spacing: 1px;
        margin-bottom: 5px;
        transition: 0.5s all;
        border-bottom: 1px solid ${({theme}) => themeData[theme].border };
        background-color: ${({theme}) => themeData[theme].status_unable_bg };
        color: ${({theme}) => themeData[theme].status_unable_fg };
    }

    & > button {
        padding: 8px 0;
        margin-top: 5px;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 2px;
        transition: 0.5s all;
        border-top: 1px solid ${({theme}) => themeData[theme].border };
        background-color: ${({theme}) => themeData[theme].call_unable_bg };
        color: ${({theme}) => themeData[theme].call_unable_fg };
    }

    &.is_user_turn{
        & > p {
            background-color: ${({theme}) => themeData[theme].status_active_bg };
            color: ${({theme}) => themeData[theme].status_active_fg };
        }
        & > button {
            background-color: ${({theme}) => themeData[theme].call_pass_bg };
            color: ${({theme}) => themeData[theme].call_pass_fg };;

            &.has_pick_bind {
                background-color: ${({theme}) => themeData[theme].call_active_bg };
                color: ${({theme}) => themeData[theme].call_active_fg };
            }
        }
    }
`

const Hint =styled.p`
    text-align: center;
    margin-top: 4px;
    letter-spacing: 1px;
    font-size: 12px;
    transition: 0.5s all;
    color: ${({theme}) => themeData[theme].hint };
`

const themeData = {
    light: { 
        bg: 'white',
        status_unable_bg: color.$unable_color, 
        status_active_bg: color.$highlight_color,
        status_unable_fg: color.$unable_font_color, 
        status_active_fg: color.$title_font_color,
        call_unable_bg: color.$$unable_color,
        call_unable_fg: color.$unable_font_color,
        call_pass_bg: color.$pass_color,
        call_pass_fg: 'white',
        call_active_bg: color.$pink_color,
        call_active_fg: 'white',
        border: 'transparent',
        hint: color.$default_font_color,
    },
    dark: {
        bg: color.$dark_dim_bg_color,
        status_unable_bg: color.$dark_dim_bg_color, 
        status_unable_fg: color.$unable_font_color, 
        status_active_bg: color.$dark_dim_bg_color,
        status_active_fg: color.$fluorescent_yellow_color,
        call_unable_bg: color.$dark_dim_bg_color,
        call_unable_fg: '#7B7B7B',
        call_pass_bg: color.$dark_dim_bg_color,
        call_pass_fg: color.$fluorescent_green_color,
        call_active_bg: color.$dark_dim_bg_color,
        call_active_fg: color.$fluorescent_pink_color,
        border: color.$dark_dim_border_color,
        hint: 'white',
    },
}

const BindList = ({theme}) => {
    const userPickBind = useRecoilValue(userPickBindState);
    const isUserTurn = true;

    const callBind = () => {
        if(!isUserTurn) return;

        if(!userPickBind) {
            console.log('pass')
        } else {
            console.log(userPickBind)
        }
    };

    return (
        <>
            <Box 
                theme={theme}
                className={classnames("bind_list",{"is_user_turn": isUserTurn})}>
                <p>{isUserTurn?'':'NOT '}YOUR TURN</p>
                <OptionList
                    theme={theme}
                    isUserTurn={isUserTurn}
                    tricks={[1, 2, 3, 4, 5, 6]} />
                <button 
                    onClick={callBind}
                    className={classnames({"has_pick_bind": userPickBind})}>{
                userPickBind 
                    ? ('喊 '+ userPickBind.number + suitInPoker(userPickBind.suit)) 
                    : "PASS"}
                </button>
            </Box>
            { userPickBind && <Hint theme={theme}>再次點擊相同選項可以取消選擇</Hint>}
        </>
    )
}

export default BindList;
