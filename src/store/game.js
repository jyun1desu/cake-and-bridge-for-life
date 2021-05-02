import {
    atom, selector,
} from 'recoil';
import { userNameState } from './user';

export const currentPlayerName = atom({
    key: 'currentPlayerName',
    default: '',
});

export const isUserTurnState = selector({
    key: 'isUserTurnState',
    get: ({get}) => {
        const nowPlayer = get(currentPlayerName);
        const userName = get(userNameState);
        return userName === nowPlayer;
    }
})

export const thisRoundSuitState = atom({
    key: 'thisRoundSuit',
    default: '',
});

export const thisRoundCardsState = atom({
    key: 'thisRoundCardsState',
    default: [],
});

export const trumpState = atom({
    key: 'trumpState',
    default: null,
})
