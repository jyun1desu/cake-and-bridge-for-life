import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import db from "database";

import Logo from "components/Home/Logo";
import RoomDialog from "components/Home/RoomDialog";
import NameFillIn from "components/Global/NameFillIn";
import ThemeToggler from 'components/Global/ThemeToggler';

import { RoomList, FirebaseRoomsData } from 'types/room';

import useInitData from "util/hook/useInitData";
import { themeState } from 'store/theme';
import styled from "styled-components";
import { color } from "style/theme";

const themeData = {
	light: {
		bg: color.$theme_background,
	},
	dark: {
		bg: color.$dark_bg_color,
	},
}

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
		Firebase.on("value", async (data) => {
			const roomsData = data.val() as FirebaseRoomsData;
			if (!roomsData) {
				setRoomList([]);
				return;
			}

			const filterOutAbandonedRoom = Object.entries(roomsData)
				.filter(data => data[1].playersInfo)
				.reduce((obj, data) => ({
					...obj,
					[data[0]]: data[1]
				}), {});

			await Firebase.set(filterOutAbandonedRoom);
	
			const rooms = Object.entries(roomsData)
				.map(room => ({
					roomID: room[0],
					...room[1]
				}))
				.filter(room => {
					return room.playersInfo && Object.values(room.playersInfo).length < 4;
				});

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
			<NameFillIn
				actionText="請輸入名字"
				buttonText="加入遊戲"
				onEnter={() => toggleRoomDialog(true)}
			/>
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
