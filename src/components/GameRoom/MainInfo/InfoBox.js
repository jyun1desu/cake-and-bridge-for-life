import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames'
import { color } from 'style/theme';

const Box = styled.div`
    display: flex;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;

    .title {
        flex-grow: 0;
        background-color: ${color.$orange_color};
        text-align: center;
        padding: 5px 10px;
        color: white;
        font-size: 14px;
        letter-spacing: 2px;
        writing-mode: vertical-lr;
    }

    .content {
        flex-grow: 1;
        padding: 8px 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

const InfoBox = ({ title, children, className }) => (
    <Box className={classnames("info_box",className)}>
        <span className="title">{ title }</span>
        <span className="content">{children}</span>
    </Box>
)

export default InfoBox;