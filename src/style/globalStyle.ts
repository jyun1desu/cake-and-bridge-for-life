import { createGlobalStyle } from "styled-components";
import { color } from "style/theme";

export const GlobalStyle = createGlobalStyle`
    * {
    font-family: 'Kosugi Maru', sans-serif;
    user-select: none;
    }
    
    body,
    html {
    font-weight: 400;
    background-color: ${color.$theme_background};
    box-sizing: border-box;
    overflow: hidden;
    overflow-x: hidden;
    height: 100%;
    width: 100%;
    transform: translate3d(0, 0, 0);
    padding: 0;
    margin: auto;
    color: ${color.$default_font_color};
    }

    #root {
    height: 100%;
    overflow: hidden;

        & > div {
            padding: 5vw;
            height: 100%;
            box-sizing: border-box;
        }
    }

    div {
        padding: 0;
        margin: 0;
    }

    button {
        border: none;
        margin: 0;
        padding: 0;
        
        &:active,
        &:focus {
            outline: none;
        }
    }

    p {
        margin: 0;
    }
`;