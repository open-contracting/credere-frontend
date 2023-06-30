import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { updateBorrowerFn } from '../api/private';
import { QUERY_KEYS } from '../constants';
import { IApplication, IUpdateBorrower } from '../schemas/application';

type IUseUpdateBorrower = {
  updateBorrowerMutation: UseMutateFunction<IApplication, unknown, IUpdateBorrower, unknown>;
  isLoading: boolean;
};

export default function useUpdateBorrower(): IUseUpdateBorrower {
  const t = useT();

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updateBorrowerMutation, isLoading } = useMutation<IApplication, unknown, IUpdateBorrower, unknown>(
    (payload) => updateBorrowerFn(payload),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEYS.applications_ocp, `${data.id}`], data);
        enqueueSnackbar(t('Borrower Updated'), {
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
          enqueueSnackbar(t('Error updating borrower. {error}', { error }), {
            variant: 'error',
          });
        }
      },
    },
  );

  return { updateBorrowerMutation, isLoading };
}
