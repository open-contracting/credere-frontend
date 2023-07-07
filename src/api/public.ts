import {
  ApplicationBaseInput,
  ContractAmountInput,
  DeclineApplicationInput,
  DeclineFeedbackInput,
  GetCreditProductsOptionsInput,
  IApplicationCreditOptions,
  IApplicationResponse,
  IBorrowerDocument,
  ICreditProduct,
  SelectCreditProductInput,
  UploadContractInput,
  UploadFileInput,
} from '../schemas/application';
import { publicApi } from './axios';

export const applicationAccessSchemeFn = async (payload: ApplicationBaseInput) => {
  const response = await publicApi.post<IApplicationResponse>('applications/access-scheme', payload);
  return response.data;
};

export const declineApplicationFn = async (payload: DeclineApplicationInput) => {
  const response = await publicApi.post<IApplicationResponse>('applications/decline', payload);
  return response.data;
};

export const declineApplicationFeedbackFn = async (payload: DeclineFeedbackInput) => {
  const response = await publicApi.post<IApplicationResponse>('applications/decline-feedback', payload);
  return response.data;
};

export const declineApplicationRollbackFn = async (payload: ApplicationBaseInput) => {
  const response = await publicApi.post<IApplicationResponse>('applications/rollback-decline', payload);
  return response.data;
};

export const getApplicationFn = async (uuid: string) => {
  const response = await publicApi.get<IApplicationResponse>(`applications/uuid/${uuid}`);
  return response.data;
};

export const getCreditProductOptionsFn = async (payload: GetCreditProductsOptionsInput) => {
  const response = await publicApi.post<IApplicationCreditOptions>('applications/credit-product-options', payload);
  return response.data;
};

export const getCreditProductFn = async (id: string) => {
  const response = await publicApi.get<ICreditProduct>(`credit-products/${id}`);
  return response.data;
};

export const selectCreditProductFn = async (payload: SelectCreditProductInput) => {
  const response = await publicApi.post<IApplicationResponse>('applications/select-credit-product', payload);
  return response.data;
};

export const rollbackSelectCreditProductFn = async (payload: ApplicationBaseInput) => {
  const response = await publicApi.post<IApplicationResponse>('applications/rollback-select-credit-product', payload);
  return response.data;
};

export const confirmCreditProductFn = async (payload: ApplicationBaseInput) => {
  const response = await publicApi.post<IApplicationResponse>('applications/confirm-credit-product', payload);
  return response.data;
};

export const uploadFileFn = async (payload: UploadFileInput) => {
  const response = await publicApi.postForm<IBorrowerDocument>('applications/upload-document', payload);
  return response.data;
};

export const applicationSubmitFn = async (payload: ApplicationBaseInput) => {
  const response = await publicApi.post<IApplicationResponse>('applications/submit', payload);
  return response.data;
};

export const aditionalDataSubmitFn = async (payload: ApplicationBaseInput) => {
  const response = await publicApi.post<IApplicationResponse>('applications/complete-information-request', payload);
  return response.data;
};

export const uploadContractFn = async (payload: UploadContractInput) => {
  const response = await publicApi.postForm<IBorrowerDocument>('applications/upload-contract', payload);
  return response.data;
};

export const uploadContractConfirmationFn = async (payload: ContractAmountInput) => {
  const response = await publicApi.post<IApplicationResponse>('applications/confirm-upload-contract', payload);
  return response.data;
};
