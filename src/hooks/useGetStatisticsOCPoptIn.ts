import { useQuery } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import { useSnackbar } from 'notistack';

import { getStatisticsOCPoptIn } from '../api/private';
import { QUERY_KEYS } from '../constants';
import { StatisticsOCPoptIn } from '../schemas/statitics';
import { handleRequestError } from '../util/validation';

type IUseGetStatisticsOCPoptIn = {
  data?: StatisticsOCPoptIn;
  isLoading: boolean;
};

export default function useGetStatisticsOCPoptIn(): IUseGetStatisticsOCPoptIn {
  const t = useT();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading } = useQuery<StatisticsOCPoptIn>({
    queryKey: [QUERY_KEYS.statistics_ocp_opt_in],
    queryFn: () => getStatisticsOCPoptIn(),
    onSuccess: (dataResult) => dataResult,
    onError: (error) => {
      handleRequestError(error, enqueueSnackbar, t('Error getting statistics opt-in . {error}', { error }));
    },
  });

  return { data, isLoading };
}
