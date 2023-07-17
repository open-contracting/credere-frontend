import { useQuery } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import { useSnackbar } from 'notistack';

import { getStatisticsFI } from '../api/private';
import { QUERY_KEYS } from '../constants';
import { StatisticsFI } from '../schemas/statitics';
import { handleRequestError } from '../util/validation';

type IUseGetStatisticsFI = {
  data?: StatisticsFI;
  isLoading: boolean;
};

export default function useGetStatisticsFI(): IUseGetStatisticsFI {
  const t = useT();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading } = useQuery<StatisticsFI>({
    queryKey: [QUERY_KEYS.statistics_fi],
    queryFn: () => getStatisticsFI(),
    onSuccess: (dataResult) => dataResult,
    onError: (error) => {
      handleRequestError(error, enqueueSnackbar, t('Error getting statistics for fi. {error}', { error }));
    },
  });

  return { data, isLoading };
}
