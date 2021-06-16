import {
    atom, selector,
} from 'recoil';

import { playersData } from './players';

export const userNameState = atom({
    key: 'userNameState',
    default: '',
});

export const userIDState = atom({
    key: 'userIDState',
    default: '',
});

export const userIndexState = selector({
    key: 'userIndexState',
    get:  ({get}) => {
        const userName = get(userNameState);
        const playerList = get(playersData);
        return playerList.findIndex(data=>data.player===userName)
    }
})

export const userTeamState = selector({
    key: 'userTeamState',
    get:  ({get}) => {
        const userName = get(userNameState);
        const playerList = get(playersData);
        if(!playerList.length) return null
        return playerList.find(data=>data.player===userName)?.team;
    }
})

export const userRoomState = atom({
    key: 'userRoomState',
    default: null
});

export const userReadyState = selector({
    key: 'userReadyState',
    get:  ({get}) => {
        const userName = get(userNameState);
        const playerList = get(playersData);
        if(!playerList.length) return null
        return playerList.find(data=>data.player===userName).ready;
    }
})

export const navState = atom({
    key: 'navState',
    default: null,
})