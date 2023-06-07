import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { declineApplicationFn } from '../api/public';
import { DISPATCH_ACTIONS, QUERY_KEYS } from '../constants';
import { DeclineApplicationInput, IApplicationResponse } from '../schemas/application';
import useApplicationContext from './useApplicationContext';

type IUseDeclineApplication = {
  declineApplicationMutation: UseMutateFunction<IApplicationResponse, unknown, DeclineApplicationInput, unknown>;
  isLoading: boolean;
};

export default function useDeclineApplication(): IUseDeclineApplication {
  const t = useT();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const applicationContext = useApplicationContext();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: declineApplicationMutation, isLoading } = useMutation<
    IApplicationResponse,
    unknown,
    DeclineApplicationInput,
    unknown
  >((payload) => declineApplicationFn(payload), {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.application, data.application.uuid], data);
      applicationContext.dispatch({ type: DISPATCH_ACTIONS.SET_APPLICATION, payload: data });
      navigate('../decline-feedback');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data && error.response.data.detail) {
          enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
            variant: 'error',
          });
        }
      } else {
        enqueueSnackbar(t('Error declining the application. {error}', { error }), {
          variant: 'error',
        });
      }
    },
  });

  return { declineApplicationMutation, isLoading };
}
