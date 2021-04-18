import {
    atom
} from 'recoil';

export const themeState = atom({
    key: 'themeState',
    default: JSON.parse(localStorage.getItem('cake-and-bridge-theme'))|| 'light',
});