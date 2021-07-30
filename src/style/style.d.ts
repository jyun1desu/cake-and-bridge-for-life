import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme<T> {
        [key: string]: T;
    }
}