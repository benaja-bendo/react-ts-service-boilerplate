export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface IUserService {
  getUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User>;
}
