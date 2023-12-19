/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _2FA_DTO } from '../models/_2FA_DTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FaService {

    /**
     * @returns string
     * @throws ApiError
     */
    public static faControllerEnable(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/2fa/enable',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static faControllerActivate(
        requestBody: _2FA_DTO,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/2fa/activate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns boolean
     * @throws ApiError
     */
    public static faControllerDisable(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/2fa/disable',
        });
    }

    /**
     * @param requestBody
     * @returns boolean
     * @throws ApiError
     */
    public static faControllerVerify(
        requestBody: _2FA_DTO,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/2fa/verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns boolean
     * @throws ApiError
     */
    public static faControllerIsEnable(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/2fa/isEnable',
        });
    }

}
