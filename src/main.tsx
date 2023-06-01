import { tx } from '@transifex/native';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { getLang } from './api/localstore';
import './index.css';
import { AppRouter } from './routes/AppRouter';

const renderApp = () => {
  const rootElement = document.getElementById('root-app');
  ReactDOM.createRoot(rootElement as HTMLElement).render(
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>,
  );
};

tx.init({ token: import.meta.env.VITE_TRANSIFEX_TOKEN });
tx.setCurrentLocale(`${getLang() || import.meta.env.VITE_DEFAULT_LANG || 'es'}`).then(
  () => {
    renderApp();
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    renderApp();
  },
);
