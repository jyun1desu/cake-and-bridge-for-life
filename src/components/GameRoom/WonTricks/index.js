import React from 'react';
import { color } from 'style/theme';
import SideInfo from 'components/GameRoom/SideInfo';
import Icon from './Icon';

const WonTricks = () => (
        <SideInfo 
            title="你贏的墩們"
            type="won tricks"
            height="60vw"
            color={color.$orange_color}
            renderIcon={<Icon/>}
            className="won_tricks">
        </SideInfo>
    )

export default WonTricks