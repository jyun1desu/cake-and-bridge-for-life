import {
    atom, selector,
} from 'recoil';

import { Card, OtherPlayerDeck } from 'types/card';

export const userDeckState = atom({
    key: 'userDeckState',
    default: [] as Card[],
});



export const otherPlayerDeckState = atom({
    key: 'otherPlayerDeckState',
    default: {} as OtherPlayerDeck,
});

export const badDeck = selector({
    key: 'backDeck',
    get: ({ get }) => {
        const userDeck = get(userDeckState);
        if (userDeck.length === 13) {
            const deckPoint = userDeck
                .map((card) => card.number)
                .reduce((a, b) => {
                    const point = b > 9 ? b - 9 : 0;
                    return a + point;
                }, 0);
            return deckPoint > 3 ? false : true;
        } else {
            return false;
        }
    }
});

export const responseToBadDeck = atom({
    key: 'responseToBadDeck',
    default: null as Boolean | null,
})

export const OKtoPlay = selector({
    key: 'OKtoPlay',
    get: ({ get }) => {
        const isBadLuck = get(badDeck);
        if(!isBadLuck) {
            return true;
        } else {
            const isOKtoPlayWithBadDeck = get(responseToBadDeck);
            if(isOKtoPlayWithBadDeck){
                return true
            } else {
                return false
            }
        }
    }
});