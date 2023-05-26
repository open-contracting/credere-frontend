/* eslint-disable no-console */
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { updatePasswordFn } from '../api/auth';
import { IUpdatePasswordResponse, UpdatePasswordPayload } from '../schemas/auth';

type IUseUpdatePassword = UseMutateFunction<IUpdatePasswordResponse, unknown, UpdatePasswordPayload, unknown>;

export default function useUpdatePassword(): IUseUpdatePassword {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updatePasswordMutation } = useMutation<
    IUpdatePasswordResponse,
    unknown,
    UpdatePasswordPayload,
    unknown
  >((payload) => updatePasswordFn(payload), {
    onSuccess: (data) => {
      navigate(`/setup-mfa/${data.secret_code}/${data.session}?username=${data.username}`);
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar(`Error on update password. ${error}`, {
        variant: 'error',
      });
    },
  });

  return updatePasswordMutation;
}
