import 'styled-components';
import { TeamTypes } from 'types/player';

export type Team = {
    [TeamTypes.TeamOne]: string
    [TeamTypes.TeamTwo]: string
}

declare module 'styled-components' {
    export interface DefaultTheme<T> {
        [key: string]: T;
    }
}