import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames'
import { color } from 'style/theme';
import { ThemeTypes } from 'types/theme';

const Box = styled.div`
    display: flex;
    border-radius: 5px;
    overflow: hidden;
    transition: .3s all;
    border: ${({ theme }) => theme.border}; 

    .title {
        flex-grow: 0;
        text-align: center;
        padding: 5px 10px;
        color: white;
        font-size: 14px;
        letter-spacing: 2px;
        writing-mode: vertical-lr;
        transition: .3s all;
        color: ${({ theme }) => theme.fc};
        border-right: ${({ theme }) => theme.border};
        background-color: ${({ theme }) => theme.title_bg};
    }

    .content {
        flex-grow: 1;
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: .3s all;
        background-color: ${({ theme }) => theme.bg};
    }
`

const themeData = {
    light: {
        bg: 'white',
        fc: 'white',
        title_bg: color.$orange_color,
        border: '1px solid transparent',
    },
    dark: {
        bg: color.$dark_dim_bg_color,
        fc: color.$light_pink_color,
        title_bg: color.$dark_dim_bg_color,
        border: '1px solid' + color.$dark_dim_border_color,
    },
}

interface InfoBoxProperty {
    theme: ThemeTypes;
    title: string;
    children: React.ReactNode;
    className: string;
}

const InfoBox = (props: InfoBoxProperty) => {
    const { theme, title, children, className } = props;
    return(
    <Box theme={themeData[theme]} className={classnames("info_box", className)}>
        <span className="title">{title}</span>
        <span className="content">{children}</span>
    </Box>
)}

export default InfoBox;