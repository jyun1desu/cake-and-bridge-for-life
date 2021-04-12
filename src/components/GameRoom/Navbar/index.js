import React from 'react';
import styled from 'styled-components';
import Settings from 'components/GameRoom/Settings';
import WonTricks from 'components/GameRoom/WonTricks';
import {color} from 'style/theme';
import { navState } from 'store/user';
import { useRecoilValue } from 'recoil';

const Background = styled.nav`
    z-index: ${props=>props.nowNav?30:0};
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${props=>props.nowNav?color.$shadow:'transparent'};
    transition: .4s all ease-in-out;
` 

const Navbar = () => {
    const nowNav = useRecoilValue(navState);
    return (
    <Background 
        nowNav={nowNav}
        className="side_navbar">
        <WonTricks/>
        <Settings/>
    </Background>
)};

export default Navbar;