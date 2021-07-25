import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import Suit from 'components/Global/Suit';
import { themeState } from 'store/theme';
import { ThemeTypes } from 'types/theme';
import { color } from 'style/theme';
import { suitColor } from 'util/suit';
import Radio from 'components/Global/Radio';
import { CardSuitType } from 'types/card';

const themeData = {
    light: {
        red_suit_color: color.$red_suit_color,
        black_suit_color: color.$black_suit_color,
        unable_color: color.$unable_color,
    },
    dark: {
        red_suit_color: color.$dark_red_suit_color,
        black_suit_color: 'white',
        unable_color: color.$dark_unable_color
    },
}

const Button = styled.div`
    display: flex;
    align-items: center;

    .pattern {
        font-size: 16px;
        line-height: 16px;

        &.red {
            color: ${({ theme }) => theme.red_suit_color};
        }

        &.black {
            color: ${({ theme }) => theme.black_suit_color};
        }
    }

    &.is_unable {
        .pattern {
            color: ${({ theme }) => theme.unable_color};
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

interface OptionButtonProperty {
    isUnableBind: boolean;
    trickNumber: number;
    suit: CardSuitType;
    onClick: () => void;
    isPicked: boolean;
}

const OptionButton = (props: OptionButtonProperty) => {
    const {
        isUnableBind,
        trickNumber,
        suit,
        onClick = () => { },
        isPicked
    } = props;
    const [theme] = useRecoilState(themeState);
    const getBorder = () => {
        switch (theme) {
            case ThemeTypes.Light:
            default:
                return `1px solid ${color.$under_line_color}`;
            case ThemeTypes.Dark:
                return `1px solid ${color.$dark_dim_border_color}`;
        }
    }
    return (
        <Button
            theme={themeData[theme]}
            key={trickNumber + suit}
            className={classnames("option", { "chosen": isPicked, "is_unable": isUnableBind })}
            onClick={onClick}>
            <Radio
                className="radio"
                border={getBorder()}
                size={12}
                marginRight={5}
            />
            <Suit 
                className={classnames("pattern", suitColor(suit))}
                suit={suit}
            />
        </Button>
    )
}

export default OptionButton;