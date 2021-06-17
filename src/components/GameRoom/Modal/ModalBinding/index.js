import React from 'react';
import styled from 'styled-components';
import { color } from 'style/theme';
import { useRecoilState } from 'recoil';
import { themeState } from 'store/theme';

import Modal from 'components/Global/Modal';
import PlayerList from './PlayerList'
import BindList from './BindList'


const Box = styled.div`
    width: 85vw;
    align-self: flex-start;
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    border-radius: 6px;
    overflow: hidden;
    transition: 0.5s all;
    border: ${({theme}) => themeData[theme].border };

    .title {
        margin: 0;
        padding: 10px 0;
        text-align: center;
        font-size: 18px;
        letter-spacing: 2px;
        color: white;
        transition: 0.5s all;
        border-bottom: ${({theme}) => themeData[theme].border };
        background-color: ${({theme}) => themeData[theme].title_bg };
    }

    .content {
        padding: 10px;
        transition: 0.5s all;
        background-color: ${({theme}) => themeData[theme].content_bg };

        .player_list {
            display: flex;
        }
    }
`

const themeData = {
    light: { 
        title_bg: color.$green_color, 
        content_bg: color.$theme_background,
        border: `1px solid transparent`,
    },
    dark: { 
        title_bg: color.$dark_bg_color, 
        content_bg: color.$dark_dim_bg_color,
        border: `1px solid ${color.$dark_dim_border_color}`,
    },
}

const BindingBox = () => {
    const [theme] = useRecoilState(themeState);
    return (
        <Box
            theme={theme}
            className="box">
            <p className="title">BINDING</p>
            <div className="content">
                <PlayerList className="player_list" />
                <BindList theme={theme} />
            </div>
        </Box>
    )
}

const ModalBinding = ({ active }) => {
    return (
        <Modal
            active={active}
            className="binding_modal">
            <BindingBox />
        </Modal>
    )
}

export default ModalBinding;