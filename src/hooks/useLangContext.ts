import { useT } from '@transifex/react';
import React from 'react';

import { LangContext } from '../providers/LangContextProvider';

const useLangContext = () => {
  const context = React.useContext(LangContext);
  const t = useT();

  if (context) {
    return context;
  }

  throw new Error(t('useLangContext must be used within a LangContextProvider'));
};

export default useLangContext;
