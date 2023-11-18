/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static userControllerGetUsers(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static userControllerGetUser(
        id: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}/user',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param newName
     * @returns any
     * @throws ApiError
     */
    public static userControllerChangeName(
        newName: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/change-name/{newName}',
            path: {
                'newName': newName,
            },
        });
    }

    /**
     * ------------------------------FRIENDS--------------------------
     * @returns any
     * @throws ApiError
     */
    public static userControllerGetFriends(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/friends',
        });
    }

    /**
     * @param friendId
     * @returns any
     * @throws ApiError
     */
    public static userControllerAddFriend(
        friendId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/add-friend/{friendId}',
            path: {
                'friendId': friendId,
            },
        });
    }

    /**
     * @param friendId
     * @returns any
     * @throws ApiError
     */
    public static userControllerDeleteFriend(
        friendId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/delete-friend/{friendId}',
            path: {
                'friendId': friendId,
            },
        });
    }

    /**
     * ------------------------------BLOCK--------------------------
     * @param blockedUserId
     * @returns any
     * @throws ApiError
     */
    public static userControllerBlockUser(
        blockedUserId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/block-user/{blockedUserId}',
            path: {
                'blockedUserId': blockedUserId,
            },
        });
    }

    /**
     * @param blockedUserId
     * @returns any
     * @throws ApiError
     */
    public static userControllerUnblockUser(
        blockedUserId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/unblock-user/{blockedUserId}',
            path: {
                'blockedUserId': blockedUserId,
            },
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static userControllerGetBlocked(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}/blocked',
            path: {
                'id': id,
            },
        });
    }

    /**
     * ------------------------------FRIEND-REQUEST--------------------------
     * @param friendId
     * @returns any
     * @throws ApiError
     */
    public static userControllerSendFriendRequest(
        friendId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/send-friend-request/{friendId}',
            path: {
                'friendId': friendId,
            },
        });
    }

    /**
     * @param friendId
     * @returns any
     * @throws ApiError
     */
    public static userControllerRefuseFriendRequest(
        friendId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/refuse-friend-request/{friendId}',
            path: {
                'friendId': friendId,
            },
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static userControllerGetPending(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/pending',
        });
    }

}
