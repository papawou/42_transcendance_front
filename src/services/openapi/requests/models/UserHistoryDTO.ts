/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GameDTO } from './GameDTO';

export type UserHistoryDTO = {
    userId: number;
    rank: number;
    wins: Array<GameDTO>;
    loses: Array<GameDTO>;
};

