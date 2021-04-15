import React, { useState } from 'react';
import styled from 'styled-components';
import { color } from 'style/theme';
import classnames from 'classnames';
import { themeState  } from 'store/theme';
import { useRecoilState } from 'recoil';


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

    &.on_page {
		position: absolute;
		top: 20px;
		right: 20px;
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

const ThemeToggler = ({className}) => {
    const [theme, toggleTheme] = useRecoilState(themeState);

    const setTheme = (theme) => {
        toggleTheme(theme);
        localStorage.setItem('bridge-theme',JSON.stringify(theme));
    }

    const handleToggleTheme = () => {
        if(theme === 'strawberry') {
            setTheme('canele');
        } else {
            setTheme('strawberry');
        }
    };

    return (
        <Toggler 
            onClick={handleToggleTheme}
            className={classnames("theme_toggler", className,{
                'light_mode': theme==='strawberry',
                'dark_mode': theme==='canele',
            })}>
            <button 
                className="toggle_button" />
        </Toggler>
    )
}

export default ThemeToggler;