import React from 'react';
import styled from 'styled-components';
import { color } from 'style/theme';
import Button from 'components/Global/Button';
import ThemeToggler from 'components/Global/ThemeToggler';

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 2px;
    padding: 8px 0;
    border-bottom: 1px solid ${color.$under_line_color};

    & > span {
        font-size: 13px;
        margin-left: 5px;
        margin-right: 10px;
    }
`

const LeaveButton = styled(Button)`
    padding: 5px 8px;
`


const Content = () =>  {
    return (
    <>
    <Item>
        <span>更換主題</span>
        <ThemeToggler />
    </Item>
    <Item>
        <span>離開遊戲</span>
        <LeaveButton color={color.$main_orange}>EXIT</LeaveButton>
    </Item>
    <Item>
        <span>意見投書</span>
        <LeaveButton color={color.$green_color}>GO</LeaveButton>
    </Item>
    </>
    )
}

export default Content;