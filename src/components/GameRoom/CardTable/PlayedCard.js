import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import Card from 'components/GameRoom/Card';
import { color } from 'style/theme';

const CardGroup = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    .played_card {
        position: absolute;
        box-shadow: 1px 1px 2px 1px ${color.$shadow};
        &.user {
        left: 50%;
        bottom: 25px;
        transform: translateX(-50%);
        }
        &.cross {
            left: 50%;
            top: 25px;
            transform: translateX(-50%);
        }
        &.left {
            left: 25px;
            top: 50%;
            transform-origin: left top;
            transform: rotate(90deg) translate(-50%, -100%);
        }
        &.right {
            right: 25px;
            top: 50%;
            transform-origin: right top;
            transform: rotate(90deg) translateX(50%);
        }
    }
`
const order = ['cross', 'left', 'right', 'user'];

const PlayedCard = () => {
    return (
        <CardGroup>
            {order.map(order => (
                <Card
                    key={order}
                    className={classnames("played_card",order)}
                    number="12"
                    suit="heart"
                    hasDetail
                />
            ))}
        </CardGroup>
    )
}

export default PlayedCard