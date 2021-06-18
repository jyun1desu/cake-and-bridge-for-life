import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { themeState } from 'store/theme';
import { color } from 'style/theme';
import SideInfo from 'components/GameRoom/SideInfo';
import Content from './Content';


const Icon = styled.div`
    position: relative;
    margin-left: 8px;

    .cross {
        display: block;
        width: 13px;
        position: absolute;
        transition: 0.4s all, 0.3s border-top;
        transform-origin: center;
        border-top: 1px solid ${({ theme }) => themeData[theme].line};

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

const themeData = {
    light: { 
        button_bg: color.$green_color,
        line: 'white',
        border: 'transparent'
    },
    dark: { 
        button_bg: color.$dark_dim_bg_color,
        line: color.$dark_border_color,
        border: color.$dark_border_color,
    },
}

const PlusIcon = ({ isOpen }) => {
    const [theme] = useRecoilState(themeState);
    return(
    <Icon theme={theme} className={classnames("plus_icon",{"isOpen": isOpen})}>
        <span className="cross vertical"></span>
        <span className="cross horizental"></span>
    </Icon>
)}

const WonTricks = () => {
    const [theme] = useRecoilState(themeState);
    return (
        <SideInfo 
            title="設定"
            type="settings"
            height="40vw"
            border={themeData[theme].border}
            color={themeData[theme].button_bg}
            renderIcon={<PlusIcon/>}
            content={<Content/>}
            className="settings">
        </SideInfo>
    )
}

export default WonTricks