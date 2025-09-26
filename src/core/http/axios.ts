import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export const createAxiosInstance = (
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });

  return instance;
};
