import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getMeFn } from '../api/auth';
import { getUser, removeUser, saveUser } from '../api/localstore';
import { QUERY_KEYS } from '../constants';
import { IUser } from '../schemas/auth';
import useStateContext from './useStateContext';

export default function useUser(): IUser | null {
  const stateContext = useStateContext();

  const { data: user } = useQuery<IUser | null>(
    [QUERY_KEYS.user],
    async (): Promise<IUser | null> => {
      try {
        const response = await getMeFn();
        stateContext.dispatch({ type: 'SET_USER', payload: response.user });
        return response.user;
      } catch {
        return Promise.resolve(null);
      }
    },
    {
      enabled: stateContext.state.user !== null,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: getUser(),
      onError: () => {
        removeUser();
      },
    },
  );

  useEffect(() => {
    if (!user) removeUser();
    else saveUser(user);
  }, [user]);

  return user || null;
}
