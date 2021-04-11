import React, { useState } from 'react';
import styled from 'styled-components';
import { color } from 'style/theme';
import classNames from 'classnames';

const Toggler = styled.div`
    display: flex;
    align-items: center;
    width: 40px;
    height: 17px;
    padding: 2px;
    border-radius: 40px;
    transition: .3s all;

    .toggle_button {
        background-color: white;
        width: 17px;
        height: 17px;
        border-radius: 100%;
        transition: .3s all;
    }

    &.light_mode {
        background-color: ${color.$pink_color};
        justify-content: flex-start;
        .toggle_button {
            margin-left: 0;
        }
    }

    &.dark_mode {
        background-color: ${color.$brown_color};
        .toggle_button {
            margin-left: calc( 40px - 17px);
        }
    }
`

const ThemeToggler = () => {
    const [theme, toggleTheme] = useState('light');

    const handleToggleTheme = () => {
        if(theme === 'light') {
            toggleTheme('dark');
        } else {
            toggleTheme('light');
        }
    };

    return (
        <Toggler 
            className={classNames("theme_toggler",{
                'light_mode': theme==='light',
                'dark_mode': theme==='dark',
            })}>
            <button 
                onClick={handleToggleTheme}
                className="toggle_button" />
        </Toggler>
    )
}

export default ThemeToggler;