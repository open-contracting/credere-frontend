import { tx } from '@transifex/native';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { AppRouter } from './routes/AppRouter';

tx.init({ token: import.meta.env.VITE_TRANSIFEX_TOKEN });
tx.setCurrentLocale('en');
const rootElement = document.getElementById('root-app');

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);
