import {
  ApplicationBaseInput,
  DeclineApplicationInput,
  DeclineFeedbackInput,
  IApplicationResponse,
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
