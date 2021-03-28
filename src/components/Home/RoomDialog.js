import React from 'react';

const RoomDialog = (props) => {
	const availibleRooms = [];
	return (
		<div className="create_room_page">
			<div className="dialog">
				<span
					onClick={(e) => props.toggleRoomList(e)}
					className="cancel">×</span>
				<div className="title">選擇或創建房間</div>
				<div className="room_choose">
					<div className="block join_exist_room">
						<p className="title">選擇已經存在的房間</p>
						{availibleRooms.length
							? <p className="no_room">目前尚無空房</p>
							: <div className="room_list">
								{availibleRooms.map(room => {
									return <button
										onClick={(e) => {
											e.preventDefault();
										}}
										key={room}
										className="room">{room}</button>
								})}
							</div>
						}
					</div>
					<div className="block create_room">
						<p className="title">建立一個房間</p>
						<div className="content">
							<form>
								<input
									onInput={(e) => console.log(e.target.value)}
									type="text"
									placeholder="請輸入3-8字元"
									className="room_name"
								/>
								<button
									onClick={(e) => console.log(e)}
									className='create_button'
								>建立</button>
							</form>
						</div>
					</div>
				</div >
			</div >
		</div >
	);
}

export default RoomDialog;