import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { themeState } from 'store/theme';
import { modalState } from 'store/modal';
import { navState } from 'store/user';
import { color } from 'style/theme';
import Button from 'components/Global/Button';
import ThemeToggler from 'components/Global/ThemeToggler';

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 2px;
    padding: 6px 0;
    
    &:not(:last-child) {
        transition: 0.5s border-bottom; 
        border-bottom: 1px solid ${({ theme }) => themeData[theme].b_bottom};
    }

    & > span {
        font-size: 13px;
        margin-left: 5px;
        margin-right: 10px;
    }
`

const SettingButton = styled(Button)`
    padding: 5px 8px;
`

const themeData = {
    light: { 
        b_bottom: color.$under_line_color,
        exit_button: color.$orange_color,
        mail_button: color.$green_color,
    },
    dark: { 
        b_bottom: color.$dark_dim_border_color,
        exit_button: color.$fluorescent_orange_color,
        mail_button: color.$fluorescent_green_color,
    },
}

const Content = () => {
    const [theme] = useRecoilState(themeState);
    const setModalType = useSetRecoilState(modalState);
    const setNowNav = useSetRecoilState(navState);
    return (
    <>
        <Item theme={theme}>
            <span>更換主題</span>
            <ThemeToggler />
        </Item>
        {/* <Item theme={theme}>
            <span>意見投書</span>
            <SettingButton 
                color={themeData[theme].mail_button}
            >GO</SettingButton>
        </Item> */}
        <Item theme={theme}>
            <span>離開遊戲</span>
            <SettingButton 
                onClick={()=>{
                    setNowNav(null);
                    setModalType('cofirm-leave')
                }}
                color={themeData[theme].exit_button}
            >EXIT</SettingButton>
        </Item>
    </>
)}

export default Content;