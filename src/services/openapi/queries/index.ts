// generated with @7nohe/openapi-react-query-codegen@0.5.1 
import { useQuery, useMutation, UseQueryResult, UseQueryOptions, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { UserStatusDTO } from "../requests/models/UserStatusDTO";
import { UserHistoryDTO } from "../requests/models/UserHistoryDTO";
import { UserExpandedDTO } from "../requests/models/UserExpandedDTO";
import { UserDTO } from "../requests/models/UserDTO";
import { TfaDTO } from "../requests/models/TfaDTO";
import { LeaderboardUserDTO } from "../requests/models/LeaderboardUserDTO";
import { GameDTO } from "../requests/models/GameDTO";
import { FtCallbackDTO } from "../requests/models/FtCallbackDTO";
import { DuelInviteDTO } from "../requests/models/DuelInviteDTO";
import { DuelAcceptDTO } from "../requests/models/DuelAcceptDTO";
import { CancelFriendRequestDTO } from "../requests/models/CancelFriendRequestDTO";
import { AccessTokenDTO } from "../requests/models/AccessTokenDTO";
import { UsersService } from "../requests/services/UsersService";
import { GamesService } from "../requests/services/GamesService";
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
export const useUsersServiceUserControllerGetMeKey = "UsersServiceUserControllerGetMe";
export const useUsersServiceUserControllerGetMe = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof UsersService.userControllerGetMe>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UsersService.userControllerGetMe>>, unknown, Awaited<ReturnType<typeof UsersService.userControllerGetMe>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUsersServiceUserControllerGetMeKey, ...(queryKey ?? [])], queryFn: () => UsersService.userControllerGetMe(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof UsersService.userControllerGetMe>>, TError>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerGetUserStatusKey = "UsersServiceUserControllerGetUserStatus";
export const useUsersServiceUserControllerGetUserStatus = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof UsersService.userControllerGetUserStatus>>, TError = unknown>({ id }: {
    id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UsersService.userControllerGetUserStatus>>, unknown, Awaited<ReturnType<typeof UsersService.userControllerGetUserStatus>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUsersServiceUserControllerGetUserStatusKey, ...(queryKey ?? [{ id }])], queryFn: () => UsersService.userControllerGetUserStatus(id), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof UsersService.userControllerGetUserStatus>>, TError>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerChangeName = <TData = Awaited<ReturnType<typeof UsersService.userControllerChangeName>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.userControllerChangeName>>, unknown, {
    newName: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ newName }) => UsersService.userControllerChangeName(newName), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof UsersService.userControllerChangeName>>, TError, {
    newName: string;
}, TContext>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerChangeAvatar = <TData = Awaited<ReturnType<typeof UsersService.userControllerChangeAvatar>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.userControllerChangeAvatar>>, unknown, void, unknown>, "mutationFn">) => useMutation({ mutationFn: () => UsersService.userControllerChangeAvatar(), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof UsersService.userControllerChangeAvatar>>, TError, void, TContext>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerGetFriendsKey = "UsersServiceUserControllerGetFriends";
export const useUsersServiceUserControllerGetFriends = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof UsersService.userControllerGetFriends>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UsersService.userControllerGetFriends>>, unknown, Awaited<ReturnType<typeof UsersService.userControllerGetFriends>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUsersServiceUserControllerGetFriendsKey, ...(queryKey ?? [])], queryFn: () => UsersService.userControllerGetFriends(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof UsersService.userControllerGetFriends>>, TError>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerUnblockUser = <TData = Awaited<ReturnType<typeof UsersService.userControllerUnblockUser>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.userControllerUnblockUser>>, unknown, {
    blockedUserId: number;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ blockedUserId }) => UsersService.userControllerUnblockUser(blockedUserId), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof UsersService.userControllerUnblockUser>>, TError, {
    blockedUserId: number;
}, TContext>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerGetPendingKey = "UsersServiceUserControllerGetPending";
export const useUsersServiceUserControllerGetPending = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof UsersService.userControllerGetPending>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UsersService.userControllerGetPending>>, unknown, Awaited<ReturnType<typeof UsersService.userControllerGetPending>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUsersServiceUserControllerGetPendingKey, ...(queryKey ?? [])], queryFn: () => UsersService.userControllerGetPending(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof UsersService.userControllerGetPending>>, TError>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerGetUserHistoryKey = "UsersServiceUserControllerGetUserHistory";
export const useUsersServiceUserControllerGetUserHistory = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof UsersService.userControllerGetUserHistory>>, TError = unknown>({ id }: {
    id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UsersService.userControllerGetUserHistory>>, unknown, Awaited<ReturnType<typeof UsersService.userControllerGetUserHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUsersServiceUserControllerGetUserHistoryKey, ...(queryKey ?? [{ id }])], queryFn: () => UsersService.userControllerGetUserHistory(id), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof UsersService.userControllerGetUserHistory>>, TError>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerGetLeaderboardKey = "UsersServiceUserControllerGetLeaderboard";
export const useUsersServiceUserControllerGetLeaderboard = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof UsersService.userControllerGetLeaderboard>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UsersService.userControllerGetLeaderboard>>, unknown, Awaited<ReturnType<typeof UsersService.userControllerGetLeaderboard>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUsersServiceUserControllerGetLeaderboardKey, ...(queryKey ?? [])], queryFn: () => UsersService.userControllerGetLeaderboard(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof UsersService.userControllerGetLeaderboard>>, TError>, "data"> & {
    data: TData;
};
export const useUsersServiceUserControllerCancelFriendRequest = <TData = Awaited<ReturnType<typeof UsersService.userControllerCancelFriendRequest>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UsersService.userControllerCancelFriendRequest>>, unknown, {
    requestBody: CancelFriendRequestDTO;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UsersService.userControllerCancelFriendRequest(requestBody), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof UsersService.userControllerCancelFriendRequest>>, TError, {
    requestBody: CancelFriendRequestDTO;
}, TContext>, "data"> & {
    data: TData;
};
export const useGamesServiceGameControllerDuelInvite = <TData = Awaited<ReturnType<typeof GamesService.gameControllerDuelInvite>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof GamesService.gameControllerDuelInvite>>, unknown, {
    requestBody: DuelInviteDTO;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => GamesService.gameControllerDuelInvite(requestBody), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof GamesService.gameControllerDuelInvite>>, TError, {
    requestBody: DuelInviteDTO;
}, TContext>, "data"> & {
    data: TData;
};
export const useGamesServiceGameControllerDuelAccept = <TData = Awaited<ReturnType<typeof GamesService.gameControllerDuelAccept>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof GamesService.gameControllerDuelAccept>>, unknown, {
    requestBody: DuelAcceptDTO;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => GamesService.gameControllerDuelAccept(requestBody), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof GamesService.gameControllerDuelAccept>>, TError, {
    requestBody: DuelAcceptDTO;
}, TContext>, "data"> & {
    data: TData;
};
export const useGamesServiceGameControllerSearch = <TData = Awaited<ReturnType<typeof GamesService.gameControllerSearch>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof GamesService.gameControllerSearch>>, unknown, void, unknown>, "mutationFn">) => useMutation({ mutationFn: () => GamesService.gameControllerSearch(), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof GamesService.gameControllerSearch>>, TError, void, TContext>, "data"> & {
    data: TData;
};
export const useGamesServiceGameControllerSearchCancel = <TData = Awaited<ReturnType<typeof GamesService.gameControllerSearchCancel>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof GamesService.gameControllerSearchCancel>>, unknown, void, unknown>, "mutationFn">) => useMutation({ mutationFn: () => GamesService.gameControllerSearchCancel(), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof GamesService.gameControllerSearchCancel>>, TError, void, TContext>, "data"> & {
    data: TData;
};
export const useDefaultServiceAuthControllerFtCallback = <TData = Awaited<ReturnType<typeof DefaultService.authControllerFtCallback>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DefaultService.authControllerFtCallback>>, unknown, {
    requestBody: FtCallbackDTO;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => DefaultService.authControllerFtCallback(requestBody), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof DefaultService.authControllerFtCallback>>, TError, {
    requestBody: FtCallbackDTO;
}, TContext>, "data"> & {
    data: TData;
};
export const useDefaultServiceAuthControllerEnable = <TData = Awaited<ReturnType<typeof DefaultService.authControllerEnable>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DefaultService.authControllerEnable>>, unknown, void, unknown>, "mutationFn">) => useMutation({ mutationFn: () => DefaultService.authControllerEnable(), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof DefaultService.authControllerEnable>>, TError, void, TContext>, "data"> & {
    data: TData;
};
export const useDefaultServiceAuthControllerActivate = <TData = Awaited<ReturnType<typeof DefaultService.authControllerActivate>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DefaultService.authControllerActivate>>, unknown, {
    requestBody: TfaDTO;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => DefaultService.authControllerActivate(requestBody), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof DefaultService.authControllerActivate>>, TError, {
    requestBody: TfaDTO;
}, TContext>, "data"> & {
    data: TData;
};
export const useDefaultServiceAuthControllerDisable = <TData = Awaited<ReturnType<typeof DefaultService.authControllerDisable>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DefaultService.authControllerDisable>>, unknown, void, unknown>, "mutationFn">) => useMutation({ mutationFn: () => DefaultService.authControllerDisable(), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof DefaultService.authControllerDisable>>, TError, void, TContext>, "data"> & {
    data: TData;
};
export const useDefaultServiceAuthControllerVerify = <TData = Awaited<ReturnType<typeof DefaultService.authControllerVerify>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DefaultService.authControllerVerify>>, unknown, {
    requestBody: TfaDTO;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => DefaultService.authControllerVerify(requestBody), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof DefaultService.authControllerVerify>>, TError, {
    requestBody: TfaDTO;
}, TContext>, "data"> & {
    data: TData;
};
export const useDefaultServiceAuthControllerIsEnable = <TData = Awaited<ReturnType<typeof DefaultService.authControllerIsEnable>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DefaultService.authControllerIsEnable>>, unknown, void, unknown>, "mutationFn">) => useMutation({ mutationFn: () => DefaultService.authControllerIsEnable(), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof DefaultService.authControllerIsEnable>>, TError, void, TContext>, "data"> & {
    data: TData;
};
export const useDefaultServiceChatControllerGetRoomsFromUserKey = "DefaultServiceChatControllerGetRoomsFromUser";
export const useDefaultServiceChatControllerGetRoomsFromUser = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof DefaultService.chatControllerGetRoomsFromUser>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DefaultService.chatControllerGetRoomsFromUser>>, unknown, Awaited<ReturnType<typeof DefaultService.chatControllerGetRoomsFromUser>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDefaultServiceChatControllerGetRoomsFromUserKey, ...(queryKey ?? [])], queryFn: () => DefaultService.chatControllerGetRoomsFromUser(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof DefaultService.chatControllerGetRoomsFromUser>>, TError>, "data"> & {
    data: TData;
};
export const useDefaultServiceChatControllerGetPMsFromUserKey = "DefaultServiceChatControllerGetPMsFromUser";
export const useDefaultServiceChatControllerGetPMsFromUser = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof DefaultService.chatControllerGetPMsFromUser>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DefaultService.chatControllerGetPMsFromUser>>, unknown, Awaited<ReturnType<typeof DefaultService.chatControllerGetPMsFromUser>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDefaultServiceChatControllerGetPMsFromUserKey, ...(queryKey ?? [])], queryFn: () => DefaultService.chatControllerGetPMsFromUser(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof DefaultService.chatControllerGetPMsFromUser>>, TError>, "data"> & {
    data: TData;
};
export const useDefaultServiceChatControllerGetBlockedUsersKey = "DefaultServiceChatControllerGetBlockedUsers";
export const useDefaultServiceChatControllerGetBlockedUsers = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof DefaultService.chatControllerGetBlockedUsers>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DefaultService.chatControllerGetBlockedUsers>>, unknown, Awaited<ReturnType<typeof DefaultService.chatControllerGetBlockedUsers>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDefaultServiceChatControllerGetBlockedUsersKey, ...(queryKey ?? [])], queryFn: () => DefaultService.chatControllerGetBlockedUsers(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof DefaultService.chatControllerGetBlockedUsers>>, TError>, "data"> & {
    data: TData;
};
export const useDefaultServiceChatControllerGetAllPublicRoomsKey = "DefaultServiceChatControllerGetAllPublicRooms";
export const useDefaultServiceChatControllerGetAllPublicRooms = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof DefaultService.chatControllerGetAllPublicRooms>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DefaultService.chatControllerGetAllPublicRooms>>, unknown, Awaited<ReturnType<typeof DefaultService.chatControllerGetAllPublicRooms>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDefaultServiceChatControllerGetAllPublicRoomsKey, ...(queryKey ?? [])], queryFn: () => DefaultService.chatControllerGetAllPublicRooms(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof DefaultService.chatControllerGetAllPublicRooms>>, TError>, "data"> & {
    data: TData;
};
