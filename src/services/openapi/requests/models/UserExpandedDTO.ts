/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDTO } from './UserDTO';

export type UserExpandedDTO = {
    id: number;
    name: string;
    ft_id: string;
    pic: string;
    friends: Array<UserDTO>;
    blocked: Array<UserDTO>;
};

