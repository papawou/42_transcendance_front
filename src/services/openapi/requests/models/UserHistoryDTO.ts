/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GameDTO } from './GameDTO';

export type UserHistoryDTO = {
    id: number;
    rank: number;
    elo: number;
    wins: Array<GameDTO>;
    loses: Array<GameDTO>;
};

