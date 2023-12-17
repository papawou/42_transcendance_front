/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserStatusDTO = {
    status: UserStatusDTO.status;
};

export namespace UserStatusDTO {

    export enum status {
        SEARCH = 'SEARCH',
        INGAME = 'INGAME',
        OFFLINE = 'OFFLINE',
        ONLINE = 'ONLINE',
        NULL = 'null',
    }


}

