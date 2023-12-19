/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FtCallbackDTO } from '../models/FtCallbackDTO';
import type { LoginDTO } from '../models/LoginDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: LoginDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerFtCallback(
        requestBody: FtCallbackDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/ft/callback',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static chatControllerGetRoomsFromUser(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chat/userRooms',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static chatControllerGetPMsFromUser(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chat/userPMs',
        });
    }

    /**
     * @returns number
     * @throws ApiError
     */
    public static chatControllerGetBlockedUsers(): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chat/blockedUsers',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static chatControllerGetAllPublicRooms(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chat/roomNames',
        });
    }

}
