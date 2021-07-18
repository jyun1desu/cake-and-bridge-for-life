import {
    atom
} from 'recoil';

import { ScoreData } from 'types/score';

const defaultState: ScoreData = { team1: 0, team2: 0}

export const teamScoresState = atom({
    key: 'teamScoresState',
    default: defaultState
});