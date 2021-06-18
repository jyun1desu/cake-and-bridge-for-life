import React from 'react';
import styled from 'styled-components';
import { color } from 'style/theme';

const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 3px;
    padding: 8px;
    filter: drop-shadow(0px 0px 2px rgb(170, 170, 170));
    z-index: 1;
    &::after {
        content: "";
        position: absolute;
        display: block;
        background-color: #fff;
        width: 6px;
        height: 6px;
        transform-origin: top right;
        transform: rotate(45deg);
        top: 100%;
    }
    &.on_table {
        position: absolute;
        transform: translate(-50%, -150%);
        left: 50%;
        top: 0;
    }
    &.on_bind_list {
        position: absolute;
        transform: translate(-50%);
        left: 50%;
        bottom: 99%;
        z-index: 500;
    }

    .dots {
        display: flex;

        .dot {
            height: 4px;
            width: 4px;
            border-radius: 50%;
            background-color: ${color.$black_suit_color};

            animation: animateDot 2s cubic-bezier(0.69, 0.76, 0.58, 1);
            animation-iteration-count: infinite;

            &:nth-child(1) {
                animation-delay: 0s;
            }

            &:nth-child(2) {
                margin: 0 4px;
                animation-delay: 0.3s;
            }

            &:nth-child(3) {
                animation-delay: 0.3s;
            }
        }
    }

    @keyframes animateDot {
        0% {
            transform: translate3d(0);
        }

        25% {
            transform: translate3d(0, -1.5px, 0);
        }

        50% {
            transform: translate3d(0, 0.5px, 0);
        }

        65%,
        100% {
            transform: translate3d(0, 0, 0);
        }
    }
`

const ThinkingIcon = ({className}) => (
    <Icon className={`thinking ${className}`}>
        <div className="dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    </Icon>
);

export default ThinkingIcon