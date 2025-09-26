export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'https://jsonplaceholder.typicode.com',
};

export type EnvConfig = typeof env;
