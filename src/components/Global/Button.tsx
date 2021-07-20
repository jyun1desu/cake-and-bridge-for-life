import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { Theme } from 'types/theme';
import { themeState  } from 'store/theme';

const getButtonStyle = (theme: string, color: string) => {
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

interface ButtonProperty {
    className?: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    children: React.ReactNode;
    color: string;
    type?: 'submit' | 'button';
}

interface StyledButtonProperty extends ButtonProperty {
    themeType: Theme; 
}

const StyledButton = styled.button<StyledButtonProperty>`
    cursor: pointer;
    border-radius: 50px;
    padding: 10px 20px;
    letter-spacing: 1px;
    text-align: center;
    transition: 0.3s all;
    font-size: 13px;
    ${({themeType, color}) => getButtonStyle(themeType, color)}

    &.enter_button {
        min-width: 50%;
        font-size: 18px;
        letter-spacing: 3px;
    }
`

const Button = (props: ButtonProperty ) => {
    const [theme] = useRecoilState(themeState);
    const { 
        className, 
        children, 
        onClick = () => {},
        color,
        type = 'button',
    } = props

    return (
    <StyledButton
        type={type}
        themeType={theme}
        color={color}
        className={className}
        onClick={onClick}
    >
        {children}
    </StyledButton>
    )
}

export default Button;