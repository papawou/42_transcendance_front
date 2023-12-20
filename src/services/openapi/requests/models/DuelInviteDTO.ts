/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DuelInviteDTO = {
    type: DuelInviteDTO.type;
    targetId: number;
};

export namespace DuelInviteDTO {

    export enum type {
        CASUAL = 'CASUAL',
        TROLL = 'TROLL',
    }


}

