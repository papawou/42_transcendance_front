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
     * @param id
     * @param newName
     * @returns any
     * @throws ApiError
     */
    public static userControllerChangeName(
        id: string,
        newName: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/{id}/change-name/{newName}',
            path: {
                'id': id,
                'newName': newName,
            },
        });
    }

    /**
     * ------------------------------FRIENDS--------------------------
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static userControllerGetFriends(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}/friends',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param friendId
     * @returns any
     * @throws ApiError
     */
    public static userControllerAddFriend(
        id: string,
        friendId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/{id}/add-friend/{friendId}',
            path: {
                'id': id,
                'friendId': friendId,
            },
        });
    }

    /**
     * @param id
     * @param friendId
     * @returns any
     * @throws ApiError
     */
    public static userControllerDeleteFriend(
        id: string,
        friendId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/{id}/delete-friend/{friendId}',
            path: {
                'id': id,
                'friendId': friendId,
            },
        });
    }

    /**
     * ------------------------------BLOCK--------------------------
     * @param id
     * @param blockedUserId
     * @returns any
     * @throws ApiError
     */
    public static userControllerBlockUser(
        id: string,
        blockedUserId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/{id}/block-user/{blockedUserId}',
            path: {
                'id': id,
                'blockedUserId': blockedUserId,
            },
        });
    }

    /**
     * @param id
     * @param blockedUserId
     * @returns any
     * @throws ApiError
     */
    public static userControllerUnblockUser(
        id: string,
        blockedUserId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/{id}/unblock-user/{blockedUserId}',
            path: {
                'id': id,
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
     * @param id
     * @param friendId
     * @returns any
     * @throws ApiError
     */
    public static userControllerSendFriendRequest(
        id: string,
        friendId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/{id}/send-friend-request/{friendId}',
            path: {
                'id': id,
                'friendId': friendId,
            },
        });
    }

    /**
     * @param id
     * @param friendId
     * @returns any
     * @throws ApiError
     */
    public static userControllerRefuseFriendRequest(
        id: string,
        friendId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/{id}/refuse-friend-request/{friendId}',
            path: {
                'id': id,
                'friendId': friendId,
            },
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static userControllerGetPending(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}/pending',
            path: {
                'id': id,
            },
        });
    }

}
