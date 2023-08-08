import { useQuery } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { getApplicationFn } from '../api/private';
import { APPLICATION_STATUS, DISPATCH_ACTIONS, QUERY_KEYS } from '../constants';
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

  const { isLoading, data } = useQuery({
    queryKey: [QUERY_KEYS.applications, `${id}`],
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

  useEffect(() => {
    if (data) {
      const application = data;
      const { pathname } = location;
      const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);

      if (lastSegment !== 'view') {
        if (application.status === APPLICATION_STATUS.APPROVED) {
          if (lastSegment !== 'stage-five-approved') navigate('./stage-five-approved');
        } else if (application.status === APPLICATION_STATUS.REJECTED) {
          if (lastSegment !== 'stage-five-rejected') navigate('./stage-five-rejected');
        }
      }
    }
  }, [data, navigate, location]);

  return (
    <PageLayout>
      {isLoading && <Loader />}
      {!isLoading && !queryError && <Outlet />}
      {queryError && <ApplicationErrorPage message={queryError} />}
    </PageLayout>
  );
}
