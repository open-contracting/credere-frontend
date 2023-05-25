import React from 'react';

import { DISPATCH_ACTIONS } from '../constants';
import { IUser } from '../schemas/auth';

type State = {
  authUser: IUser | null;
};

type Action = {
  type: string;
  payload: IUser | null;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  authUser: null,
};

type StateContextProviderProps = { children: React.ReactNode };

export const StateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case DISPATCH_ACTIONS.SET_USER: {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

export function StateContextProvider({ children }: StateContextProviderProps) {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);

  const value = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
}

export default StateContextProvider;
