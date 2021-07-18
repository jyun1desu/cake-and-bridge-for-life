import React from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from 'store/theme';
import { color } from 'style/theme';
import SideInfo from 'components/GameRoom/SideInfo';
import Icon from './Icon';
import Content from './Content';
import { NavigatorTypes } from 'types/navigator';

const themeData = {
    light: { 
        button_bg: color.$orange_color,
        border: 'transparent'
    },
    dark: { 
        button_bg: color.$dark_dim_bg_color,
        border: color.$dark_border_color,
    },
}

interface WonTricksProperty {
    active: boolean;
}

const WonTricks = (props: WonTricksProperty) => {
    const { active } = props;
    const [theme] = useRecoilState(themeState);
    return(
        <SideInfo 
            title="你贏的墩們"
            type={NavigatorTypes.WonTricks}
            height="70vw"
            border={themeData[theme].border}
            color={themeData[theme].button_bg}
            renderIcon={<Icon isOpen={active}/>}
            content={<Content/>}
            className="won_tricks"
        />
    )}

export default WonTricks