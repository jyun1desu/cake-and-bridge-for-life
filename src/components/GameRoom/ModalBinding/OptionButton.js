import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { color } from 'style/theme';
import { suitInPoker, suitColor } from 'util/suit';
import Radio from 'components/Global/Radio';

const Button = styled.div`
    display: flex;
    align-items: center;

    .pattern {
        font-size: 16px;
        line-height: 16px;

        &.red {
            color: ${color.$red_suit_color}
        }

        &.black {
            color: ${color.$black_suit_color}
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

const OptionButton = ({trickNumber, suit, onClick=() => {}, isPicked}) => {
    return (
        <Button 
        key={trickNumber+suit}
        className={classnames("option",{"chosen": isPicked})}
        onClick={onClick}>
        <Radio
            className="radio"
            border
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