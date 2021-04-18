import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { color } from 'style/theme';
import { suitInPoker, suitColor } from 'util/suit';
import Radio from 'components/Global/Radio';

const themeData = {
    light: { 
        red_suit_color: color.$red_suit_color,
        black_suit_color: color.$black_suit_color,
    },
    dark: {
        red_suit_color: color.$dark_red_suit_color,
        black_suit_color: 'white',
    },
}

const Button = styled.div`
    display: flex;
    align-items: center;

    .pattern {
        font-size: 16px;
        line-height: 16px;

        &.red {
            color: ${({theme}) => themeData[theme].red_suit_color};
        }

        &.black {
            color: ${({theme}) => themeData[theme].black_suit_color};
        }
    }

    &.chosen {
        .radio {
            &::after {
                background-color: #dcdcdc;
            }
        }
    }
`

const OptionButton = ({
    theme, 
    trickNumber, 
    suit, 
    onClick=() => {}, 
    isPicked
    }) => {
    const getBorder = () => {
        switch(theme) {
            case 'light':
            default:
                return `1px solid ${color.$under_line_color}`;
            case 'dark': 
                return `1px solid ${color.$dark_dim_border_color}`;
        }
    }
    return (
        <Button
        key={trickNumber+suit}
        className={classnames("option",{"chosen": isPicked})}
        onClick={onClick}>
            <Radio
                className="radio"
                border={getBorder(theme)}
                size="12"
                marginRight="5"
            />
        <span  
            className={classnames("pattern",suitColor(suit))}
        >{suitInPoker(suit)}&#xFE0E;</span>
    </Button>
    )
}

export default OptionButton;