import React from 'react';
import styled from 'styled-components';
import { color } from 'style/theme';
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
    background-color: #fff;
    overflow: hidden;

    .title {
        margin: 0;
        padding: 10px 0;
        text-align: center;
        font-size: 18px;
        letter-spacing: 2px;
        color: white;
        background-color: ${color.$green_color};
    }

    .content {
        padding: 10px;
        background-color: ${color.$theme_background};

        .player_list {
            display: flex;
        }
    }
`

const BindingBox = () => {
    return (
        <Box className="box">
            <p className="title">BINDING</p>
            <div className="content">
                <PlayerList className="player_list"/>
                <BindList />
            </div>
        </Box>
    )
}

const ModalBinding = () => {
    return (
        <Modal 
            littleMask
            className="binding_modal">
            <BindingBox />
        </Modal>
    )
}

export default ModalBinding;