import React from "react";
import { useRecoilValue } from "recoil";

import Input from "components/Global/Input";
import Button from "components/Global/Button";

import useUserName from "util/hook/useUserName";
import { themeState } from 'store/theme';
import styled from "styled-components";
import { color } from "style/theme";

const themeData = {
	light: {
		fg: color.$title_font_color,
		name_fg: color.$title_font_color,
		border: color.$title_font_color,
		button_color: color.$pink_color,
	},
	dark: {
		fg: color.$dark_default_font_color,
		name_fg: color.$fluorescent_pink_color,
		border: color.$dark_border_color,
		button_color: color.$fluorescent_pink_color,
	},
}

const NameForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		font-size: 22px;
		letter-spacing: 3px;
		margin: 0 0 25px 0;
		transition: .3s all;
		color: ${({ theme }) => theme.fg};
	}

	.name_space{
		padding: 5px;
		font-size: 22px;
		line-height: 25px;
		letter-spacing: 2px;
		color: ${({ theme }) => theme.name_fg};
		border-bottom: 2px solid ${({ theme }) => theme.border};
	}

	.warn_message {
		margin-top: 10px;
		color: ${({ theme }) => theme.name_fg};
		opacity: 0.6;
		letter-spacing: 1px;
	}

	.enter_button {
		margin-top: 20px;
        min-width: 50%;
        font-size: 18px;
        letter-spacing: 3px;
	}
`;

interface NameFillInProperty {
	onEnter: () => void;
    buttonText: string;
    actionText?: string;
}

const NameFillIn = (props: NameFillInProperty) => {
	const { onEnter, actionText, buttonText } = props;
	const [
		{ userName, warnMessage },
		{ setUserName, validateUserName, setWarnMessage }
	] = useUserName();

	const theme = useRecoilValue(themeState);
	const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		const isValid = validateUserName();

		if (isValid) {
			onEnter();
		}
	};

	return (
		<NameForm theme={themeData[theme]} id="name" className="user_input">
			{actionText && <p>{actionText}</p>}
			<Input
				className="name_space"
				onFocus={() => setWarnMessage('')}
				maxLength={8}
				onChange={(e) => setUserName(e.target.value)}
				value={userName}
			/>
			{warnMessage && <span className="warn_message">{warnMessage}</span>}
			<Button
				className="enter_button"
				color={themeData[theme].button_color}
				onClick={handleButtonClick}
				type="submit"
			>
				{buttonText}
			</Button>
		</NameForm>
	);
};

export default NameFillIn