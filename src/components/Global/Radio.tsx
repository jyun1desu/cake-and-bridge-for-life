import React from "react";
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { themeState } from 'store/theme';
import { color } from 'style/theme';

const themeData = {
    light: {
        bg: 'white',
        border: '#dcdcdc',
    },
    dark: {
        bg: color.$dark_dim_bg_color,
        border: color.$dark_dim_border_color,
    },
}

const StyledRadio = styled.span<RadioProperty>`
    vertical-align: middle;
    display: inline-block;
    cursor: pointer;
    position: relative;
    display: inline-block;
    border-radius: 100%;
    width: ${(props) => (`${props.size}px`)};
    height: ${(props) => (`${props.size}px`)};
    margin-right: ${(props) => (`${props.marginRight}px`)};
    transition: 0.3s all;
    background-color: ${({ theme }) => theme.bg};
    border: ${({ border }) => border};

    &::after {
        content: "";
        display: block;
        width: 70%;
        height: 70%;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

interface RadioProperty {
    className?: string;
    size: number;
    marginRight: number;
    border: string;
}

const Radio = (props: RadioProperty) => {
    const { className, size, marginRight, border } = props;
    const [theme] = useRecoilState(themeState);
    return (
        <StyledRadio
            theme={themeData[theme]}
            border={border}
            size={size}
            marginRight={marginRight}
            className={className}
        ></StyledRadio>
    )
}

export default Radio;