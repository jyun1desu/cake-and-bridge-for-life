import React from "react";
import { useTransition } from "react-spring";
import { useRecoilState } from "recoil";
import db from "database";

import Logo from "components/Home/Logo";
import RoomDialog from "components/Home/RoomDialog";
import Input from "components/Global/Input";
import Button from "components/Global/Button";
import ThemeToggler from 'components/Global/ThemeToggler';

import { userNameState } from "store/user";
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
		color: ${({theme}) => themeData[theme].fg };
	}

	.name_space{
		margin: 0 0 20px 0;
		padding: 5px;
		font-size: 22px;
		line-height: 25px;
		letter-spacing: 2px;
		color: ${({theme}) => themeData[theme].name_fg };
		border-bottom: 2px solid ${({theme}) => themeData[theme].border };
	}
`;

const NameFillIn = ({ openRoomList }) => {
	const [userName, setUserName] = useRecoilState(userNameState);
	const [theme] = useRecoilState(themeState);
	const handleButtonClick = (e) => {
		e.preventDefault();
		if (userName) openRoomList();
	};

	return (
		<NameForm theme={theme} id="name" className="user_input">
			<p>請輸入名字</p>
			<Input
				className="name_space"
				maxLength="8"
				onChange={(e) => setUserName(e.target.value)}
				value={userName}
				type="text"
			/>
			<Button
				className="enter_button"
				color={themeData[theme].button_color}
				onClick={handleButtonClick}
				type="submit"
			>
				{userName ? "加入遊戲" : "請至少輸入一個字"}
			</Button>
		</NameForm>
	);
};

const HomePage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	transition: .5s background-color;
    background-color: ${({theme}) => themeData[theme].bg };
`;

const Home = () => {
	const [showRoomDialog, toggleRoomDialog] = React.useState(false);
	const [roomList, setRoomList] = React.useState([]);
	const [theme] = useRecoilState(themeState);

	React.useEffect(()=>{
		subscribeRooms();
		return () => removeListeners();
	},[])
	
	const transitions = useTransition(showRoomDialog, {
		from: { opacity: 0, transform: "translateY(-15px)" },
		enter: { opacity: 1, transform: "translateY(0px)" },
		leave: { opacity: 0, transform: "translateY(-15px)" }
	});

	const subscribeRooms = () => {
		const Firebase = db.database().ref("/");
		Firebase.on("value", (data) => {
			const roomsData = data.val();
			if (roomsData) {
				let availibleRooms = [];
				for( const [key,value] of Object.entries(roomsData)) {
					const players = Object.values(value.playersInfo)
					if(players.length<4) availibleRooms.push(key);
				}
				setRoomList(availibleRooms);
			}else{
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
			<ThemeToggler className="on_page"/>
			<Logo className="logo" />
			<NameFillIn openRoomList={() => toggleRoomDialog(true)} />
			{transitions(
				(props, item) =>
					item && (
						<RoomDialog
							style={props}
							roomList={roomList}
							className="room_list_dialog"
							closeRoomList={() => toggleRoomDialog(false)}
						/>
					)
			)}
		</HomePage>
	);
};

export default Home;
