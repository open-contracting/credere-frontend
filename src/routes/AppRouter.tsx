import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BaseLayout from 'src/layout/BaseLayout';
import PublicApplicationLayout from 'src/layout/PublicApplicationLayout';
import PublicPageLayout from 'src/layout/PublicPageLayout';
import MuiTheme from 'src/mui-theme';
import AppHome from 'src/pages/AppHome';
import RouterErrorPage from 'src/pages/RouterErrorPage';
import SelectLanguage from 'src/pages/SelectLanguage';
import CreatePasswordPage from 'src/pages/auth/CreatePasswordPage';
import PasswordCreated from 'src/pages/auth/PasswordCreated';
import ResetPasswordPage from 'src/pages/auth/ResetPasswordPage';
import SetupMFAPage from 'src/pages/auth/SetupMFAPage';
import SignInPage from 'src/pages/auth/SignInPage';
import Decline from 'src/pages/msme/Decline';
import DeclineCompleted from 'src/pages/msme/DeclineCompleted';
import DeclineFeedback from 'src/pages/msme/DeclineFeedback';
import FrequentlyAskedQuestionsPage from 'src/pages/msme/FrequentlyAskedQuestionsPage';
import IntroMsme from 'src/pages/msme/IntroMsme';
import SubmitionCompleted from 'src/pages/msme/SubmitionCompleted';
import ViewCreditOptions from 'src/pages/msme/ViewCreditOptions';
import ApplicationContextProvider from 'src/providers/ApplicationContextProvider';
import LangContextProvider from 'src/providers/LangContextProvider';
import StateContextProvider from 'src/providers/StateContextProvider';
import ProtectedRoute from 'src/routes/ProtectedRoute';

import PageLayout from '../layout/PageLayout';
import { LoadApplication } from '../pages/ocp/ApplicationDetail';
import Applications from '../pages/ocp/Applications';
import { LenderForm, LoadLender } from '../pages/ocp/LenderForm';
import Settings from '../pages/ocp/Settings';

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
          <AppHome />
        </PageLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/admin/applications',
    element: (
      <ProtectedRoute>
        <PageLayout>
          <Applications />
        </PageLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/admin/applications/:id/detail',
    element: (
      <ProtectedRoute>
        <PageLayout>
          <LoadApplication />
        </PageLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <PageLayout>
          <Settings />
        </PageLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/settings/lender/new',
    element: (
      <ProtectedRoute>
        <PageLayout>
          <LenderForm />
        </PageLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/settings/lender/:id/edit',
    element: (
      <ProtectedRoute>
        <PageLayout>
          <LoadLender />
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
