import { useQueryClient } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutUserFn } from '../api/auth';
import { setAccessTokenToHeaders } from '../api/axios';
import { DISPATCH_ACTIONS, QUERY_KEYS } from '../constants';
import useStateContext from './useStateContext';

type IUseSignOut = () => void;

export default function useSignOut(): IUseSignOut {
  const t = useT();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const stateContext = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const onSignOut = useCallback(async () => {
    try {
      await logoutUserFn();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      enqueueSnackbar(t('Error on logout {error}', error), {
        variant: 'error',
      });
    } finally {
      queryClient.setQueryData([QUERY_KEYS.user], null);
      stateContext.dispatch({ type: DISPATCH_ACTIONS.SET_USER, payload: null });
      setAccessTokenToHeaders(null);
      navigate('/login');
    }
  }, [enqueueSnackbar, navigate, queryClient, stateContext, t]);

  return onSignOut;
}
