import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from './routes';

const router = createBrowserRouter(appRoutes);

export const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};
