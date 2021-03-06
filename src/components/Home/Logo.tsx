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
    width: 270px;
    height: 270px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: .3s all;
    background-color: ${({theme}) => theme.bg };

    .image {
        width: 60%;
        margin-bottom: 20px;
    }

    .name {
        font-size: 18px;
        letter-spacing: 2px;
        line-height: 28px;
        color:  ${({theme}) => theme.fg };
    }
`

interface LogoProperty {
    className: string;
}

const Logo = (props: LogoProperty) => {
    const { className } = props;
    const [theme] = useRecoilState(themeState);
    return (
        <StyledLogo 
            theme={themeData[theme]}
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