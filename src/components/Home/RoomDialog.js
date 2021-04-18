import React from 'react';
import db from "database";
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { color } from 'style/theme'
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import Modal from "components/Global/Modal";
import Button from 'components/Global/Button';
import Input from 'components/Global/Input';

import { userNameState, userRoomState, userIDState } from "store/user";
import { themeState } from 'store/theme';

const themeData = {
	light: {
		bg: 'white',
		fg: color.$default_font_color,
		box_border: 'none',
		cancel_bg: color.$warn_red_color,
		cancel_fg: 'white',
		title_bg: color.$pink_color,
		title_fg: 'white',
		sub_title_fg: '#888',
		sub_title_bb: color.$under_line_color,
	},
	dark: {
		bg: color.$dark_bg_color,
		fg: color.$fluorescent_pink_color,
		box_border: '1px solid' + color.$fluorescent_pink_color,
		cancel_bg: color.$dark_bg_color,
		cancel_fg: color.$fluorescent_pink_color,
		title_bg: color.$dark_bg_color,
		title_fg: color.$fluorescent_pink_color,
		sub_title_fg: '#E5D5D5',
		sub_title_bb: color.$dark_dim_border_color,
	},
}


const Content = styled.div`
	width: 80vw;
	position: absolute;
	border-radius: 10px;
	overflow: hidden;
	position: relative;
	border: ${({ theme }) => themeData[theme].box_border};
	background-color: ${({ theme }) => themeData[theme].bg};

	.cancel_button {
		font-size: 14px;
		position: absolute;
		cursor: pointer;
		border-radius: 50%;
		padding: 3px;
		right: 5px;
		top: 5px;
		color: ${({ theme }) => themeData[theme].cancel_fg};
		border: ${({ theme }) => themeData[theme].box_border};
		background-color: ${({ theme }) => themeData[theme].cancel_bg};
	}

	& > .title {
		padding: 15px;
		text-align: center;
		font-size: 20px;
		letter-spacing: 2px;
		color: ${({ theme }) => themeData[theme].title_fg};
		background-color: ${({ theme }) => themeData[theme].title_bg};
		border-bottom: ${({ theme }) => themeData[theme].box_border};
	}

	.block {
		padding: 15px 15px 5px;

		.title {
			margin: 0;
			text-align: center;
			padding-bottom: 5px;
			font-size: 14px;
			letter-spacing: 1px;
			color: ${({ theme }) => themeData[theme].sub_title_fg};;
			border-bottom: 1.5px solid ${({ theme }) => themeData[theme].sub_title_bb};
		}

		&.join_exist_room {
			.room_list {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-top: 10px;
				max-height: 150px;
				overflow: scroll;
			}

			.no_room {
			margin-top: 15px;
			color: ${color.$unable_color};
			text-align: center;
			font-size: 14px;
			letter-spacing: 1px;
			}

			.room {
			margin-bottom: 10px;
			font-size: 16px;
			letter-spacing: 1px;
			}
		}

		&.create_room {
			.content {
			padding: 10px;
			box-sizing: border-box;

				form {
					display: flex;
					justify-content: space-between;

					.room_name {
						margin-right: 20px;
						text-align: left;
						font-size: 18px;
						letter-spacing: 2px;
						color: ${({ theme }) => themeData[theme].fg};
						border-bottom: 2px solid ${color.$unable_color};

						&::placeholder {
							font-size: 12px;
							color: ${color.$unable_color};
							text-align: center;
							margin: 10px 0 0;
							letter-spacing: 2px;
						}
					}
				}

				.warn_message {
					margin: 10px 0 0;
					font-size: 12px;
					letter-spacing: 1px;
					color: ${color.$warn_red_color};
				}
			}
		}
	}
`

const CreateButton = ({onClick, className, inputLength}) => {
	const [theme] = useRecoilState(themeState);
	const getButtonColor = () =>  {
		const isVaild = inputLength > 2
		switch(theme){
			case 'light':
			default:
				return isVaild ? color.$highlight_color:color.$unable_color;
			case 'dark':
				return isVaild ? color.$fluorescent_pink_color:color.$dark_dim_border_color;
		}
	};
	return (
	<Button
		color={getButtonColor()}
		onClick={onClick}
		className={className}
	>建立</Button>
	)
};

const RoomButton = ({ onClick, className, roomName }) => {
	const [theme] = useRecoilState(themeState);
	const getButtonColor = () => {
		switch(theme){
			case 'light':
			default:
				return color.$green_color
			case 'dark':
				return color.$fluorescent_pink_color
		}
	}

	return (
		<Button
			className={className}
			onClick={onClick}
			color={getButtonColor()}>
			{roomName}
		</Button>)
}

const RoomDialog = ({ className, closeRoomList, style, roomList }) => {
	const history = useHistory();
	const [theme] = useRecoilState(themeState);
	const userName = useRecoilValue(userNameState);
	const setLocalRoom = useSetRecoilState(userRoomState);
	const setUserID = useSetRecoilState(userIDState);
	const [userInputRoom, setUserInputRoom] = React.useState('');
	const [warnMessage, setWarnMessage] = React.useState('');

	const createRoom = (e) => {
		e.preventDefault();
		if (userInputRoom.length < 3) return setWarnMessage('請輸入至少三個字');
		if (roomList.includes(userInputRoom)) return setWarnMessage('已有重複房名');
		setLocalRoom(userInputRoom);
		updateDbRoomData(userInputRoom);
	}

	const pickExistRoom = (roomName) => {
		setLocalRoom(roomName);
		updateDbRoomData(roomName);
	}

	const updateDbRoomData = async (roomName) => {
		const roomRef = db.database().ref(`/${roomName}`);
		const userID = uuidv4();
		const timestamp = Date.parse(new Date());
		setUserID(userID);
		await roomRef.child('playersInfo').child(userID).update({ timestamp, userID, player: userName });
		const toPath = `/${roomName}/waiting_room/${userID}`
		history.push(toPath);
	}

	return (
		<Modal
			style={style}
			onDeactive={(e) => {
				closeRoomList(e);
			}}
			className={className}>
			<Content
				theme={theme}
				onClick={e => e.stopPropagation()}
				className="content">
				<button
					onClick={(e) => closeRoomList(e)}
					className="cancel_button">×</button>
				<div className="title">選擇或創建房間</div>
				<div className="room_choose">
					<div className="block join_exist_room">
						<p className="title">選擇已經存在的房間</p>
						{!roomList.length
							? <p className="no_room">目前尚無空房</p>
							: <div className="room_list">
								{roomList.map(room => {
									return (
										<RoomButton
											key={room}
											onClick={() => pickExistRoom(room)}
											className="room"
											roomName={room} />)
								})}
							</div>
						}
					</div>
					<div className="block create_room">
						<p className="title">建立一個房間</p>
						<div className="content">
							<form>
								<Input
									className="room_name"
									value={userInputRoom}
									onChange={(e) => {
										setWarnMessage('');
										setUserInputRoom(e.target.value)
									}}
									type="text"
									maxLength="8"
									placeholder="請輸入3-8字元"
								/>
								<CreateButton
									className='create_button'
									inputLength={userInputRoom.length}
									onClick={e => createRoom(e)}
								>建立</CreateButton>
							</form>
							{warnMessage && <p className='warn_message'>{warnMessage}</p>}
						</div>
					</div>
				</div >
			</Content >
		</Modal >
	);
}

export default RoomDialog;