import { Box, ButtonGroup } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { Button } from 'src/stories/button/Button';

import { getLendersFn } from '../api/private';
import { QUERY_KEYS } from '../constants';
import { ILenderListResponse } from '../schemas/application';

interface LendersButtonGroupProps {
  onLenderSelected: (lenderId: number | null) => void;
}

export function LendersButtonGroup({ onLenderSelected }: LendersButtonGroupProps) {
  const t = useT();
  // Get the lenders from the API
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.lenders],
    queryFn: async (): Promise<ILenderListResponse | null> => {
      const response = await getLendersFn();
      return response;
    },
    retry: 1,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.detail) {
        enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(t('Error loading lenders'), {
          variant: 'error',
        });
      }
    },
  });

  return (
    <Box className="py-2 flex flex-col">
      <ButtonGroup className="rounded-none" variant="outlined" aria-label="lender selector">
        <Button
          className="bg-white text-moodyBlue font-medium"
          label={t('All FIs')}
          primary={false}
          noIcon
          onClick={() => onLenderSelected(null)}
        />
        {data?.items.map((lender) => (
          <Button
            className="bg-white text-darkest"
            key={lender.id}
            label={lender.name}
            primary={false}
            noIcon
            onClick={() => onLenderSelected(lender.id)}
          />
        ))}
      </ButtonGroup>
    </Box>
  );
}

export default LendersButtonGroup;
