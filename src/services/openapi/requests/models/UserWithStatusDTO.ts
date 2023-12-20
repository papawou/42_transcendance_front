/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserWithStatusDTO = {
    status: UserWithStatusDTO.status;
    id: number;
    name: string;
    pic: string;
    elo: number;
};

export namespace UserWithStatusDTO {

    export enum status {
        SEARCH = 'SEARCH',
        INGAME = 'INGAME',
        OFFLINE = 'OFFLINE',
        ONLINE = 'ONLINE',
    }


}

