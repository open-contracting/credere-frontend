import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { declineApplicationFeedbackFn } from '../api/public';
import { DISPATCH_ACTIONS, QUERY_KEYS } from '../constants';
import { DeclineFeedbackInput, IApplicationResponse } from '../schemas/application';
import useApplicationContext from './useApplicationContext';

type IUseDeclineFeedbackApplication = {
  declineFeedbackMutation: UseMutateFunction<IApplicationResponse, unknown, DeclineFeedbackInput, unknown>;
  isLoading: boolean;
};

export default function useDeclineFeedbackApplication(): IUseDeclineFeedbackApplication {
  const t = useT();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const applicationContext = useApplicationContext();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: declineFeedbackMutation, isLoading } = useMutation<
    IApplicationResponse,
    unknown,
    DeclineFeedbackInput,
    unknown
  >((payload) => declineApplicationFeedbackFn(payload), {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.application, data.application.uuid], data);
      applicationContext.dispatch({ type: DISPATCH_ACTIONS.SET_APPLICATION, payload: data });
      navigate('../decline-completed');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data && error.response.data.detail) {
          enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
            variant: 'error',
          });
        }
      } else {
        enqueueSnackbar(t('Error on the decline feedback. {error}', { error }), {
          variant: 'error',
        });
      }
    },
  });

  return { declineFeedbackMutation, isLoading };
}
