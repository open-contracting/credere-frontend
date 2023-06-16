import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { ILoginResponse } from '../schemas/auth';
import { getAccessToken, removeUser, saveAccessToken } from './localstore';

interface RetryConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}

export const globalConfig: RetryConfig = {
  retry: 0,
  retryDelay: 1000,
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const setHeaderFromLocalStorage = () => {
  const token = getAccessToken();
  if (token && token !== 'undefined' && globalConfig.headers) {
    globalConfig.headers.Authorization = `${token}`; // `Bearer ${token)}`;
  }
};

setHeaderFromLocalStorage(); // set header token from local storage on first load

export const authApi = axios.create(globalConfig);

export const refreshAccessTokenFn = async () => {
  const response = await authApi.get<ILoginResponse>('users/refresh');
  return response.data;
};

export const setAccessTokenToHeaders = (accessToken: string | null) => {
  if (!accessToken) {
    removeUser();
    return;
  }

  saveAccessToken(accessToken);
  authApi.interceptors.request.use(
    (config) => {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${accessToken}`; // `Bearer ${token)}`;
      return config;
    },
    (error) => Promise.reject(error),
  );
};

authApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig;

    if (!config) {
      return Promise.reject(error);
    }

    const delayRetryRequest = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, config.retryDelay || 1000);
    });

    if (error.request.status === 401) {
      const url = document.location.href.replace(document.location.origin, '');

      if (!config.retry && url !== '/login') {
        document.location.href = '/login';
        return Promise.reject(error);
      }
    }

    if (!config.retry) {
      return Promise.reject(error);
    }

    config.retry -= 1;
    return delayRetryRequest.then(() => authApi(config));
  },
);

export const publicApi = axios.create(globalConfig);
