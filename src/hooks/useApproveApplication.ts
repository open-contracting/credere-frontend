import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { approveApplicationFn } from '../api/private';
import { DISPATCH_ACTIONS, ERRORS_MESSAGES, QUERY_KEYS } from '../constants';
import { ApproveApplicationInput, IApplication } from '../schemas/application';
import useApplicationContext from './useSecureApplicationContext';

type IUseApproveApplication = {
  approveApplicationMutation: UseMutateFunction<IApplication, unknown, ApproveApplicationInput, unknown>;
  isLoading: boolean;
  isError: boolean;
};

export default function useApproveApplication(): IUseApproveApplication {
  const t = useT();

  const queryClient = useQueryClient();
  const applicationContext = useApplicationContext();
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: approveApplicationMutation,
    isError,
    isLoading,
  } = useMutation<IApplication, unknown, ApproveApplicationInput, unknown>((payload) => approveApplicationFn(payload), {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.applications, data.id], data);
      applicationContext.dispatch({ type: DISPATCH_ACTIONS.SET_APPLICATION, payload: data });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data && error.response.data.detail) {
          if (ERRORS_MESSAGES[error.response.data.detail]) {
            enqueueSnackbar(t(ERRORS_MESSAGES[error.response.data.detail]), {
              variant: 'error',
            });
          } else {
            enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
              variant: 'error',
            });
          }
        }
      } else {
        enqueueSnackbar(t('Error approving the application. {error}', { error }), {
          variant: 'error',
        });
      }
    },
  });

  return { approveApplicationMutation, isLoading, isError };
}
