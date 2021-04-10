import React from "react";
import styled from 'styled-components';

const StyledRadio = styled.span`
    vertical-align: middle;
    display: inline-block;
    cursor: pointer;
    position: relative;
    display: inline-block;
    border-radius: 100%;
    background-color: #fff;
    border: ${(props) => (props.border?'1px solid #dcdcdc;':'none')};
    width: ${(props) => (`${props.size}px`)};
    height: ${(props) => (`${props.size}px`)};
    margin-right: ${(props) => (`${props.marginRight}px`)};

    &::after {
        content: "";
        display: block;
        width: 70%;
        height: 70%;
        border-radius: 70%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

const Radio = ({size, marginRight, border, className}) => {
    return (
        <StyledRadio
            border={border}
            size={size} 
            marginRight={marginRight}
            className={className}
        ></StyledRadio>
    )
}

export default Radio;