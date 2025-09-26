import { QueryClientProvider } from '@tanstack/react-query';
import type { JSX, PropsWithChildren } from 'react';
import { queryClient } from '../lib/queryClient';
import { ServicesProvider } from '../lib/services.context';

export const AppProviders = ({ children }: PropsWithChildren): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <ServicesProvider>{children}</ServicesProvider>
  </QueryClientProvider>
);
