import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';
import { createAxiosInstance } from './axios';

export interface HttpRequestConfig extends AxiosRequestConfig {
  headers?: RawAxiosRequestHeaders;
}

export class HttpClient {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  static fromConfig(config?: HttpRequestConfig): HttpClient {
    const instance = createAxiosInstance(config);
    return new HttpClient(instance);
  }

  async get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  async post<T, D = unknown>(url: string, data?: D, config?: HttpRequestConfig): Promise<T> {
    const response = await this.instance.post<T, AxiosResponse<T>, D>(url, data, config);
    return response.data;
  }

  async put<T, D = unknown>(url: string, data?: D, config?: HttpRequestConfig): Promise<T> {
    const response = await this.instance.put<T, AxiosResponse<T>, D>(url, data, config);
    return response.data;
  }

  async patch<T, D = unknown>(url: string, data?: D, config?: HttpRequestConfig): Promise<T> {
    const response = await this.instance.patch<T, AxiosResponse<T>, D>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
}
