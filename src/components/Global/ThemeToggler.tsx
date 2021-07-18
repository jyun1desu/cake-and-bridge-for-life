import React from 'react';
import styled from 'styled-components';
import { color } from 'style/theme';
import classnames from 'classnames';
import { themeState } from 'store/theme';
import { Theme, ThemeTypes } from 'types/theme';
import { useRecoilState } from 'recoil';


const Toggler = styled.div`
    display: flex;
    align-items: center;
    width: 40px;
    height: 17px;
    padding: 2px;
    border-radius: 40px;
    transition: 0.3s all;
    cursor: pointer;

    .toggle_button {
        background-color: white;
        width: 17px;
        height: 17px;
        border-radius: 100%;
        transition: 0.3s all;
        cursor: pointer;
    }

    &.on_page {
		position: absolute;
		top: 20px;
		right: 20px;
	}

    &.light_mode {
        background-color: ${color.$pink_color};
        border: 1px solid transparent;
        justify-content: flex-start;
        .toggle_button {
            margin-left: 0;
        }
    }

    &.dark_mode {
        background-color: ${color.$dark_dim_bg_color};
        border: 1px solid ${color.$dark_border_color};
        .toggle_button {
            margin-left: calc( 40px - 17px);
        }
    }
`
interface ThemeTogglerProperty {
    className?: string;
}

const ThemeToggler = (props: ThemeTogglerProperty) => {
    const { className } = props;
    const [theme, toggleTheme] = useRecoilState(themeState);

    const setTheme = (theme: Theme) => {
        toggleTheme(theme);
        localStorage.setItem('cake-and-bridge-theme', JSON.stringify(theme));
    }

    const handleToggleTheme = () => {
        theme === ThemeTypes.Light
            ? setTheme(ThemeTypes.Dark)
            : setTheme(ThemeTypes.Light);
    };

    return (
        <Toggler
            onClick={handleToggleTheme}
            className={classnames("theme_toggler", className, {
                'light_mode': theme === ThemeTypes.Light,
                'dark_mode': theme === ThemeTypes.Dark,
            })}>
            <button
                className="toggle_button" />
        </Toggler>
    )
}

export default ThemeToggler;