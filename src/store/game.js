import {
    atom, selector,
} from 'recoil';
import { userNameState } from './user';
import { teamShouldWinState } from './bind';
import { teamScoresState } from './score';


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

export const isUserLastPlayerState = selector({
    key: 'isUserLastPlayerState',
    get: ({get}) => {
        const thisRoundCards = get(thisRoundCardsState);
        if(thisRoundCards.filter(card => typeof card === 'object').length === 3) {
            return true
        } else {
            return false
        }
    }
});

export const isThisRoundEndState = selector({
    key: 'isThisRoundEndState',
    get: ({get}) => {
        const thisRoundCards = get(thisRoundCardsState);
        if(thisRoundCards.filter(card => typeof card === 'object').length === 4) {
            return true
        } else {
            return false
        }
    }
})

export const trumpState = atom({
    key: 'trumpState',
    default: null,
})

export const isGameEndState = selector({
    key: 'isGameEndState',
    get: ({ get }) => {
        const { team1: team1ShouldWin, team2: team2ShouldWin } = get(teamShouldWinState);
        const { team1: team1Score, team2: team2Score } = get(teamScoresState);

        if(team1ShouldWin === team1Score){
            return 'team1'
        } else if (team2ShouldWin === team2Score) {
            return 'team2'
        } else {
            return null;
        }
    }
})
