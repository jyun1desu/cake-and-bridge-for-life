import React from 'react';
import styled from 'styled-components';



const Icon = styled.span<ShareIconProperty>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: ${props=>props.backgroundColor};

    .outer {
        display: flex;
        justify-content: center;
        width: 14px;
        height: 7px;
        box-sizing: border-box;
        border-radius: 7px;
        border: 1px solid ${props=>props.iconColor};
        position: relative;

        &::before {
            content: '';
            display: block;
            height: calc(100% + 4px);
            width: 3px;
            background-color: ${props=>props.backgroundColor};
            position: absolute;
            top: -2px;
            left: 50%;
            transform: translateX(-50%);
        }

        .inner {
            width: 6px;
            height: 1px;
            margin: auto;
            background-color: ${props=>props.iconColor};
            z-index: 2;
        }
    }

`

interface ShareIconProperty {
    backgroundColor?: string;
    iconColor?: string;
}

const ShareIcon = (props: ShareIconProperty) => {
    const { backgroundColor = 'white', iconColor = 'black' } = props;
    return (
        <Icon
            backgroundColor={backgroundColor}
            iconColor={iconColor}
        >
            <span className="outer">
                <span className="inner" />
            </span>
        </Icon>
    )
};

export default ShareIcon;
