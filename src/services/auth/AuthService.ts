import { failure, success, type Result } from '../../core/types/result';
import { HttpClient } from '../../core/http';
import type { AuthCredentials, AuthSession, IAuthService } from './IAuthService';

export class AuthService implements IAuthService {
  constructor(private readonly http: HttpClient) {}

  async login(credentials: AuthCredentials): Promise<Result<AuthSession>> {
    try {
      const response = await this.http.post<AuthSession, AuthCredentials>('/login', credentials);
      return success(response);
    } catch (error) {
      return failure(error as Error);
    }
  }

  async logout(): Promise<void> {
    await Promise.resolve();
  }
}
