import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { color } from 'style/theme';
import SideInfo from 'components/GameRoom/SideInfo';
import Content from './Content';

const Icon = styled.div`
    position: relative;
    margin-left: 8px;

    .cross {
        display: block;
        width: 13px;
        border-top: 1px solid #fff;
        position: absolute;
        transition: 0.4s all;
        transform-origin: center;

        &.vertical {
            transform: rotate(90deg);
        }
    }

    &.isOpen {
        .cross {
                &.vertical {
                    transform: rotate(45deg);
                }

                &.horizental {
                    transform: rotate(-45deg);
                }
            }
    }
`

const PlusIcon = ({isOpen}) => (
    <Icon className={classnames("plus_icon",{"isOpen": isOpen})}>
        <span className="cross vertical"></span>
        <span className="cross horizental"></span>
    </Icon>
)

const WonTricks = () => {
    return (
        <SideInfo 
            title="設定"
            type="settings"
            height="40vw"
            color={color.$green_color}
            renderIcon={<PlusIcon/>}
            content={<Content/>}
            className="settings">
        </SideInfo>
    )
}

export default WonTricks