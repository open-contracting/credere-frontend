import { Box, Collapse } from '@mui/material';
import { useT } from '@transifex/react';
import { useState } from 'react';

import CheckGreen from '../assets/icons/check-green.svg';
import WarnRed from '../assets/icons/warn-red.svg';
import Text from '../stories/text/Text';

const getIcon = (available: boolean, name: string) => {
  let icon = CheckGreen;

  if (!available) {
    icon = WarnRed;
  }

  return <img className="self-start" src={icon} alt={`icon-availabily-${name}`} />;
};

interface DataAvailabilityProps {
  available: boolean;
  name: string;
  readonly: boolean;
}

export function DataAvailability({ available, name, readonly }: DataAvailabilityProps) {
  const t = useT();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  if (available || readonly) {
    return (
      <Box className="py-2 flex flex-row">
        {getIcon(available, name)}

        <Text fontVariant className="ml-3 mb-0 text-sm">
          {available ? t('Yes') : t('Data missing')}
        </Text>
      </Box>
    );
  }
  return (
    <Box className="py-2 flex flex-col">
      <Box className="flex flex-row">
        <Box
          className="flex flex-col self-start"
          sx={{
            pt: '2px',
          }}>
          {getIcon(available, name)}
        </Box>
        <Box className="flex flex-col">
          <Text fontVariant className="ml-3 mb-0 text-sm">
            {t('Data missing')}
          </Text>

          <Box className="flex flex-col align-top" onClick={handleToggle}>
            <Text fontVariant className="ml-3 mb-0 mt-1 text-red text-sm">
              {open ? '↑ ' : '↓ '}
              {t('More information')}
            </Text>
            <Collapse in={open}>
              <Text fontVariant className="ml-3 mt-4 text-sm">
                {t(
                  'Data for the {fieldName} for the SME is not available. Confirm manually through SECOP or alternative source.',
                  { fieldName: name },
                )}
              </Text>
            </Collapse>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DataAvailability;
