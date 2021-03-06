import React from 'react';
import db from "database";
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { themeState } from 'store/theme';
import { userRoomState } from 'store/user';
import { responseToBadDeck } from 'store/deck';
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
    transition: .3s all;
    background-color: ${({theme}) => theme.bg };
    border: ${({theme}) => theme.border };

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
            transition: .3s all;
            color: ${({theme}) => theme.fg };
        }
    }

    .button_area {
        display: flex;
        & > button {
            padding: 8px 0;
            font-size: 15px;
            letter-spacing: 2px;
            flex: 1 1 50%;
            transition: .3s all;

            &:first-child {
                background-color: ${({theme}) => theme.yes_button_bg };
                color: ${({theme}) => theme.yes_button_fg };
                border-top: ${({theme}) => theme.border };
                border-right: ${({theme}) => theme.border };
            }

            &:last-child {
                background-color: ${({theme}) => theme.no_button_bg };
                color: ${({theme}) => theme.no_button_fg };
                border-top: ${({theme}) => theme.border };
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
        <AskBox theme={themeData[theme]} >
            <div className="content">
                <img alt="icon" className="icon" src={Kanahei}></img>
                <p>?????????????????????</p>
            </div >
            <div className="button_area">
                <button onClick={restartGame}>??????</button>
                <button onClick={()=>setResponseToBadDeck(true)}>??????</button>
            </div>
        </AskBox >
    )
}

interface ModalGiveUpProperty  {
    active: boolean;
}

const ModalGiveUp = (props: ModalGiveUpProperty) => {
    const {active} = props;
    return (
        <Modal
            active={active}
            className="give_up_modal">
            <Content />
        </Modal >
    );
}

export default ModalGiveUp