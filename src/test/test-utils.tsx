/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { RouterProvider, createMemoryRouter, type RouteObject } from 'react-router';
import { ServicesProvider } from '../lib/services.context';

export const createTestQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

interface ProvidersProps {
  queryClient: QueryClient;
}

const Providers = ({ children, queryClient }: PropsWithChildren<ProvidersProps>) => (
  <QueryClientProvider client={queryClient}>
    <ServicesProvider>{children}</ServicesProvider>
  </QueryClientProvider>
);

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

export const renderWithProviders = (
  ui: ReactElement,
  { queryClient = createTestQueryClient(), ...options }: ExtendedRenderOptions = {},
) => {
  const result = render(ui, {
    wrapper: ({ children }) => <Providers queryClient={queryClient}>{children}</Providers>,
    ...options,
  });

  return { ...result, queryClient };
};

interface RenderWithRouterOptions {
  initialEntries?: string[];
  queryClient?: QueryClient;
}

export const renderWithRouter = (
  routes: RouteObject[],
  { initialEntries, queryClient = createTestQueryClient() }: RenderWithRouterOptions = {},
) => {
  const router = createMemoryRouter(routes, { initialEntries });
  const result = render(
    <Providers queryClient={queryClient}>
      <RouterProvider router={router} />
    </Providers>,
  );

  return { ...result, router, queryClient };
};

export const createHookWrapper = (queryClient: QueryClient = createTestQueryClient()) => {
  return ({ children }: PropsWithChildren) => (
    <Providers queryClient={queryClient}>{children}</Providers>
  );
};
