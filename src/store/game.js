import {
    atom, selector,
} from 'recoil';

export const userDeckState = atom({
    key: 'userDeckState',
    default: '',
});

export const badDeck = selector({
    key: 'userDeckState',
    default: '',
});