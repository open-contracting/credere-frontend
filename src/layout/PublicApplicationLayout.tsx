/* eslint-disable no-console */
import { useQuery } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { getApplicationFn } from '../api/public';
import { APPLICATION_STATUS, DISPATCH_ACTIONS, QUERY_KEYS } from '../constants';
import useApplicationContext from '../hooks/useApplicationContext';
import { useParamsTypeSafe } from '../hooks/useParamsTypeSafe';
import ApplicationErrorPage from '../pages/msme/ApplicationErrorPage';
import { IApplication } from '../schemas/application';
import Loader from '../stories/loader/Loader';
import PublicPageLayout from './PublicPageLayout';

export default function PublicApplicationLayout() {
  const t = useT();
  const navigate = useNavigate();
  const location = useLocation();
  const [queryError, setQueryError] = useState<string>('');
  const applicationContext = useApplicationContext();
  const { uuid } = useParamsTypeSafe(
    z.object({
      uuid: z.coerce.string(),
    }),
  );

  useEffect(() => {
    if (applicationContext.state.data) {
      const { application } = applicationContext.state.data;
      const { pathname } = location;
      const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
      if (lastSegment === 'change-primary-email') return;
      if (application.status === APPLICATION_STATUS.CONTRACT_UPLOADED) {
        if (lastSegment !== 'upload-contract-completed') {
          navigate('./upload-contract-completed');
        }
      } else if (application.status === APPLICATION_STATUS.APPROVED) {
        if (lastSegment !== 'upload-contract' && !application.contract_amount_submitted) {
          navigate('./upload-contract');
        } else if (lastSegment !== 'upload-contract-completed' && application.contract_amount_submitted) {
          navigate('./upload-contract-completed');
        }
      } else if (
        application.status === APPLICATION_STATUS.SUBMITTED ||
        application.status === APPLICATION_STATUS.STARTED
      ) {
        if (lastSegment !== 'submission-completed') navigate('./submission-completed');
      } else if (application.pending_documents || application.status === APPLICATION_STATUS.INFORMATION_REQUESTED) {
        if (lastSegment !== 'documents') navigate('./documents');
      } else if (application.credit_product_id && !application.lender_id) {
        if (lastSegment !== 'confirm-credit-product' && lastSegment !== 'submission-completed')
          navigate('./confirm-credit-product');
      } else if (application.borrower_accepted_at) {
        if (lastSegment !== 'credit-options' && lastSegment !== 'submission-completed') navigate('./credit-options');
      } else if (!application.borrower_accepted_at && !application.borrower_declined_at) {
        if (lastSegment !== 'intro' && lastSegment !== 'decline') navigate('./intro');
      } else if (
        application.borrower_declined_at &&
        Object.keys(application.borrower_declined_preferences_data).length === 0
      ) {
        if (lastSegment !== 'decline-feedback') navigate('./decline-feedback');
      } else if (
        application.borrower_declined_at &&
        Object.keys(application.borrower_declined_preferences_data).length > 0
      ) {
        if (lastSegment !== 'decline-completed') navigate('./decline-completed');
      }
    }
  }, [applicationContext.state.data, navigate, location]);

  const { isLoading } = useQuery({
    queryKey: [QUERY_KEYS.application_uuid, `${uuid}`],
    queryFn: async (): Promise<IApplication | null> => {
      const response = await getApplicationFn(uuid);
      applicationContext.dispatch({ type: DISPATCH_ACTIONS.SET_APPLICATION, payload: response });
      return response.application;
    },
    retry: 1,
    enabled: !!uuid,
    onError: (error) => {
      console.log('error', error);
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.detail) {
        setQueryError(error.response.data.detail);
      } else {
        setQueryError(t('Invalid link'));
      }
    },
  });

  return (
    <PublicPageLayout>
      {isLoading && <Loader />}
      {!isLoading && !queryError && <Outlet />}
      {queryError && <ApplicationErrorPage message={queryError} />}
    </PublicPageLayout>
  );
}
