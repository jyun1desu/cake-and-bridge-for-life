import React, { useState } from "react";
import { useTransition } from "react-spring";
import { useRecoilValue } from "recoil";
import db from "database";

import Logo from "components/Home/Logo";
import RoomDialog from "components/Home/RoomDialog";
import Input from "components/Global/Input";
import Button from "components/Global/Button";
import ThemeToggler from 'components/Global/ThemeToggler';

import useUserName from "util/hook/useUserName";
import useInitData from "util/hook/useInitData";
import { themeState } from 'store/theme';
import styled from "styled-components";
import { color } from "style/theme";

const themeData = {
	light: {
		bg: color.$theme_background,
		fg: color.$title_font_color,
		name_fg: color.$title_font_color,
		border: color.$title_font_color,
		button_color: color.$pink_color,
	},
	dark: {
		bg: color.$dark_bg_color,
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
		transition: .5s all;
		color: ${({ theme }) => themeData[theme].fg};
	}

	.name_space{
		padding: 5px;
		font-size: 22px;
		line-height: 25px;
		letter-spacing: 2px;
		color: ${({ theme }) => themeData[theme].name_fg};
		border-bottom: 2px solid ${({ theme }) => themeData[theme].border};
	}

	.warn_message {
		margin-top: 10px;
		color: ${({ theme }) => themeData[theme].name_fg};
		opacity: 0.6;
		letter-spacing: 1px;
	}

	.enter_button {
		margin-top: 20px;
	}
`;

const NameFillIn = ({ openRoomList }) => {
	const [
		{ userName, warnMessage },
		{ setUserName, validateUserName, setWarnMessage }
	] = useUserName();

	const theme = useRecoilValue(themeState);
	const handleButtonClick = (e) => {
		e.preventDefault();
		const isValid = validateUserName();

		if (isValid) {
			openRoomList();
		}
	};

	return (
		<NameForm theme={theme} id="name" className="user_input">
			<p>請輸入名字</p>
			<Input
				onFocus={() => setWarnMessage('')}
				className="name_space"
				maxLength="8"
				onChange={(e) => setUserName(e.target.value)}
				value={userName}
				type="text"
			/>
			{warnMessage && <span className="warn_message">{warnMessage}</span>}
			<Button
				className="enter_button"
				color={themeData[theme].button_color}
				onClick={handleButtonClick}
				type="submit"
			>
				加入遊戲
			</Button>
		</NameForm>
	);
};

const HomePage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	transition: .5s background-color;
    background-color: ${({ theme }) => themeData[theme].bg};
`;

const Home = () => {
	const [showRoomDialog, toggleRoomDialog] = useState(false);
	const [roomList, setRoomList] = useState([]);
	const [, { initGameData }] = useInitData();
	const theme = useRecoilValue(themeState);

	React.useEffect(() => {
		initGameData();
		subscribeRooms();
		return () => removeListeners();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const subscribeRooms = () => {
		const Firebase = db.database().ref("/");
		Firebase.on("value", (data) => {
			const roomsData = data.val();
			if (roomsData) {
				let availibleRooms = [];
				for (const [key, value] of Object.entries(roomsData)) {
					const players = Object.values(value.playersInfo)
					if (players.length < 4) availibleRooms.push(key);
				}
				setRoomList(availibleRooms);
			} else {
				setRoomList([]);
			}
		});
	};

	const removeListeners = () => {
		const Firebase = db.database().ref("/");
		Firebase.off();
	};

	return (
		<HomePage theme={theme}>
			<ThemeToggler className="on_page" />
			<Logo className="logo" />
			<NameFillIn openRoomList={() => toggleRoomDialog(true)} />
			<RoomDialog
				active={showRoomDialog}
				roomList={roomList}
				className="room_list_dialog"
				closeRoomList={() => toggleRoomDialog(false)}
			/>
		</HomePage>
	);
};

export default Home;
