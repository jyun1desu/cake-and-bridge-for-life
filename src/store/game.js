import {
    atom, selector,
} from 'recoil';
import { userNameState } from './user';

export const nowPlayerName = atom({
    key: 'nowPlayerName',
    default: '',
});

export const isUserTurnState = selector({
    key: 'isUserTurnState',
    get: ({get}) => {
        const nowPlayer = get(nowPlayerName);
        const userName = get(userNameState);
        return userName === nowPlayer;
    }
})

export const playersCalledListState = atom({
    key: 'playersCalledListState',
    default: {},
});

export const trumpState = atom({
    key: 'trumpState',
    default: null,
});

export const thisRoundSuit = atom({
    key: 'trumpState',
    default: '',
});

export const thisRoundCards = atom({
    key: 'trumpState',
    default: '',
});
