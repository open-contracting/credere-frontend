/* eslint-disable no-console */
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { resetPasswordFn } from '../api/auth';
import { IResponse, ResetPasswordInput } from '../schemas/auth';

type IUseResetPassword = {
  resetPasswordMutation: UseMutateFunction<IResponse, unknown, ResetPasswordInput, unknown>;
  isLoading: boolean;
};

export default function useResetPassword(): IUseResetPassword {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: resetPasswordMutation, isLoading } = useMutation<IResponse, unknown, ResetPasswordInput, unknown>(
    (payload) => resetPasswordFn(payload),
    {
      onSuccess: () => {
        enqueueSnackbar(`Check your email to continue`, {
          variant: 'info',
        });
        navigate('/login');
      },
      onError: (error) => {
        console.log(error);
        enqueueSnackbar(`Error trying to reset password. ${error}`, {
          variant: 'error',
        });
      },
    },
  );

  return { resetPasswordMutation, isLoading };
}