import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ThemeTypes } from 'types/theme';
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

interface StyledButtonProperty extends ButtonProperty {
    themeType: ThemeTypes;
}

const StyledButton = styled.button<StyledButtonProperty>`
    cursor: pointer;
    border-radius: 50px;
    padding: 10px 20px;
    margin: 0;
    letter-spacing: 1px;
    text-align: center;
    transition: 0.3s all;
    font-size: 13px;
    ${({themeType, color}) => getButtonStyle(themeType, color)}

    &.small {
        padding: 5px 8px;
    }
`

interface ButtonProperty {
    className?: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    children: React.ReactNode;
    color: string;
    type?: 'submit' | 'button';
    size?: 'normal' | 'small';
}

const Button = (props: ButtonProperty ) => {
    const [theme] = useRecoilState(themeState);
    const { 
        className, 
        children, 
        onClick = () => {},
        color,
        type = 'button',
        size = 'normal'
    } = props

    return (
    <StyledButton
        type={type}
        themeType={theme}
        color={color}
        className={classnames(className, size)}
        onClick={onClick}
    >
        {children}
    </StyledButton>
    )
}

export default Button;