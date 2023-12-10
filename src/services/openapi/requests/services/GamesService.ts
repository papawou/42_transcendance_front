/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DuelAcceptDTO } from '../models/DuelAcceptDTO';
import type { DuelInviteDTO } from '../models/DuelInviteDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GamesService {

    /**
     * @param requestBody
     * @returns boolean
     * @throws ApiError
     */
    public static gameControllerDuelInvite(
        requestBody: DuelInviteDTO,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/games/duel/invite',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns boolean
     * @throws ApiError
     */
    public static gameControllerDuelAccept(
        requestBody: DuelAcceptDTO,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/games/duel/accept',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns boolean
     * @throws ApiError
     */
    public static gameControllerSearch(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/games/search/start',
        });
    }

    /**
     * @returns boolean
     * @throws ApiError
     */
    public static gameControllerSearchCancel(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/games/search/cancel',
        });
    }

}
