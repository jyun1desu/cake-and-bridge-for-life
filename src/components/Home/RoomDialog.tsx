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

import { RoomList } from 'types/room';
import userGameRoomName from "util/hook/useGameRoomName";
import { userNameState, userRoomState, userIDState } from "store/user";
import { themeState } from 'store/theme';

const themeData = {
	light: {
		bg: 'white',
		fg: color.$brown_color,
		boxBorder: 'none',
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
		boxBorder: '1px solid' + color.$fluorescent_pink_color,
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
	border: ${({ theme }) => theme.boxBorder};
	background-color: ${({ theme }) => theme.bg};

	.cancel_button {
		font-size: 14px;
		position: absolute;
		cursor: pointer;
		border-radius: 50%;
		padding: 3px;
		right: 5px;
		top: 5px;
		color: ${({ theme }) => theme.cancel_fg};
		border: ${({ theme }) => theme.boxBorder};
		background-color: ${({ theme }) => theme.cancel_bg};
	}

	& > .title {
		padding: 15px;
		text-align: center;
		font-size: 20px;
		letter-spacing: 2px;
		color: ${({ theme }) => theme.title_fg};
		background-color: ${({ theme }) => theme.title_bg};
		border-bottom: ${({ theme }) => theme.box_border};
	}

	.block {
		padding: 15px 15px 5px;

		.title {
			margin: 0;
			text-align: center;
			padding-bottom: 5px;
			font-size: 14px;
			letter-spacing: 1px;
			color: ${({ theme }) => theme.sub_title_fg};;
			border-bottom: 1.5px solid ${({ theme }) => theme.sub_title_bb};
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
						color: ${({ theme }) => theme.fg};
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

interface CreateButtonProperty {
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
	className: string;
	isValid: boolean;
	children: React.ReactNode;
}
const CreateButton = (props: CreateButtonProperty) => {
	const { onClick, className, isValid } = props;
	const [theme] = useRecoilState(themeState);
	const getButtonColor = () => {
		switch (theme) {
			case 'light':
			default:
				return isValid ? color.$highlight_color : color.$unable_color;
			case 'dark':
				return isValid ? color.$fluorescent_pink_color : color.$dark_dim_border_color;
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

interface RoomButtonProperty {
	onClick: () => void;
	className: string;
	roomName: string;
}

const RoomButton = (props: RoomButtonProperty) => {
	const  { onClick, className, roomName } = props;
	const [theme] = useRecoilState(themeState);
	const getButtonColor = () => {
		switch (theme) {
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

interface RoomDialogProperty {
	className: string;
	active: Boolean;
	roomList: RoomList;
	closeRoomList: (e: React.MouseEvent<HTMLElement>) => void;
}
const RoomDialog = (props: RoomDialogProperty) => {
	const { active, className, closeRoomList, roomList } = props;
	const history = useHistory();
	const [theme] = useRecoilState(themeState);
	const [
		{ gameRoomName, warnMessage },
		{ setRoomName, validateRoomName, setWarnMessage }
	] = userGameRoomName();
	const userName = useRecoilValue(userNameState);
	const setLocalRoom = useSetRecoilState(userRoomState);
	const setUserID = useSetRecoilState(userIDState);

	const createRoom = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		const isValid = validateRoomName();

		if (isValid) {
			const roomID = uuidv4();
			setLocalRoom(roomID);
			updateDbRoomData(roomID, gameRoomName);
		}
	}

	const pickExistRoom = (roomID: string) => {
		setLocalRoom(roomID);
		updateDbRoomData(roomID);
	}

	const updateDbRoomData = async (roomID: string, roomName?: string) => {
		const roomRef = db.database().ref(`/${roomID}`);
		const userID = uuidv4() as string;
		const current = new Date();
		const timestamp = Date.parse(current.toString()) as number;
		setUserID(userID);
		await roomRef.child('playersInfo')
			.child(userID)
			.update({ timestamp, userID, player: userName });
		if (roomName) {
			await roomRef.update({ timestamp, roomName });
		}
		const toPath = `/${roomID}/waiting_room/${userID}`
		history.push(toPath);
	}

	return (
		<Modal
			active={active}
			onDeactive={(e: React.MouseEvent<HTMLElement>) => {
				closeRoomList(e);
			}}
			className={className}>
			<Content
				theme={themeData[theme]}
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
											key={room.roomID}
											onClick={() => pickExistRoom(room.roomID)}
											className="room"
											roomName={room.roomName} />)
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
									value={gameRoomName}
									onChange={(e) => {
										setWarnMessage('');
										setRoomName(e.target.value)
									}}
									maxLength={20}
									placeholder="請輸入3-20字元"
								/>
								<CreateButton
									className='create_button'
									isValid={gameRoomName.length > 2}
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