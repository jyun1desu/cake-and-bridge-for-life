import {
    atom,
} from 'recoil';

export const userNameState = atom({
    key: 'userNameState',
    default: '',
})

export const userRoomState = atom({
    key: 'userRoomState',
    default: null
})