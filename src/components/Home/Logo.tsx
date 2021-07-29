import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from "recoil";
import { themeState } from 'store/theme';
import { color } from "style/theme";
import LogoSVG from 'assets/logo.svg';
import NameLightIcon from 'assets/name-light.svg';
import NameDarkIcon from 'assets/name-dark.svg';
import { ThemeTypes } from 'types/theme';

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
    width: 240px;
    height: 240px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: .3s all;
    background-color: ${({theme}) => theme.bg };

    .image {
        width: 65%;
        margin-bottom: 20px;
    }

    .name {
        width: 70%;
    }
`

interface LogoProperty {
    className: string;
}

const Logo = (props: LogoProperty) => {
    const { className } = props;
    const [theme] = useRecoilState(themeState);
    const nameIcon = theme === ThemeTypes.Light ? NameLightIcon :  NameDarkIcon;
    return (
        <StyledLogo 
            theme={themeData[theme]}
            className={className}>
                <img className="image" src={LogoSVG} alt="logo" />
                <img className="name" src={nameIcon} alt="logo" />
        </StyledLogo>
    );
}

export default Logo;