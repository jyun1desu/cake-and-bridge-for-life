import React from 'react';
import styled from 'styled-components';
import { color } from "style/theme";

interface InputProperty  {
    className: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength: number;
    onFocus?: () => void;
    placeholder?: string;
}
const Input = (props: InputProperty) => {
    const {
        className,
        value,
        placeholder,
        onChange = () => {},
        onFocus = () => {},
        maxLength = 10
    } = props;

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
    font-size: 13px;
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