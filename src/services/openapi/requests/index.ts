/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { _2FA_DTO } from './models/_2FA_DTO';
export type { CancelFriendRequestDTO } from './models/CancelFriendRequestDTO';
export type { DuelAcceptDTO } from './models/DuelAcceptDTO';
export type { DuelInviteDTO } from './models/DuelInviteDTO';
export type { GameDTO } from './models/GameDTO';
export type { LeaderboardUserDTO } from './models/LeaderboardUserDTO';
export type { LoginDTO } from './models/LoginDTO';
export type { UserDTO } from './models/UserDTO';
export type { UserExpandedDTO } from './models/UserExpandedDTO';
export type { UserHistoryDTO } from './models/UserHistoryDTO';
export { UserStatusDTO } from './models/UserStatusDTO';

export { DefaultService } from './services/DefaultService';
export { FaService } from './services/FaService';
export { GamesService } from './services/GamesService';
export { UsersService } from './services/UsersService';
