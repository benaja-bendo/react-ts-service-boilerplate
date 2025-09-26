import type { RouteObject } from 'react-router';
import { UsersList } from '../features/users/UsersList';
import { UserDetails } from '../features/users/UserDetails';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <UsersList />,
  },
  {
    path: '/users/:userId',
    element: <UserDetails />,
  },
  {
    path: '*',
    element: <p>Page not found.</p>,
  },
];
