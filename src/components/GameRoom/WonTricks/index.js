import React from 'react';
import { color } from 'style/theme';
import SideInfo from 'components/GameRoom/SideInfo';
import Icon from './Icon';
import Content from './Content';

const WonTricks = () => (
        <SideInfo 
            title="你贏的墩們"
            type="won tricks"
            height="70vw"
            color={color.$orange_color}
            renderIcon={<Icon/>}
            content={<Content/>}
            className="won_tricks">
        </SideInfo>
    )

export default WonTricks