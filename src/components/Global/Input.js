import React from 'react';
import styled from 'styled-components';

const Input = ({ className, placeholder, onChange = () => { }, value, maxLength = '10' }) => {
    return (
        <input
            className={className}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            type="text" />
    )
}

const styledInput = styled(Input)`
    user-select: auto;
    width: 50%;
    display: block;
    text-align: center;
    color: green;
    background-color: transparent;
    border: none;
    border-radius: 0;

    &:active,
    &:focus {
        outline: none;
    }

    &.input_name_space{
        margin: 0 0 20px 0;
        border-bottom: 2px solid green;
        padding: 5px;
        font-size: 22px;
        line-height: 25px;
        letter-spacing: 2px;
    }
`

export default styledInput;