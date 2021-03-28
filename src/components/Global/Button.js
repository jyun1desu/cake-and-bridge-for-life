import React from 'react';
import styled from 'styled-components';

const Button = ({ className, children, onClick=()=>{},type='submit', color }) => {
    return (
        <button
        color={color}
        className={className}
        onClick={onClick}
        type={type}>
        {children}
    </button>
    )
}

const styledButton = styled(Button)`
    cursor: pointer;
    background-color: ${(props) => (props.color)};
    border: none;
    border-radius: 50px;
    padding: 10px 20px;
    color: #fff;
    text-align: center;

    &:active,
    &:focus {
        outline: none;
    }

    &.enter_button {
        min-width: 50%;
        font-size: 20px;
        letter-spacing: 3px;
    }
`

export default styledButton;