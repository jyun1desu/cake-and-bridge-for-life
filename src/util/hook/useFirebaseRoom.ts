import { useRecoilValue, useSetRecoilState } from "recoil";
import db from "database";
import { useHistory } from "react-router-dom";
import generateUniqueId from "util/generateUniqueId";
import { userIDState, userNameState, userRoomState } from "store/user";

type Values = {}

type Handlers = {
    updateDbRoomData: (roomID: string, roomName?: string) => Promise<void>;
}

const useFirebaseRoom = (): [Values, Handlers] => {
    const setUserID = useSetRecoilState(userIDState);
    const userName = useRecoilValue(userNameState);
	const setLocalRoom = useSetRecoilState(userRoomState);
    const history = useHistory();
    
	const updateDbRoomData = async (roomID: string, roomName?: string) => {
		const roomRef = db.database().ref(`/${roomID}`);
		const userID = generateUniqueId() as string;
		const current = new Date();
		const timestamp = Date.parse(current.toString()) as number;
        const userInfo = { timestamp, id: userID, name: userName };
		setLocalRoom(roomID);
		setUserID(userID);

		if (roomName) {
			await roomRef.update({ 
				roomName,
				playersInfo: {
					[userID]: userInfo
				}
			});
		} else {
			await roomRef.child('playersInfo')
			.child(userID)
			.update(userInfo);
		}

		const toPath = `/w/${roomID}/${userID}`
		history.push(toPath);
	}

    return [
        {},
        { updateDbRoomData }
    ]
}

export default useFirebaseRoom;
