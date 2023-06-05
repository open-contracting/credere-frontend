 
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { loginMFAUserFn } from '../api/auth';
import { setAccessTokenToHeaders } from '../api/axios';
import { DISPATCH_ACTIONS, QUERY_KEYS } from '../constants';
import { ILoginResponse, LoginInput } from '../schemas/auth';
import useStateContext from './useStateContext';

type IUseSignIn = {
  signInMutation: UseMutateFunction<ILoginResponse, unknown, LoginInput, unknown>;
  isLoading: boolean;
};

export default function useSignIn(): IUseSignIn {
  const t = useT();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const stateContext = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: signInMutation, isLoading } = useMutation<ILoginResponse, unknown, LoginInput, unknown>(
    (payload) => loginMFAUserFn(payload),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEYS.user], data.user);
        stateContext.dispatch({ type: DISPATCH_ACTIONS.SET_USER, payload: data.user });
        setAccessTokenToHeaders(data.access_token);
        navigate('/');
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          if (error.response.data && error.response.data.message) {
            enqueueSnackbar(t('Error: {error}', { error: error.response.data.message }), {
              variant: 'error',
            });
          } else {
            enqueueSnackbar(t('Invalid credentials'), {
              variant: 'error',
            });
          }
        } else {
          enqueueSnackbar(t('Error on sign in. {error}', { error }), {
            variant: 'error',
          });
        }
      },
    },
  );

  return { signInMutation, isLoading };
}
