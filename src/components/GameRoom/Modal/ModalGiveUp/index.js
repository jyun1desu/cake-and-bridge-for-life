import React from 'react';
import db from "database";
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { themeState } from 'store/theme';
import { userRoomState } from 'store/user';
import { responseToBadDeck } from 'store/deck';
import { modalState } from 'store/modal';
import { color } from 'style/theme';
import Modal from 'components/Global/Modal';
import Kanahei from 'assets/kanaheiclap.gif';

const themeData = {
    light: { 
        bg: 'white',
        border: 'none',
        fg: color.$default_font_color,
        yes_button_fg: 'white',
        yes_button_bg: color.$pink_color,
        no_button_fg: 'white',
        no_button_bg: color.$green_color,
    },
    dark: { 
        bg: color.$dark_dim_bg_color,
        border: `1px solid ${color.$dark_dim_border_color}`,
        fg: color.$dark_default_font_color,
        yes_button_fg: color.$fluorescent_pink_color,
        yes_button_bg: 'transparent',
        no_button_fg: color.$fluorescent_green_color,
        no_button_bg: 'transparent',
    },
}

const AskBox = styled.div`
    display:  flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    overflow: hidden;
    transition: .5s all;
    background-color: ${({theme}) => themeData[theme].bg };
    border: ${({theme}) => themeData[theme].border };

    .content {
        display:  flex;
        flex-direction: column;
        align-items: center;
        padding: 25px 15px 15px;

        img {
        width: 80px;
        margin-bottom: 20px;
        }

        p {
            letter-spacing: 1px;
            transition: .5s all;
            color: ${({theme}) => themeData[theme].fg };
        }
    }

    .button_area {
        display: flex;
        & > button {
            padding: 8px 0;
            font-size: 15px;
            letter-spacing: 2px;
            flex: 1 1 50%;
            transition: .5s all;

            &:first-child {
                background-color: ${({theme}) => themeData[theme].yes_button_bg };
                color: ${({theme}) => themeData[theme].yes_button_fg };
                border-top: ${({theme}) => themeData[theme].border };
                border-right: ${({theme}) => themeData[theme].border };
            }

            &:last-child {
                background-color: ${({theme}) => themeData[theme].no_button_bg };
                color: ${({theme}) => themeData[theme].no_button_fg };
                border-top: ${({theme}) => themeData[theme].border };
            }
        }
    }
`

const Content = () => {
    const [theme] = useRecoilState(themeState);
    const roomName = useRecoilValue(userRoomState);
    const setResponseToBadDeck = useSetRecoilState(responseToBadDeck);

    const restartGame = () => {
        const roomRef = db.database().ref(`/${roomName}`);
        roomRef.child('restart').set(true);
    }

    return (
        <AskBox theme={theme} >
            <div className="content">
                <img alt="icon" className="icon" src={Kanahei}></img>
                <p>好像可以倒牌捏，要倒嗎？</p>
            </div >
            <div className="button_area">
                <button onClick={restartGame}>倒啦</button>
                <button onClick={()=>setResponseToBadDeck(true)}>不倒</button>
            </div>
        </AskBox >
    )
}

const ModalGiveUp = () => {
    return (
        <Modal
            className="give_up_modal">
            <Content />
        </Modal >
    );
}

export default ModalGiveUp