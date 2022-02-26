import db, { getFirebaseData } from "database";
import { child, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userNameState, userRoomState, userIDState } from "store/user";
import { PlayerData } from "types/player";
import { ReadyTypes } from "types/types";

type Values = {
  userReadyStatus: boolean;
};

type Handlers = {
  setReadyStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const useUserReadyStatus = (type: ReadyTypes): [Values, Handlers] => {
  const [readyStatus, setReadyStatus] = useState(false);
  const userId = useRecoilValue(userIDState);
  const userName = useRecoilValue(userNameState);
  const roomId = useRecoilValue(userRoomState);

  useEffect(() => {
    const setReady = async (isReady: boolean, type: ReadyTypes) => {
      const roomRef = ref(db, roomId);
      const playersInfoRef = child(roomRef, "playersInfo");
      await update(child(playersInfoRef, userId), { ready: isReady });

      if (isReady) {
        const rawFirebaseData = await getFirebaseData(`${roomId}/playersInfo`);
        const playersData = Object.values(rawFirebaseData) as PlayerData[];
        const allReady = playersData.filter((data) => data.ready).length === 4;
        if (allReady) {
          await update(roomRef, {
            gameInfo: {
              currentPlayer: userName,
            },
            [type]: true,
          });
        }
      }
    };
    setReady(readyStatus, type);
  }, [readyStatus, type, roomId, userId, userName]);

  return [{ userReadyStatus: readyStatus }, { setReadyStatus }];
};

export default useUserReadyStatus;
