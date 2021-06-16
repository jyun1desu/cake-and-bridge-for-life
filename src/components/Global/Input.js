import React from 'react';
import styled from 'styled-components';
import { color } from "style/theme";

const Input = ({ 
    className, 
    placeholder = '', 
    onChange = () => {}, 
    onFocus = () => {},
    value, 
    maxLength = '10',
}) => {
    return (
        <input
            className={className}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={onFocus}
            value={value}
            type="text" />
    )
}

const styledInput = styled(Input)`
    user-select: auto;
    width: 50%;
    display: block;
    text-align: center;
    color: ${color.$title_font_color};
    background-color: transparent;
    border: none;
    border-radius: 0;

    &:active,
    &:focus {
        outline: none;
    }
`

export default styledInput;