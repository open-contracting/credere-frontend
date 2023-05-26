import { ACCESS_TOKEN_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from '../constants';
import { IUser } from '../schemas/auth';

export function saveUser(user: IUser): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

export function saveAccessToken(accessToken: string): void {
  localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, accessToken);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
}

export function getUser(): IUser | undefined {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : undefined;
}

export function removeUser(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
}
