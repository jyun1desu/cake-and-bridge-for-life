import {
    atom
} from 'recoil';
import { Theme, ThemeTypes } from 'types/theme';

const defaultTheme = () => {
    const existingChosenTheme = JSON.parse(localStorage.getItem('cake-and-bridge-theme') || '{}');
    if(typeof existingChosenTheme !== 'string') {
        return ThemeTypes.Light;
    }   
    return existingChosenTheme;
}

export const themeState = atom({
    key: 'themeState',
    default: defaultTheme() as Theme,
});