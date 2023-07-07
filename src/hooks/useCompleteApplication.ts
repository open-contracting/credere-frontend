import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { completeApplicationFn } from '../api/private';
import { DISPATCH_ACTIONS, QUERY_KEYS } from '../constants';
import { CompleteApplicationInput, IApplication } from '../schemas/application';
import useApplicationContext from './useSecureApplicationContext';

type IUseCompleteApplication = {
  completeApplicationMutation: UseMutateFunction<IApplication, unknown, CompleteApplicationInput, unknown>;
  isLoading: boolean;
};

export default function useCompleteApplication(): IUseCompleteApplication {
  const t = useT();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const applicationContext = useApplicationContext();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: completeApplicationMutation, isLoading } = useMutation<
    IApplication,
    unknown,
    CompleteApplicationInput,
    unknown
  >((payload) => completeApplicationFn(payload), {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.applications, data.id], data);
      applicationContext.dispatch({ type: DISPATCH_ACTIONS.SET_APPLICATION, payload: data });
      navigate('../application-completed');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data && error.response.data.detail) {
          enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
            variant: 'error',
          });
        }
      } else {
        enqueueSnackbar(t('Error completing the application. {error}', { error }), {
          variant: 'error',
        });
      }
    },
  });

  return { completeApplicationMutation, isLoading };
}
