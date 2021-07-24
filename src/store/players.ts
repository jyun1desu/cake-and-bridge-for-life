import {
    atom, selector,
} from 'recoil';
import { PlayerData, TeamTypes } from 'types/player';

import { userNameState } from './user';

export const playersData = atom({
    key: 'playersData',
    default: [] as PlayerData[],
})

export const teamArray = selector({
    key: 'teamState',
    get: ({get}) => {
        const team = get(playersData);
        return team.map(data=>data.team);
    }
})

export const OrderedStartFromTeamOne = selector({
    key: 'OrderedStartFromTeamOne',
    get: ({get}) => {
        const playerDataState = get(playersData);
        const firstPlayer = playerDataState.filter(player=>player.team === TeamTypes.TeamOne)[0];
        const secondPlayer = playerDataState.filter(player=>player.team === TeamTypes.TeamTwo)[0];
        const thirdPlayer = playerDataState.filter(player=>player.team === TeamTypes.TeamOne)[1];
        const lastPlayer = playerDataState.filter(player=>player.team === TeamTypes.TeamTwo)[1];
        const result = [firstPlayer,secondPlayer,thirdPlayer,lastPlayer]
            .map(playerData=>playerData.name);
        return result
    }
})

const handleIndex = (index: number) => {
    if(index > 3) {
        return index - 4
    } else {
        return index
    }
}

export const relationWithUser = selector({
    key: 'relationWithUser',
    get: ({get}) => {
        const playerDataState = get(OrderedStartFromTeamOne);
        const user = get(userNameState);
        const userIndex = playerDataState.indexOf(user);
        const nextIndex = handleIndex(userIndex + 1);
        const teammateIndex = handleIndex(userIndex + 2);
        const previousIndex = handleIndex(userIndex + 3);
        return {
            user,
            teammate: playerDataState[teammateIndex],
            nextPlayer: playerDataState[nextIndex],
            previousPlayer: playerDataState[previousIndex],
        }
    }
})