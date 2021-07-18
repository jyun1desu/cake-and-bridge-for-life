import { atom } from 'recoil';
import { Card } from 'types/card';

export const userWinTricksState = atom({
    key: 'userWinTricksState',
    default: [] as Card[][],
});
