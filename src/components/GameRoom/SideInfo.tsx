import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { useRecoilState } from 'recoil';
import { themeState } from 'store/theme';
import { navState } from 'store/user';
import { color } from "style/theme";

interface TogglerProperty  {
    border: string;
}

const Toggler = styled.button<TogglerProperty>`
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        width: 17vw;
        height: 17vw;
        padding: 0;
        border-radius: 50%;
        transition: 0.4s all;
        border: 1px solid ${({ border }) => border};
        background-color: ${({ color }) => color};
`

interface SideNavProperty  {
    height: string;
}

const SideNav = styled.div<SideNavProperty>`
    display: flex;
    position: absolute;
    left: 100%;
    height: ${({ height }) => height};
    transition: .3s all ease-in-out;

    &.won_tricks {
        bottom: 7vw;
        width: 62vw;
    }

    &.settings {
        bottom: 15vw;
        width: 55vw;
    }

    &.isOpen {
        transform: translateX(-100%);
    }

    &.hide {
        transform: translateX(50%);
    }

    .content_box {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 8px 0;
        margin-top: -15px;
        border-bottom-left-radius: 6px;
        border-top-left-radius: 6px;
        overflow-y: scroll;
        transition:  0.3s all;
        color: ${({ theme }) => theme.fg};
        border: 1px solid ${({ theme }) => theme.border};
        border-right: none;
        background-color: ${({ theme }) => theme.bg};
        .scroll_box{
            width: 100%;
            height: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            overflow-y: scroll;
        }

        .title {
            text-align: center;
            font-size: 14px;
            letter-spacing: 1px;
            padding-bottom: 5px;
            margin-bottom: 5px;
            border-bottom: 1px solid ${({ color, theme }) => {
        if (theme === 'light') {
            return color
        } else {
            return theme.border
        };
    }
    }
        }
    }
`

const themeData = {
    light: {
        bg: 'white',
        fg: color.$default_font_color,
        border: 'transparent',
    },
    dark: {
        bg: color.$dark_dim_bg_color,
        fg: 'white',
        border: color.$dark_border_color,
    },
}

interface SideInfoProperty  {
    title: string;
    type: string | null;
    renderIcon: React.ReactNode;
    content: React.ReactNode;
    className: string;
    color: string;
    height: string;
    border: string;
}

const SideInfo = (props: SideInfoProperty) => {
    const { title, type, renderIcon, content, className, color, height, border } = props;
    const [nowNav, setNowNav] = useRecoilState(navState);
    const [theme] = useRecoilState(themeState);

    const handleToggle = () => {
        if (type === nowNav) {
            setNowNav(null);
        } else {
            setNowNav(type);
        }
    }

    return (
        <SideNav
            theme={themeData[theme]}
            height={height}
            color={color}
            className={classnames(
                "side_nav",
                className,
                {
                    "isOpen": type === nowNav,
                    "hide": nowNav && type !== nowNav
                })}>
            <Toggler
                border={border}
                onClick={handleToggle}
                color={color}
                className="toggler">
                {renderIcon}
            </Toggler>
            <div className="content_box">
                <div className="scroll_box">
                    <p className="title">{title}</p>
                    {content}
                </div>
            </div>
        </SideNav>
    )
}

export default SideInfo