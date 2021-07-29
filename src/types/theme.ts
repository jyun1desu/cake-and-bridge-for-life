
export enum ThemeTypes {
	Light = 'light',
	Dark = 'dark',
}

export interface ThemeDataDetail {
    [key: string]: string;
}

export interface ThemeData {
    [ThemeTypes.Light]: ThemeDataDetail;
    [ThemeTypes.Dark]: ThemeDataDetail;
}