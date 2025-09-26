import { createBrowserRouter, RouterProvider } from 'react-router';
import { appRoutes } from './routes';
import type { JSX } from 'react';

const router = createBrowserRouter(appRoutes);

export const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};
