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
import StageFive from 'src/pages/fi/StageFive';
import StageFour from 'src/pages/fi/StageFour';
import StageOne from 'src/pages/fi/StageOne';
import StageThree from 'src/pages/fi/StageThree';
import StageTwo from 'src/pages/fi/StageTwo';
import Decline from 'src/pages/msme/Decline';
import DeclineCompleted from 'src/pages/msme/DeclineCompleted';
import DeclineFeedback from 'src/pages/msme/DeclineFeedback';
import FrequentlyAskedQuestionsPage from 'src/pages/msme/FrequentlyAskedQuestionsPage';
import IntroMsme from 'src/pages/msme/IntroMsme';
import SubmissionCompleted from 'src/pages/msme/SubmissionCompleted';
import ViewCreditOptions from 'src/pages/msme/ViewCreditOptions';
import { LoadUser, UserForm } from 'src/pages/ocp/UserForm';
import ApplicationContextProvider from 'src/providers/ApplicationContextProvider';
import LangContextProvider from 'src/providers/LangContextProvider';
import SecureApplicationContextProvider from 'src/providers/SecureApplicationContextProvider';
import StateContextProvider from 'src/providers/StateContextProvider';
import ProtectedRoute from 'src/routes/ProtectedRoute';

import PageLayout from '../layout/PageLayout';
import SecureApplicationLayout from '../layout/SecureApplicationLayout';
import ApplicationCompleted from '../pages/fi/ApplicationCompleted';
import ReviewContract from '../pages/fi/ReviewContract';
import StageFiveApproved from '../pages/fi/StageFiveApproved';
import StageFiveRejected from '../pages/fi/StageFiveRejected';
import ViewApplication from '../pages/fi/ViewApplication';
import ConfirmCreditProduct from '../pages/msme/ConfirmCreditProduct';
import UploadContract from '../pages/msme/UploadContract';
import UploadContractCompleted from '../pages/msme/UploadContractCompleted';
import UploadDocuments from '../pages/msme/UploadDocuments';
import { LoadApplication } from '../pages/ocp/ApplicationDetail';
import Applications from '../pages/ocp/Applications';
import { LoadCreditProduct } from '../pages/ocp/CreditProductForm';
import { LenderForm, LoadLender } from '../pages/ocp/LenderForm';
import Settings from '../pages/ocp/Settings';

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1 minute
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
    path: '/admin/applications/:id/view',
    element: (
      <ProtectedRoute>
        <PageLayout>
          <LoadApplication readonly />
        </PageLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/admin/applications/:id/update',
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
    path: '/settings/user/new',
    element: (
      <ProtectedRoute>
        <PageLayout>
          <UserForm />
        </PageLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/settings/user/:id/edit',
    element: (
      <ProtectedRoute>
        <PageLayout>
          <LoadUser />
        </PageLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/settings/lender/:lenderId/credit-product/new',
    element: (
      <ProtectedRoute>
        <PageLayout>
          <LoadCreditProduct />
        </PageLayout>
      </ProtectedRoute>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '/settings/lender/:lenderId/credit-product/:id/edit',
    element: (
      <ProtectedRoute>
        <PageLayout>
          <LoadCreditProduct />
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
        path: 'confirm-credit-product',
        element: <ConfirmCreditProduct />,
      },
      {
        path: 'documents',
        element: <UploadDocuments />,
      },
      {
        path: 'upload-contract',
        element: <UploadContract />,
      },
      {
        path: 'upload-contract-completed',
        element: <UploadContractCompleted />,
      },
      {
        path: 'submission-completed',
        element: <SubmissionCompleted />,
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
  {
    path: '/applications/:id',
    element: <SecureApplicationLayout />,
    children: [
      {
        path: 'view',
        element: <ViewApplication />,
      },
      {
        path: 'stage-one',
        element: <StageOne />,
      },
      {
        path: 'stage-two',
        element: <StageTwo />,
      },
      {
        path: 'stage-three',
        element: <StageThree />,
      },
      {
        path: 'stage-four',
        element: <StageFour />,
      },
      {
        path: 'stage-five',
        element: <StageFive />,
      },
      {
        path: 'stage-five-approved',
        element: <StageFiveApproved />,
      },
      {
        path: 'stage-five-rejected',
        element: <StageFiveRejected />,
      },
      {
        path: 'complete-application',
        element: <ReviewContract />,
      },
      {
        path: 'application-completed',
        element: <ApplicationCompleted />,
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
          <SecureApplicationContextProvider>
            <ApplicationContextProvider>
              <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </ApplicationContextProvider>
          </SecureApplicationContextProvider>
        </LangContextProvider>
      </StateContextProvider>
    </MuiTheme>
  );
}

export default AppRouter;
