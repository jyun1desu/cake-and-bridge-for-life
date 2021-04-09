import React from "react";
import { useTransition } from "react-spring";
import { useRecoilState } from "recoil";
import db from "database";

import Logo from "components/Home/Logo";
import RoomDialog from "components/Home/RoomDialog";
import Input from "components/Global/Input";
import Button from "components/Global/Button";

import { userNameState } from "store/user";
import styled from "styled-components";
import { color } from "style/theme";

const NameForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: ${color.$title_font_color};
    font-size: 25px;
    letter-spacing: 2px;
    margin: 0 0 25px 0;
  }
`;

const NameFillIn = ({ openRoomList }) => {
	const [userName, setUserName] = useRecoilState(userNameState);
	const handleButtonClick = (e) => {
		e.preventDefault();
		if (userName) openRoomList();
	};

	return (
		<NameForm id="name" className="user_input">
			<p>請輸入名字</p>
			<Input
				className="name_space"
				maxLength="6"
				onChange={(e) => setUserName(e.target.value)}
				value={userName}
				type="text"
			/>
			<Button
				color={`${color.$pink_color}`}
				onClick={handleButtonClick}
				type="submit"
				className="enter_button"
			>
				{userName ? "加入遊戲" : "請輸入名字"}
			</Button>
		</NameForm>
	);
};

const HomePage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const Home = () => {
	const [showRoomDialog, toggleRoomDialog] = React.useState(false);
	const [roomList, setRoomList] = React.useState([]);

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
		<HomePage>
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
