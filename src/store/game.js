import {
    atom, atomFamily, selector,
} from 'recoil';

export const userDeckState = atom({
    key: 'userDeckState',
    default: [{number:1,suit:'club'},
    {number:2,suit:'club'},
    {number:3,suit:'club'},
    {number:4,suit:'club'},
    {number:5,suit:'club'},
    {number:6,suit:'club'},
    {number:7,suit:'club'},
    {number:8,suit:'spades'},
    {number:9,suit:'spades'},
    {number:10,suit:'spades'},
    {number:11,suit:'spades'},
    {number:12,suit:'spades'},
    {number:13,suit:'spades'},
],
});

export const otherPlayerDeckFamily = atomFamily({
    key: 'otherPlayerDeckState',
    default: [1,2,3,4,5,6,7,8,9,10,11,12,13],
});

export const badDeck = selector({
    key: 'backDeck',
    default: '',
});