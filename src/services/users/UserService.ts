import { HttpClient } from '../../core/http';
import type { IUserService, User } from './IUserService';

export class UserService implements IUserService {
  constructor(private readonly http: HttpClient) {}

  getUsers(): Promise<User[]> {
    return this.http.get<User[]>('/users');
  }

  getUserById(id: number): Promise<User> {
    return this.http.get<User>(`/users/${id}`);
  }
}
