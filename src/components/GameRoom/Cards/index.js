import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import UserHandCards from './UserHandCards';
import OtherUserHandCards from './OtherUserHandCards';

const CardGroup = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;

	.cards {
		display: flex;

		&__user {
			margin-top: auto;
			margin-bottom: 10px;
			max-width: 90vw;
		}

		&__left {
			position: absolute;
			transform-origin: left top;
			transform: rotate(90deg) translate(-50%, -50%);
			top: 50%;
			left: 0;
		}

		&__right {
			position: absolute;
			transform-origin: right top;
			transform: rotate(-90deg) translate(50%, -50%);
			top: 50%;
			right: 0;
		}

		&__cross {
			margin-top: -15px;
		}

	}
`

const Cards = () => {
	const order = ['cross', 'left', 'right', 'user'];

	return (
		<CardGroup className="card_group">
			{order.map((order) => (
				order === 'user'
					? <UserHandCards key={order} className={classnames("cards", `cards__${order}`)} />
					: <OtherUserHandCards key={order} className={classnames("cards", `cards__${order}`)} />
			))}
		</CardGroup >
	)
}

export default Cards;