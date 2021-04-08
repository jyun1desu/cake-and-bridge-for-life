import {
    atom, selector,
} from 'recoil';

export const playersData = atom({
    key: 'playersData',
    default: [],
})

export const teamArray = selector({
    key: 'teamState',
    get: ({get}) => {
        const team = get(playersData);
        return team.map(data=>data.team);
    }
})