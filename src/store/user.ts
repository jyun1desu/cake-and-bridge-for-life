import {
    atom, selector,
} from 'recoil';

import { playersData } from './players';
import { TeamTypes } from 'types/player';

export const userNameState = atom({
    key: 'userNameState',
    default: '' as string,
});

export const userIDState = atom({
    key: 'userIDState',
    default: '' as string,
});

export const userRoomState = atom({
    key: 'userRoomState',
    default: '' as string,
});

export const userIndexState = selector({
    key: 'userIndexState',
    get: ({get}) => {
        const userName = get(userNameState);
        const playerList = get(playersData);
        return playerList.findIndex(data=>data.name===userName) as number;
    }
})

export const userTeamState = selector({
    key: 'userTeamState',
    get:  ({get}) => {
        const userName = get(userNameState);
        const playerList = get(playersData);
        if(!playerList.length) return null
        return playerList.find(data=>data.name===userName)?.team as TeamTypes | null;
    }
})

export const navState = atom({
    key: 'navState',
    default: null as string | null,
})