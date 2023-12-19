/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDTO } from '../models/LoginDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static appControllerGetProfile(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profile',
        });
    }

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
     * @returns any
     * @throws ApiError
     */
    public static authControllerFtCallback(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/ft/callback',
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
     * @returns any
     * @throws ApiError
     */
    public static chatControllerGetBlockedUsers(): CancelablePromise<any> {
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
