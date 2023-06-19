import { IApplicationsListResponse, PaginationInput } from '../schemas/application';
import { authApi } from './axios';

export const getApplicationsOCP = async (payload: PaginationInput) => {
  const response = await authApi.get<IApplicationsListResponse>('applications/admin-list', { params: payload });
  return response.data;
};

export const getApplicationsFI = async (payload: PaginationInput) => {
  const response = await authApi.get<IApplicationsListResponse>('applications', { params: payload });
  return response.data;
};
