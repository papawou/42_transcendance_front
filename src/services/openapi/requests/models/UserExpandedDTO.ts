/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDTO } from './UserDTO';
import type { UserWithStatusDTO } from './UserWithStatusDTO';

export type UserExpandedDTO = {
    id: number;
    name: string;
    pic: string;
    elo: number;
    friends: Array<UserWithStatusDTO>;
    blocked: Array<UserDTO>;
    pending: Array<UserDTO>;
    pendingOf: Array<UserDTO>;
    tfaValid: boolean;
};

