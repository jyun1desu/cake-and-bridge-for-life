import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { themeState } from 'store/theme';
import { color } from "style/theme";
import Nameplate from './Nameplate';
import PlayedCard from './PlayedCard';

const Table = styled.div`
    width: 60vw;
    height: 60vw;
    border-radius: 10px;
    position: relative;
    transition: all .3s;
    border: 1px solid ${({theme}) => theme.border_color };
    background-color: ${({theme}) => theme.bg };
`


const themeData = {
    light: { 
        bg: '#f9f9f9',
        border_color: 'transparent'
    },
    dark: { 
        bg: color.$dark_dim_bg_color,
        border_color: color.$dark_dim_border_color
    },
}

const CardTable = () => {
    const [theme] = useRecoilState(themeState);
    return (
        <Table theme={themeData[theme]} className="card_table">
            <PlayedCard />
            <Nameplate />
        </Table>
    )
}

export default CardTable