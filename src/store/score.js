import {
    atom
} from 'recoil';

export const teamScoresState = atom({
    key: 'teamScoresState',
    default: {team1: 0, team2: 0},
});