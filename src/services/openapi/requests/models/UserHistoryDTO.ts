/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GameDTO } from './GameDTO';

export type UserHistoryDTO = {
    wins: Array<GameDTO>;
    loses: Array<GameDTO>;
};

