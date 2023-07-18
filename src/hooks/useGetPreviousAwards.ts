import { useQuery } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import { useSnackbar } from 'notistack';

import { getPreviousAwardsFn } from '../api/private';
import { QUERY_KEYS } from '../constants';
import { IAward } from '../schemas/application';
import { handleRequestError } from '../util/validation';

type IUseGetPreviousAwards = {
  data?: IAward[];
  isLoading: boolean;
};

export default function useGetPreviousAwards(applicationId?: number): IUseGetPreviousAwards {
  const t = useT();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading } = useQuery<IAward[]>({
    queryKey: [QUERY_KEYS.awards, `${applicationId}`],
    queryFn: () => getPreviousAwardsFn(Number(applicationId)),
    enabled: Boolean(applicationId),
    onSuccess: (dataResult) => dataResult,
    onError: (error) => {
      handleRequestError(error, enqueueSnackbar, t('Error getting previous awards. {error}', { error }));
    },
  });

  return { data, isLoading };
}
