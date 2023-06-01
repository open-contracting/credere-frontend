import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import BaseLayout from '../layout/BaseLayout';
import PageLayout from '../layout/PageLayout';
import PublicPageLayout from '../layout/PublicPageLayout';
import MuiTheme from '../mui-theme';
import App from '../pages/App';
import CreatePasswordPage from '../pages/CreatePasswordPage';
import PasswordCreated from '../pages/PasswordCreated';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import SelectLanguage from '../pages/SelectLanguage';
import SetupMFAPage from '../pages/SetupMFAPage';
import SignInPage from '../pages/SignInPage';
import LangContextProvider from '../providers/LangContextProvider';
import StateContextProvider from '../providers/StateContextProvider';
import ErrorPage from './ErrorPage';
import ProtectedRoute from './ProtectedRoute';

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <PageLayout>
          <App />
        </PageLayout>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: (
      <BaseLayout>
        <SignInPage />
      </BaseLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/create-password',
    element: (
      <BaseLayout>
        <CreatePasswordPage />
      </BaseLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/setup-mfa/:secret/:session',
    element: (
      <BaseLayout>
        <SetupMFAPage />
      </BaseLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/password-created/',
    element: (
      <PublicPageLayout>
        <PasswordCreated />
      </PublicPageLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/reset-password',
    element: (
      <BaseLayout>
        <ResetPasswordPage />
      </BaseLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/set-language',
    element: (
      <PublicPageLayout>
        <SelectLanguage />
      </PublicPageLayout>
    ),
    errorElement: <ErrorPage />,
  },
]);

export function AppRouter() {
  return (
    <MuiTheme>
      <StateContextProvider>
        <LangContextProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </LangContextProvider>
      </StateContextProvider>
    </MuiTheme>
  );
}

export default AppRouter;
