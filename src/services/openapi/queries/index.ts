// generated with @7nohe/openapi-react-query-codegen@0.5.1 
import { useQuery, useMutation, UseQueryResult, UseQueryOptions, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { LoginDTO } from "../requests/models/LoginDTO";
import { UsersService } from "../requests/services/UsersService";
import { DefaultService } from "../requests/services/DefaultService";
export const useUsersServiceUserControllerGetUsersKey = "UsersServiceUserControllerGetUsers";
export const useUsersServiceUserControllerGetUsers = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof UsersService.userControllerGetUsers>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UsersService.userControllerGetUsers>>, unknown, Awaited<ReturnType<typeof UsersService.userControllerGetUsers>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUsersServiceUserControllerGetUsersKey, ...(queryKey ?? [])], queryFn: () => UsersService.userControllerGetUsers(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof UsersService.userControllerGetUsers>>, TError>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerGetUserKey = "UsersServiceUserControllerGetUser";
export const useUsersServiceUserControllerGetUser = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof UsersService.userControllerGetUser>>, TError = unknown>({ id }: {
    id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UsersService.userControllerGetUser>>, unknown, Awaited<ReturnType<typeof UsersService.userControllerGetUser>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUsersServiceUserControllerGetUserKey, ...(queryKey ?? [{ id }])], queryFn: () => UsersService.userControllerGetUser(id), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof UsersService.userControllerGetUser>>, TError>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerChangeName = <TData = Awaited<ReturnType<typeof UsersService.userControllerChangeName>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.userControllerChangeName>>, unknown, {
    newName: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ newName }) => UsersService.userControllerChangeName(newName), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof UsersService.userControllerChangeName>>, TError, {
    newName: string;
}, TContext>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerGetFriendsKey = "UsersServiceUserControllerGetFriends";
export const useUsersServiceUserControllerGetFriends = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof UsersService.userControllerGetFriends>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UsersService.userControllerGetFriends>>, unknown, Awaited<ReturnType<typeof UsersService.userControllerGetFriends>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUsersServiceUserControllerGetFriendsKey, ...(queryKey ?? [])], queryFn: () => UsersService.userControllerGetFriends(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof UsersService.userControllerGetFriends>>, TError>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerAddFriend = <TData = Awaited<ReturnType<typeof UsersService.userControllerAddFriend>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.userControllerAddFriend>>, unknown, {
    friendId: number;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ friendId }) => UsersService.userControllerAddFriend(friendId), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof UsersService.userControllerAddFriend>>, TError, {
    friendId: number;
}, TContext>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerDeleteFriend = <TData = Awaited<ReturnType<typeof UsersService.userControllerDeleteFriend>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.userControllerDeleteFriend>>, unknown, {
    friendId: number;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ friendId }) => UsersService.userControllerDeleteFriend(friendId), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof UsersService.userControllerDeleteFriend>>, TError, {
    friendId: number;
}, TContext>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerBlockUser = <TData = Awaited<ReturnType<typeof UsersService.userControllerBlockUser>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.userControllerBlockUser>>, unknown, {
    blockedUserId: number;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ blockedUserId }) => UsersService.userControllerBlockUser(blockedUserId), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof UsersService.userControllerBlockUser>>, TError, {
    blockedUserId: number;
}, TContext>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerUnblockUser = <TData = Awaited<ReturnType<typeof UsersService.userControllerUnblockUser>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.userControllerUnblockUser>>, unknown, {
    blockedUserId: number;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ blockedUserId }) => UsersService.userControllerUnblockUser(blockedUserId), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof UsersService.userControllerUnblockUser>>, TError, {
    blockedUserId: number;
}, TContext>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerSendFriendRequest = <TData = Awaited<ReturnType<typeof UsersService.userControllerSendFriendRequest>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.userControllerSendFriendRequest>>, unknown, {
    friendId: number;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ friendId }) => UsersService.userControllerSendFriendRequest(friendId), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof UsersService.userControllerSendFriendRequest>>, TError, {
    friendId: number;
}, TContext>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerRefuseFriendRequest = <TData = Awaited<ReturnType<typeof UsersService.userControllerRefuseFriendRequest>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.userControllerRefuseFriendRequest>>, unknown, {
    friendId: number;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ friendId }) => UsersService.userControllerRefuseFriendRequest(friendId), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof UsersService.userControllerRefuseFriendRequest>>, TError, {
    friendId: number;
}, TContext>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerGetPendingKey = "UsersServiceUserControllerGetPending";
export const useUsersServiceUserControllerGetPending = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof UsersService.userControllerGetPending>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UsersService.userControllerGetPending>>, unknown, Awaited<ReturnType<typeof UsersService.userControllerGetPending>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUsersServiceUserControllerGetPendingKey, ...(queryKey ?? [])], queryFn: () => UsersService.userControllerGetPending(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof UsersService.userControllerGetPending>>, TError>, "data"> & {
    data: TData;
};
export const useDefaultServiceAppControllerGetProfileKey = "DefaultServiceAppControllerGetProfile";
export const useDefaultServiceAppControllerGetProfile = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof DefaultService.appControllerGetProfile>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DefaultService.appControllerGetProfile>>, unknown, Awaited<ReturnType<typeof DefaultService.appControllerGetProfile>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDefaultServiceAppControllerGetProfileKey, ...(queryKey ?? [])], queryFn: () => DefaultService.appControllerGetProfile(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof DefaultService.appControllerGetProfile>>, TError>, "data"> & {
    data: TData;
};
export const useDefaultServiceAuthControllerLogin = <TData = Awaited<ReturnType<typeof DefaultService.authControllerLogin>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DefaultService.authControllerLogin>>, unknown, {
    requestBody: LoginDTO;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => DefaultService.authControllerLogin(requestBody), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof DefaultService.authControllerLogin>>, TError, {
    requestBody: LoginDTO;
}, TContext>, "data"> & {
    data: TData;
};
export const useDefaultServiceAuthControllerHandleFtCallbackKey = "DefaultServiceAuthControllerHandleFtCallback";
export const useDefaultServiceAuthControllerHandleFtCallback = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof DefaultService.authControllerHandleFtCallback>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DefaultService.authControllerHandleFtCallback>>, unknown, Awaited<ReturnType<typeof DefaultService.authControllerHandleFtCallback>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDefaultServiceAuthControllerHandleFtCallbackKey, ...(queryKey ?? [])], queryFn: () => DefaultService.authControllerHandleFtCallback(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof DefaultService.authControllerHandleFtCallback>>, TError>, "data"> & {
    data: TData;
};
export const useDefaultServiceAuthControllerFtCallback = <TData = Awaited<ReturnType<typeof DefaultService.authControllerFtCallback>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DefaultService.authControllerFtCallback>>, unknown, void, unknown>, "mutationFn">) => useMutation({ mutationFn: () => DefaultService.authControllerFtCallback(), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof DefaultService.authControllerFtCallback>>, TError, void, TContext>, "data"> & {
    data: TData;
};
