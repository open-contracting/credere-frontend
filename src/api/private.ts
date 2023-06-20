import {
  IApplicationsListResponse,
  ILender,
  ILenderBase,
  ILenderListResponse,
  ILenderUpdate,
  PaginationInput,
} from '../schemas/application';
import { authApi } from './axios';

export const getApplicationsOCP = async (payload: PaginationInput) => {
  const response = await authApi.get<IApplicationsListResponse>('applications/admin-list', { params: payload });
  return response.data;
};

export const getApplicationsFI = async (payload: PaginationInput) => {
  const response = await authApi.get<IApplicationsListResponse>('applications', { params: payload });
  return response.data;
};

export const getLenderFn = async (id: string) => {
  const response = await authApi.get<ILender>(`lenders/${id}`);
  return response.data;
};

export const getLendersFn = async () => {
  const response = await authApi.get<ILenderListResponse>('lenders');
  return response.data;
};

export const createLenderFn = async (payload: ILenderBase) => {
  const response = await authApi.post<ILender>('lenders', payload);
  return response.data;
};

export const updateLenderFn = async (payload: ILenderUpdate) => {
  const response = await authApi.put<ILender>(`lenders/${payload.id}`, payload);
  return response.data;
};
