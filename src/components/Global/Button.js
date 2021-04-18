import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { themeState  } from 'store/theme';

const getButtonStyle = ({theme, color}) => {
    switch(theme){
        case 'light':
        default:
            return `
                background-color: ${color};
                color: white;
            `
        case 'dark':
            return `
                background-color: transparent;
                color: ${color};
                border: 1px solid ${color};
            `
    }
}

const StyledButton = styled.button`
    cursor: pointer;
    border-radius: 50px;
    padding: 10px 20px;
    letter-spacing: 1px;
    text-align: center;
    transition: 0.3s all;
    ${({theme, color}) => getButtonStyle({theme, color})}

    &.enter_button {
        min-width: 50%;
        font-size: 18px;
        letter-spacing: 3px;
    }
`

const Button = ({ 
    className, 
    children, 
    onClick=()=>{},
    type='submit', 
    color,
    }) => {
    const [theme] = useRecoilState(themeState);
    return (
    <StyledButton
        theme={theme}
        color={color}
        className={className}
        onClick={onClick}
        type={type}>
        {children}
    </StyledButton>
    )
}

export default Button;