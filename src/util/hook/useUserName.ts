import { useState } from 'react';
import { useRecoilState } from "recoil";
import { userNameState } from "store/user";

type Values = {
    userName: string;
    warnMessage: string;
}

type Handlers = {
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setWarnMessage: React.Dispatch<React.SetStateAction<string>>
    validateUserName: () => boolean;
}

const useUserName = (): [Values, Handlers] => {
    const [userName, setUserName] = useRecoilState(userNameState);
    const [warnMessage, setWarnMessage] = useState('');

    const validateUserName = () => {
        const regex = /^[^.]*$/g;
        const isVaild = regex.test(userName);

        if (!userName) {
            setWarnMessage('請輸入至少一個字');
			return false;
        }

		if (!isVaild) {
			setWarnMessage('請勿輸入 . 作為名字');
			return false;
		}

		setWarnMessage('');
		return true;
	};

    return [
        { userName, warnMessage },
        { setUserName, setWarnMessage, validateUserName }
    ]
}

export default useUserName;
