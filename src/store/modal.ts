import {
    atom
} from 'recoil';

export const modalState = atom({
    key: 'modalState',
    default: null as string | null,
});