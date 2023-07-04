import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { createUserFn } from '../api/private';
import { ICreateUserBase } from '../schemas/application';

type ICreateUser = {
  registerUserMutation: UseMutateFunction<unknown, unknown, ICreateUserBase, unknown>;
  isLoading: boolean;
};

export default function useRegisterUser(): ICreateUser {
  const t = useT();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  // const stateContext = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: registerUserMutation, isLoading } = useMutation<unknown, unknown, ICreateUserBase, unknown>(
    (payload) => {
      console.log('payload', payload);
      return createUserFn(payload);
    },
    {
      onSuccess: (data) => {
        console.log('data', data);
        navigate('/settings');
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          if (error.response.data && error.response.data.detail) {
            enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
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

  return { registerUserMutation, isLoading };
}
