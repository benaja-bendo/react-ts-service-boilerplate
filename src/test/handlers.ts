import { http, HttpResponse } from 'msw';
import type { AuthCredentials, AuthSession } from '../services/auth/IAuthService';
import type { User } from '../services/users/IUserService';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    username: 'alice',
    email: 'alice@example.com',
  },
  {
    id: 2,
    name: 'Bob Smith',
    username: 'bob',
    email: 'bob@example.com',
  },
];

export const validCredentials: AuthCredentials = {
  email: 'user@example.com',
  password: 'password123',
};

export const mockSession: AuthSession = {
  token: 'token-123',
  userId: 1,
};

export const handlers = [
  http.get('*/users', () => {
    return HttpResponse.json(mockUsers);
  }),
  http.get('*/users/:userId', ({ params }) => {
    const userId = Number.parseInt(params.userId as string, 10);
    const user = mockUsers.find((item) => item.id === userId);

    if (!user) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return HttpResponse.json(user);
  }),
  http.post('*/login', async ({ request }) => {
    const credentials = (await request.json()) as AuthCredentials;

    if (
      credentials.email === validCredentials.email &&
      credentials.password === validCredentials.password
    ) {
      return HttpResponse.json(mockSession);
    }

    return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }),
];
