import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { AppRouter } from './routes/AppRouter';

const rootElement = document.getElementById('root-app');

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);
