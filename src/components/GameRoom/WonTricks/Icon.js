import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { color } from 'style/theme';

const StyledCardIcon = styled.div`
    display: flex;

    .card {
        display: block;
        width: 9px;
        height: 13px;
        border-radius: 2px;
        border: 1px solid #fff;
        background-color: ${color.$main_orange};
        transition: 0.4s all;

        &:nth-child(1) {
            transform: translate(8px, 0px);
            z-index: 12;
        }
    }

    &.isOpen {
        .card{
            &:nth-child(1) {
                    transform: rotate(-15deg) translate(7px, 1px);
            }

            &:nth-child(2) {
                transform: rotate(12deg) translate(2px, -2px);
            }
        }
    }
`

const CardIcon = ({isOpen}) => (
    <StyledCardIcon 
        className={classnames("card_icon",{"isOpen": isOpen})}>
        <span className="card"></span>
        <span className="card"></span>
    </StyledCardIcon>
)

export default CardIcon;