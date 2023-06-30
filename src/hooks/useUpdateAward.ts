import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { updateAwardFn } from '../api/private';
import { QUERY_KEYS } from '../constants';
import { IApplication, IUpdateAward } from '../schemas/application';

type IUseUpdateAward = {
  updateAwardMutation: UseMutateFunction<IApplication, unknown, IUpdateAward, unknown>;
  isLoading: boolean;
};

export default function useUpdateAward(): IUseUpdateAward {
  const t = useT();

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updateAwardMutation, isLoading } = useMutation<IApplication, unknown, IUpdateAward, unknown>(
    (payload) => updateAwardFn(payload),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEYS.applications_ocp, `${data.id}`], data);
        enqueueSnackbar(t('Award Updated'), {
          variant: 'success',
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.data && error.response.data.detail) {
            enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
              variant: 'error',
            });
          }
        } else {
          enqueueSnackbar(t('Error updating award. {error}', { error }), {
            variant: 'error',
          });
        }
      },
    },
  );

  return { updateAwardMutation, isLoading };
}
