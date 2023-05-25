import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutUserFn } from '../api/auth';
import { setAccessTokenToHeaders } from '../api/axios';
import { DISPATCH_ACTIONS, QUERY_KEYS } from '../constants';
import useStateContext from './useStateContext';

type IUseSignOut = () => void;

export default function useSignOut(): IUseSignOut {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const stateContext = useStateContext();

  const onSignOut = useCallback(async () => {
    await logoutUserFn();
    queryClient.setQueryData([QUERY_KEYS.user], null);
    stateContext.dispatch({ type: DISPATCH_ACTIONS.SET_USER, payload: null });
    setAccessTokenToHeaders(null);
    navigate('/login');
  }, [navigate, queryClient, stateContext]);

  return onSignOut;
}
