/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelFriendRequestDTO } from '../models/CancelFriendRequestDTO';
import type { ChangeUsernameDTO } from '../models/ChangeUsernameDTO';
import type { LeaderboardUserDTO } from '../models/LeaderboardUserDTO';
import type { UserDTO } from '../models/UserDTO';
import type { UserExpandedDTO } from '../models/UserExpandedDTO';
import type { UserHistoryDTO } from '../models/UserHistoryDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @returns UserDTO
     * @throws ApiError
     */
    public static userControllerGetUsers(): CancelablePromise<Array<UserDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }

    /**
     * @param id
     * @returns UserDTO
     * @throws ApiError
     */
    public static userControllerGetUser(
        id: number,
    ): CancelablePromise<UserDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}/user',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns UserExpandedDTO
     * @throws ApiError
     */
    public static userControllerGetMe(): CancelablePromise<UserExpandedDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
        });
    }

    /**
     * @param requestBody
     * @returns UserDTO
     * @throws ApiError
     */
    public static userControllerChangeName(
        requestBody: ChangeUsernameDTO,
    ): CancelablePromise<UserDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/change-name',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * ------------------------------FRIENDS--------------------------
     * @returns UserDTO
     * @throws ApiError
     */
    public static userControllerGetFriends(): CancelablePromise<Array<UserDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/friends',
        });
    }

    /**
     * ------------------------------BLOCK--------------------------
     * @param blockedUserId
     * @returns any
     * @throws ApiError
     */
    public static userControllerUnblockUser(
        blockedUserId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/unblock-user/{blockedUserId}',
            path: {
                'blockedUserId': blockedUserId,
            },
        });
    }

    /**
     * ------------------------------FRIEND-REQUEST--------------------------
     * @returns UserDTO
     * @throws ApiError
     */
    public static userControllerGetPending(): CancelablePromise<Array<UserDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/pending',
        });
    }

    /**
     * @param id
     * @returns UserHistoryDTO
     * @throws ApiError
     */
    public static userControllerGetUserHistory(
        id: number,
    ): CancelablePromise<UserHistoryDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}/user/history',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns LeaderboardUserDTO
     * @throws ApiError
     */
    public static userControllerGetLeaderboard(): CancelablePromise<Array<LeaderboardUserDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/leaderboard',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static userControllerCancelFriendRequest(
        requestBody: CancelFriendRequestDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/friendRequest/cancel',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
