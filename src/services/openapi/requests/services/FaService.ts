/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TfaDTO } from '../models/TfaDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FaService {

    /**
     * @returns string
     * @throws ApiError
     */
    public static tfaControllerEnable(): CancelablePromise<string> {
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
    public static tfaControllerActivate(
        requestBody: TfaDTO,
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
    public static tfaControllerDisable(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/2fa/disable',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static tfaControllerVerify(
        requestBody: TfaDTO,
    ): CancelablePromise<any> {
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
    public static tfaControllerIsEnable(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/2fa/isEnable',
        });
    }

}
