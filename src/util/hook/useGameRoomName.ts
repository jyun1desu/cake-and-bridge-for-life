import { useState } from 'react';

type Values = {
    gameRoomName: string;
    warnMessage: string;
}

type Handlers = {
    setRoomName: React.Dispatch<React.SetStateAction<string>>;
    setWarnMessage: React.Dispatch<React.SetStateAction<string>>
    validateRoomName: () => boolean;
}

const useGameRoomName = (): [Values, Handlers] => {
    const [gameRoomName, setRoomName] = useState('');
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
