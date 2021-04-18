import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from "recoil";
import { themeState } from 'store/theme';
import { color } from "style/theme";
import LogoSVG from 'assets/logo.svg';

const themeData = {
    light: { 
		bg: 'white',
        fg: color.$title_font_color,
	},
    dark: { 
		bg: color.$dark_dim_bg_color,
        fg: color.$fluorescent_pink_color,
	},
}

const StyledLogo = styled.div`
    margin: 30px auto 0;
    border-radius: 100%;
    text-align: center;
    width: 70vw;
    height: 70vw;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: .5s all;
    background-color: ${({theme}) => themeData[theme].bg };

    .image {
        width: 60%;
        margin-bottom: 20px;
    }

    .name {
        font-size: 18px;
        letter-spacing: 2px;
        line-height: 28px;
        color:  ${({theme}) => themeData[theme].fg };
    }
`

const Logo = ({className}) => {
    const [theme] = useRecoilState(themeState);
    return (
        <StyledLogo 
            theme={theme}
            className={className}>
                <img className="image" src={LogoSVG} alt="logo" />
                <p className="name">
                    Cake-Bridge
                    <br/>
                    for-Life
                </p>
        </StyledLogo>
    );
}

export default Logo;