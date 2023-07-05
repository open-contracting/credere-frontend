/* eslint-disable no-console */
import { useQuery } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { getApplicationFn } from '../api/private';
import { DISPATCH_ACTIONS, QUERY_KEYS } from '../constants';
import { useParamsTypeSafe } from '../hooks/useParamsTypeSafe';
import useApplicationContext from '../hooks/useSecureApplicationContext';
import ApplicationErrorPage from '../pages/msme/ApplicationErrorPage';
import { IApplication } from '../schemas/application';
import Loader from '../stories/loader/Loader';
import PageLayout from './PageLayout';

export default function SecureApplicationLayout() {
  const t = useT();
  const navigate = useNavigate();
  const location = useLocation();
  const [queryError, setQueryError] = useState<string>('');
  const applicationContext = useApplicationContext();

  const { id } = useParamsTypeSafe(
    z.object({
      id: z.coerce.string(),
    }),
  );

  useEffect(() => {
    if (applicationContext.state.data) {
      const application = applicationContext.state.data;
      const { pathname } = location;
      const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
      console.log('application', application);
      console.log('lastSegment', lastSegment);

      // if (application.status === APPLICATION_STATUS.SUBMITTED) {
      //   if (lastSegment !== 'submission-completed') navigate('./submission-completed');
      // }
    }
  }, [applicationContext.state.data, navigate, location]);

  const { isLoading } = useQuery({
    queryKey: [QUERY_KEYS.applications_ocp, `${id}`],
    queryFn: async (): Promise<IApplication | null> => {
      const application = await getApplicationFn(id);
      applicationContext.dispatch({ type: DISPATCH_ACTIONS.SET_APPLICATION, payload: application });
      return application;
    },
    retry: 1,
    enabled: !!id,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.detail) {
        setQueryError(error.response.data.detail);
      } else {
        setQueryError(t('Error loading application'));
      }
    },
  });

  return (
    <PageLayout>
      {isLoading && <Loader />}
      {!isLoading && !queryError && <Outlet />}
      {queryError && <ApplicationErrorPage message={queryError} />}
    </PageLayout>
  );
}
