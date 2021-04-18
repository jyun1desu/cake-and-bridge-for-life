import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from "recoil";
import Modal from "components/Global/Modal";
import { themeState } from 'store/theme';
import { color } from 'style/theme';
import Button from 'components/Global/Button';

const themeData = {
    light: { 
		bg: 'white',
        border: 'none',
        fg: color.$title_font_color,
        dot: color.$pink_color,
        button_color: color.$green_color
	},
    dark: { 
		bg: color.$dark_dim_bg_color,
        border: '1px solid' + color.$dark_border_color,
        fg: color.$dark_default_font_color,
        dot: color.$fluorescent_pink_color,
        button_color: color.$dark_border_color
	},
}

const LoadingModal = styled.div`
    width: 50vw;
    min-height: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    padding: 20px;
    background-color: ${({theme}) => themeData[theme].bg };
    border: ${({theme}) => themeData[theme].border };

    .text {
        margin: 12px 0;
        font-size: 15px;
        letter-spacing: 1px;
        color: ${({theme}) => themeData[theme].fg };
    }

    .lds-default {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;

        &>div {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            animation: lds-default 1.5s linear infinite;
            background: ${({theme}) => themeData[theme].dot };

            &:nth-child(1) {
                animation-delay: 0s;
                top: 37px;
                left: 66px;
            }

            &:nth-child(2) {
                animation-delay: -0.1s;
                top: 22px;
                left: 62px;
            }

            &:nth-child(3) {
                animation-delay: -0.2s;
                top: 11px;
                left: 52px;
            }

            &:nth-child(4) {
                animation-delay: -0.3s;
                top: 7px;
                left: 37px;
            }

            &:nth-child(5) {
                animation-delay: -0.4s;
                top: 11px;
                left: 22px;
            }

            &:nth-child(6) {
                animation-delay: -0.5s;
                top: 22px;
                left: 11px;
            }

            &:nth-child(7) {
                animation-delay: -0.6s;
                top: 37px;
                left: 7px;
            }

            &:nth-child(8) {
                animation-delay: -0.7s;
                top: 52px;
                left: 11px;
            }

            &:nth-child(9) {
                animation-delay: -0.8s;
                top: 62px;
                left: 22px;
            }

            &:nth-child(10) {
                animation-delay: -0.9s;
                top: 66px;
                left: 37px;
            }

            &:nth-child(11) {
                animation-delay: -1s;
                top: 62px;
                left: 52px;
            }

            &:nth-child(12) {
                animation-delay: -1.1s;
                top: 52px;
                left: 62px;
            }
        }
    }

    @keyframes lds-default {
        0%,
        20%,
        80%,
        100% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.5);
        }
    }
`

const Loading = ({style, cancelReady}) =>  {
    const [theme] = useRecoilState(themeState);
    const dots = () => {
        const dots = [];
        const dotAmount = 13
        for(let i = 1;i<dotAmount;i++){
            dots.push(<div key={i}></div>);
        }
        return dots
    }

    return (
        <Modal style={style} className="loading-modal">
            <LoadingModal 
                theme={theme}
                className="loading">
                <div className="lds-default">
                    {dots()}
                </div>
                <p className="text">等待其他玩家開始</p>
                <Button 
                    color={themeData[theme].button_color}
                    onClick={cancelReady}
                    className="cancel_ready"
                >我還沒好</Button>
            </LoadingModal>
        </Modal>
    )
};

export default Loading;