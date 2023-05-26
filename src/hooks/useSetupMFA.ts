/* eslint-disable no-console */
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { setupMFAFn } from '../api/auth';
import { IResponse, SetupMFAInput } from '../schemas/auth';

type IUseSetupMFA = {
  setupMFAMutation: UseMutateFunction<IResponse, unknown, SetupMFAInput, unknown>;
  isLoading: boolean;
};

export default function useSetupMFA(): IUseSetupMFA {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: setupMFAMutation, isLoading } = useMutation<IResponse, unknown, SetupMFAInput, unknown>(
    (payload) => setupMFAFn(payload),
    {
      onSuccess: (data) => {
        console.log(data);
        navigate(`/password-created`);
      },
      onError: (error) => {
        console.log(error);
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          enqueueSnackbar(`MFA code setup failed`, {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(`Error in setup MFA ${error}`, {
            variant: 'error',
          });
        }
      },
    },
  );

  return { setupMFAMutation, isLoading };
}
