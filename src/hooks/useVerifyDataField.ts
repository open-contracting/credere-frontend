import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { verifyDataFieldFn } from '../api/private';
import { QUERY_KEYS } from '../constants';
import { IApplication, IUpdateBorrower } from '../schemas/application';

type IUseUpdateBorrower = {
  verifyDataFieldMutation: UseMutateFunction<IApplication, unknown, IUpdateBorrower, unknown>;
  isLoading: boolean;
};

export default function useVerifyDataField(): IUseUpdateBorrower {
  const t = useT();

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: verifyDataFieldMutation, isLoading } = useMutation<IApplication, unknown, IUpdateBorrower, unknown>(
    (payload) => verifyDataFieldFn(payload),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEYS.applications, `${data.id}`], data);
        enqueueSnackbar(t('Verification state updated'), {
          variant: 'info',
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
          enqueueSnackbar(t('Error verifying data field. {error}', { error }), {
            variant: 'error',
          });
        }
      },
    },
  );

  return { verifyDataFieldMutation, isLoading };
}
