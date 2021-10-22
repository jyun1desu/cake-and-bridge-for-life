import { useRecoilValue, useSetRecoilState } from "recoil";
import db from "database";
import { ref, update, child } from "firebase/database";
import { useHistory } from "react-router-dom";
import generateUniqueId from "util/generateUniqueId";
import { userIDState, userNameState, userRoomState } from "store/user";

type Values = {};

type Handlers = {
  updateDbRoomData: (roomID: string, roomName?: string) => Promise<void>;
};

const useFirebaseRoom = (): [Values, Handlers] => {
  const setUserID = useSetRecoilState(userIDState);
  const userName = useRecoilValue(userNameState);
  const setLocalRoom = useSetRecoilState(userRoomState);
  const history = useHistory();

  const updateDbRoomData = async (roomID: string, roomName?: string) => {
    const roomRef = ref(db, `/${roomID}`);
    const userID = generateUniqueId() as string;
    const current = new Date();
    const timestamp = Date.parse(current.toString()) as number;
    const userInfo = { timestamp, id: userID, name: userName };

	/* local */
    setLocalRoom(roomID);
    setUserID(userID);

	/* firebase */
    if (roomName) {
      await update(roomRef, {
        roomName,
        playersInfo: {
          [userID]: userInfo,
        },
      });
    } else {
      await update(child(roomRef, `playersInfo/${userID}`), userInfo);
    }

    const toPath = `/w/${roomID}/${userID}`;
    history.push(toPath);
  };

  return [{}, { updateDbRoomData }];
};

export default useFirebaseRoom;
