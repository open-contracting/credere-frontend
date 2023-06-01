import { useT } from '@transifex/react';
import React from 'react';

import { StateContext } from '../providers/StateContextProvider';

const useStateContext = () => {
  const context = React.useContext(StateContext);
  const t = useT();

  if (context) {
    return context;
  }

  throw new Error(t('useStateContext must be used within a StateContextProvider'));
};

export default useStateContext;
