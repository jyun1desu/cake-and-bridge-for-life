import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { themeState } from 'store/theme';
import { color } from 'style/theme';

const StyledCardIcon = styled.div`
    display: flex;

    .card {
        display: block;
        width: 9px;
        height: 13px;
        border-radius: 2px;
        transition: 0.4s all;
        border: 1px solid ${({ theme }) => themeData[theme].line};
        background-color: ${({ theme }) => themeData[theme].bg};

        &:nth-child(1) {
            transform: translate(8px, 0px);
            z-index: 12;
        }
    }

    &.isOpen {
        .card{
            &:nth-child(1) {
                    transform: rotate(-15deg) translate(7px, 1px);
            }

            &:nth-child(2) {
                transform: rotate(8deg) translate(1px, -2px);
            }
        }
    }
`

const themeData = {
    light: { 
        bg: color.$orange_color,
        line: 'white',
    },
    dark: { 
        bg: color.$dark_bg_color,
        line: color.$dark_border_color
    },
}

const CardIcon = ({isOpen}) => {
    const [theme] = useRecoilState(themeState);
    return (
    <StyledCardIcon 
        theme={theme}
        className={classnames("card_icon",{"isOpen": isOpen})}>
        <span className="card"></span>
        <span className="card"></span>
    </StyledCardIcon>
)}

export default CardIcon;