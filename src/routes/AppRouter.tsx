import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import BaseLayout from '../layout/BaseLayout';
import PageLayout from '../layout/PageLayout';
import PublicApplicationLayout from '../layout/PublicApplicationLayout';
import PublicPageLayout from '../layout/PublicPageLayout';
import MuiTheme from '../mui-theme';
import App from '../pages/App';
import CreatePasswordPage from '../pages/CreatePasswordPage';
import Decline from '../pages/Decline';
import DeclineCompleted from '../pages/DeclineCompleted';
import DeclineFeedback from '../pages/DeclineFeedback';
import FrequentlyAskedQuestionsPage from '../pages/FrequentlyAskedQuestionsPage';
import IntroMsme from '../pages/IntroMsme';
import PasswordCreated from '../pages/PasswordCreated';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import RouterErrorPage from '../pages/RouterErrorPage';
import SelectLanguage from '../pages/SelectLanguage';
import SetupMFAPage from '../pages/SetupMFAPage';
import SignInPage from '../pages/SignInPage';
import SubmitionCompleted from '../pages/SubmitionCompleted';
import ViewCreditOptions from '../pages/ViewCreditOptions';
import ApplicationContextProvider from '../providers/ApplicationContextProvider';
import LangContextProvider from '../providers/LangContextProvider';
import StateContextProvider from '../providers/StateContextProvider';
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
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/login',
    element: (
      <BaseLayout>
        <SignInPage />
      </BaseLayout>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/create-password',
    element: (
      <BaseLayout>
        <CreatePasswordPage />
      </BaseLayout>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/setup-mfa/:secret/:session',
    element: (
      <BaseLayout>
        <SetupMFAPage />
      </BaseLayout>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/password-created/',
    element: (
      <PublicPageLayout>
        <PasswordCreated />
      </PublicPageLayout>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/reset-password',
    element: (
      <BaseLayout>
        <ResetPasswordPage />
      </BaseLayout>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/set-language',
    element: (
      <PublicPageLayout>
        <SelectLanguage />
      </PublicPageLayout>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/frequently-asked-questions',
    element: (
      <PublicPageLayout>
        <FrequentlyAskedQuestionsPage />
      </PublicPageLayout>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/application/:uuid',
    element: <PublicApplicationLayout />,
    children: [
      {
        path: 'intro',
        element: <IntroMsme />,
      },
      {
        path: 'credit-options',
        element: <ViewCreditOptions />,
      },
      {
        path: 'submition-completed',
        element: <SubmitionCompleted />,
      },
      {
        path: 'decline',
        element: <Decline />,
      },
      {
        path: 'decline-feedback',
        element: <DeclineFeedback />,
      },
      {
        path: 'decline-completed',
        element: <DeclineCompleted />,
      },
    ],
    errorElement: <RouterErrorPage />,
  },
]);

export function AppRouter() {
  return (
    <MuiTheme>
      <StateContextProvider>
        <LangContextProvider>
          <ApplicationContextProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ApplicationContextProvider>
        </LangContextProvider>
      </StateContextProvider>
    </MuiTheme>
  );
}

export default AppRouter;
