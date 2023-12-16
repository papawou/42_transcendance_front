/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDTO } from './UserDTO';

export type GameDTO = {
    id: string;
    type: Record<string, any>;
    winner: UserDTO;
    loser: UserDTO;
    winnerScore: number;
    loserScore: number;
    createdAt: string;
};

