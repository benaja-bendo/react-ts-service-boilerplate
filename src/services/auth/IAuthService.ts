import type { Result } from '../../core/types/result';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthSession {
  token: string;
  userId: number;
}

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<Result<AuthSession>>;
  logout(): Promise<void>;
}
