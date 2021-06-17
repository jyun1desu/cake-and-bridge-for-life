import { useState } from 'react';
import { useRecoilState } from "recoil";
import { userRoomState } from "store/user";


const useGameRoomName = () => {
    const [gameRoomName, setRoomName] = useRecoilState(userRoomState);
    const [warnMessage, setWarnMessage] = useState('');

    const validateRoomName = () => {
        const regex = /^[^.]*$/g;
        const isVaild = regex.test(gameRoomName);

		if (!isVaild) {
			setWarnMessage('請勿輸入 . 作為房間名');
			return false;
		}

		setWarnMessage('');
		return true;
	};

    return [
        { gameRoomName, warnMessage },
        { setRoomName, setWarnMessage, validateRoomName }
    ]
}

export default useGameRoomName;
