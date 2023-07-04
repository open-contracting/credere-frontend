/* eslint-disable camelcase */
import {
  IApplication,
  IApplicationsListResponse,
  ICreateUserBase,
  ICreditProduct,
  ICreditProductBase,
  ICreditProductUpdate,
  ILender,
  ILenderBase,
  ILenderListResponse,
  ILenderUpdate,
  IUpdateAward,
  IUpdateBorrower,
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

export const getApplicationFn = async (id: string) => {
  const response = await authApi.get<IApplication>(`applications/id/${id}`);
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

export const updateAwardFn = async (awardData: IUpdateAward) => {
  const { application_id, ...payload } = awardData;
  const response = await authApi.put<IApplication>(`applications/${application_id}/award`, payload);
  return response.data;
};

export const updateBorrowerFn = async (awardData: IUpdateBorrower) => {
  const { application_id, ...payload } = awardData;
  const response = await authApi.put<IApplication>(`applications/${application_id}/borrower`, payload);
  return response.data;
};

export const updateLenderFn = async (payload: ILenderUpdate) => {
  const response = await authApi.put<ILender>(`lenders/${payload.id}`, payload);
  return response.data;
};

export const getCreditProductFn = async (id: string) => {
  const response = await authApi.get<ICreditProduct>(`credit-products/${id}`);
  return response.data;
};

export const createCreditProductFn = async (payload: ICreditProductBase) => {
  const response = await authApi.post<ICreditProduct>(`lenders/${payload.lender_id}/credit-products`, payload);
  return response.data;
};

export const updateCreditProductFn = async (payload: ICreditProductUpdate) => {
  const response = await authApi.put<ICreditProduct>(`credit-products/${payload.id}`, payload);
  return response.data;
};

export const createUserFn = async (payload: ICreateUserBase) => {
  const response = await authApi.post<ICreateUserBase>(`users`, payload);
  return response.data;
};
