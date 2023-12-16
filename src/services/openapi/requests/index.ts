/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { DuelAcceptDTO } from './models/DuelAcceptDTO';
export type { DuelInviteDTO } from './models/DuelInviteDTO';
export type { GameDTO } from './models/GameDTO';
export type { LoginDTO } from './models/LoginDTO';
export type { UserDTO } from './models/UserDTO';
export type { UserHistoryDTO } from './models/UserHistoryDTO';

export { DefaultService } from './services/DefaultService';
export { GamesService } from './services/GamesService';
export { UsersService } from './services/UsersService';
