import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import db from "database";

import Logo from "components/Home/Logo";
import RoomDialog from "components/Home/RoomDialog";
import Input from "components/Global/Input";
import Button from "components/Global/Button";
import ThemeToggler from 'components/Global/ThemeToggler';

import { RoomList, FirebaseRoomsData } from 'types/room';

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
	}
`;

interface NameFillInProperty {
	openRoomList: () => void;
}

const NameFillIn = (props: NameFillInProperty) => {
	const { openRoomList } = props;
	const [
		{ userName, warnMessage },
		{ setUserName, validateUserName, setWarnMessage }
	] = useUserName();

	const theme = useRecoilValue(themeState);
	const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		const isValid = validateUserName();

		if (isValid) {
			openRoomList();
		}
	};

	return (
		<NameForm theme={themeData[theme]} id="name" className="user_input">
			<p>請輸入名字</p>
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
				加入遊戲
			</Button>
		</NameForm>
	);
};

const HomePage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	transition: .3s background-color;
    background-color: ${({ theme }) => theme.bg};
`;

const Home = () => {
	const [showRoomDialog, toggleRoomDialog] = useState<boolean>(false);
	const [roomList, setRoomList] = useState<RoomList>([]);
	const [{ initGameData }] = useInitData();
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
			const roomsData = data.val() as FirebaseRoomsData;
			if (!roomsData) {
				setRoomList([]);
				return;
			}

			const filterOutAbandonedRoom = Object.entries(roomsData)
				.filter(data => data[1].playersInfo)
				.reduce((obj, data) => {
					return {
						...obj,
						[data[0]]: data[1]
					};
				}, {});

			Firebase.set(filterOutAbandonedRoom);

			const rooms = Object.entries(roomsData)
				.map(room => ({
					roomID: room[0],
					...room[1]
				}))
				.filter(room => {
					return room.playersInfo && Object.values(room.playersInfo).length < 4;
				})
				.sort((a, b) => {
					return b.timestamp - a.timestamp;
				})
			setRoomList(rooms as RoomList);
		});
	};

	const removeListeners = () => {
		const Firebase = db.database().ref("/");
		Firebase.off();
	};

	return (
		<HomePage theme={themeData[theme]}>
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
