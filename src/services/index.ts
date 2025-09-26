import { HttpClient } from '../core/http';
import { AuthService } from './auth/AuthService';
import type { IAuthService } from './auth/IAuthService';
import { UserService } from './users/UserService';
import type { IUserService } from './users/IUserService';

export interface Services {
  authService: IAuthService;
  userService: IUserService;
}

export const createServices = (httpClient: HttpClient): Services => ({
  authService: new AuthService(httpClient),
  userService: new UserService(httpClient),
});

export type { IAuthService } from './auth/IAuthService';
export type { IUserService } from './users/IUserService';
