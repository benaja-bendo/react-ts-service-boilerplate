import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import { env } from '../config/env';
import { HttpClient } from '../core/http';
import { createServices, type Services } from '../services';

const ServicesContext = createContext<Services | null>(null);

export const ServicesProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const services = useMemo(() => {
    const httpClient = HttpClient.fromConfig({ baseURL: env.apiUrl });
    return createServices(httpClient);
  }, []);

  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useServices = (): Services => {
  const services = useContext(ServicesContext);

  if (!services) {
    throw new Error('ServicesProvider is missing from the component tree.');
  }

  return services;
};
