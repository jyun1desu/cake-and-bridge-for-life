import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
    * {
    font-family: 'Kosugi Maru', sans-serif;
    user-select: none;
    }
    body,
    html {
    font-weight: 400;
    background-color: #F1EFE4;
    box-sizing: border-box;
    overflow: hidden;
    overflow-x: hidden;
    height: 100%;
    width: 100%;
    transform: translate3d(0, 0, 0);
    padding: 0;
    margin: 0;
    }

    #root {
    height: 100%;
    overflow: hidden;
    }
`;