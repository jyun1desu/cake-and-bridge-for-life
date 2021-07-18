import { TeamTypes  } from "./player";

export interface ScoreData {
    [TeamTypes.TeamOne]: number;
    [TeamTypes.TeamTwo]: number;
}