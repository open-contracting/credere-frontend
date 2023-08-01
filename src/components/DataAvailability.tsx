import { Box, Collapse } from '@mui/material';
import { useT } from '@transifex/react';
import { useState } from 'react';

import CheckGreen from '../assets/icons/check-green.svg';
import WarnRed from '../assets/icons/warn-red.svg';
import { IModifiedDataFields } from '../schemas/application';
import Text from '../stories/text/Text';
import { formatDateFromString } from '../util';

const getIcon = (available: boolean, name: string) => {
  let icon = CheckGreen;

  if (!available) {
    icon = WarnRed;
  }

  return <img className="self-start" src={icon} alt={`icon-availabily-${name}`} />;
};

interface DataAvailabilityProps {
  available: boolean;
  name?: string;
  label: string;
  readonly: boolean;
  modifiedFields?: { [key: string]: IModifiedDataFields };
}

export function DataAvailability({ available, name, label, readonly, modifiedFields }: DataAvailabilityProps) {
  const t = useT();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const modified = modifiedFields && name ? modifiedFields[name] : undefined;

  if (available || readonly) {
    return (
      <Box className="py-2 flex flex-row">
        {getIcon(available, label)}

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
          {getIcon(available, label)}
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
                {!modified
                  ? t(
                      'Data for the {fieldName} for the SME is not available. Confirm manually through SECOP or alternative source.',
                      { fieldName: label },
                    )
                  : t(
                      'Data for the {fieldName} was not available, but completed by {userType} user {userName} on {modifiedDate}.',
                      {
                        fieldName: label,
                        userType: modified.user_type,
                        userName: modified.user,
                        modifiedDate: formatDateFromString(modified.modified_at),
                      },
                    )}
              </Text>
            </Collapse>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

DataAvailability.defaultProps = {
  modifiedFields: undefined,
  name: undefined,
};

export default DataAvailability;
