/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessTokenDTO } from '../models/AccessTokenDTO';
import type { FtCallbackDTO } from '../models/FtCallbackDTO';
import type { TfaDTO } from '../models/TfaDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerFtCallback(
        requestBody: FtCallbackDTO,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/ft/callback',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns string
     * @throws ApiError
     */
    public static authControllerEnable(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/tfa/enable',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerActivate(
        requestBody: TfaDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/tfa/activate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static authControllerDisable(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/tfa/disable',
        });
    }

    /**
     * @param requestBody
     * @returns AccessTokenDTO
     * @throws ApiError
     */
    public static authControllerVerify(
        requestBody: TfaDTO,
    ): CancelablePromise<AccessTokenDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/tfa/verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns boolean
     * @throws ApiError
     */
    public static authControllerIsEnable(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/tfa/isActive',
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
