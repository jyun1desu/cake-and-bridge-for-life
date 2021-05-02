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

export const thisRoundSuit = atom({
    key: 'thisRoundSuit',
    default: '',
});

export const thisRoundCards = atom({
    key: 'thisRoundCards',
    default: '',
});

export const trumpState = atom({
    key: 'trumpState',
    default: null,
})
