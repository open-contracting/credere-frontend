import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { uploadContractConfirmationFn } from '../api/public';
import { DISPATCH_ACTIONS, QUERY_KEYS } from '../constants';
import { ContractAmountInput, IApplicationResponse } from '../schemas/application';
import useApplicationContext from './useApplicationContext';

type IUseConfirmContractAmount = {
  confirmContractAmountMutation: UseMutateFunction<IApplicationResponse, unknown, ContractAmountInput, unknown>;
  isLoading: boolean;
};

export default function useConfirmContractAmount(): IUseConfirmContractAmount {
  const t = useT();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const applicationContext = useApplicationContext();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: confirmContractAmountMutation, isLoading } = useMutation<
    IApplicationResponse,
    unknown,
    ContractAmountInput,
    unknown
  >((payload) => uploadContractConfirmationFn(payload), {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.application_uuid, data.application.uuid], data);
      applicationContext.dispatch({ type: DISPATCH_ACTIONS.SET_APPLICATION, payload: data });
      navigate('../upload-contract-completed');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data && error.response.data.detail) {
          enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
            variant: 'error',
          });
        }
      } else {
        enqueueSnackbar(t('Error uploading contract. {error}', { error }), {
          variant: 'error',
        });
      }
    },
  });

  return { confirmContractAmountMutation, isLoading };
}
