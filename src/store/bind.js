import {
    atom, selector
} from 'recoil';

import { playersData } from './players';

export const userPickBindState = atom({
    key: 'userPickBind',
    default: null,
});

export const nowBindState = atom({
    key: 'nowBindState',
    default: { player: null, number:0, suit:'club' },
});

export const availibleTricksState = selector({
    key: 'availibleTricksState',
    get: ({get}) => {
        const { number, suit} = get(nowBindState);
        const tricks = [1, 2, 3, 4, 5, 6]
        let min;
        if(suit === 'spades') {
            min =  number + 1;
        } else {
            min =  number;
        }
        const tricksArray = tricks.filter(trick => trick >= min)
        return tricksArray;
    }},
);

export const userPassState = atom({
    key: 'userPassState',
    default: false,
});

export const teamShouldWinState = selector({
    key: 'teamShouldWinState',
    get: ({get}) => {
        const {player: calledPlayer, number} = get(nowBindState);
        if(!number || number === 1 ){
            return {
                team1: 7,
                team2: 7,
            }
        }
        const players = get(playersData);
        const calledTeam = 'team' + players.find(p => p.player === calledPlayer).team;
        const anotherTeam = ['team1','team2'].filter(team=> team !== calledTeam);
        const calledTeamShouldWin = 6 + number;
        const anotherTeamShouldWin = 14 - calledTeamShouldWin;
        return {
            [calledTeam]: calledTeamShouldWin,
            [anotherTeam]: anotherTeamShouldWin
        }
    }},
);