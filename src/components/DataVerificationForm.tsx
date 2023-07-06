/* eslint-disable react/jsx-props-no-spreading */
import { Box } from '@mui/material';

import { Switch } from '../stories/switch/Switch';

interface DataVerificationFormProps {
  name: string;
  value: boolean;
  readonly: boolean;
  verifyData: (value: boolean) => void;
  isLoading: boolean;
}

export function DataVerificationForm({ name, value, isLoading, readonly, verifyData }: DataVerificationFormProps) {
  return (
    <Box className="py-2 flex flex-col">
      <Box className="flex flex-col align-top">
        <Box className="flex flex-col pr-4 align-top justify-end">
          <Switch
            fieldError={undefined}
            disabled={isLoading || readonly}
            name={name}
            label=""
            defaultValue={value}
            onChange={(_event, checked) => verifyData(checked)}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DataVerificationForm;
