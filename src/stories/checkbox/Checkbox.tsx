/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormControlLabel, FormHelperText, Checkbox as MUICheckbox, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import Checked from '../../assets/icons/check-checked.svg';
import NotChecked from '../../assets/icons/check-empty.svg';

export type CheckboxProps = {
  name: string;
  label: string;
  className?: string;
  defaultValue?: boolean;
};

export function Checkbox({ name, label, defaultValue = false, className }: CheckboxProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth sx={{ mb: '8px' }}>
          <FormControlLabel
            sx={{ alignItems: 'flex-start' }}
            control={
              <MUICheckbox
                sx={{ px: '10px', py: '2px', ':hover': { backgroundColor: 'transparent' } }}
                icon={<img className="mb-0.5" src={NotChecked} alt="check-icon-empty" />}
                checkedIcon={<img className="mb-0.5" src={Checked} alt="check-icon-checked" />}
                {...field}
              />
            }
            label={
              <Typography variant="body1" className={twMerge(`text-darkest text-lg ${className}`)}>
                {label}
              </Typography>
            }
          />
          <FormHelperText className="text-red text-base mx-0" error={!!errors[name]}>{`${
            errors[name] ? errors[name]?.message : ''
          }`}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

Checkbox.defaultProps = {
  className: undefined,
  defaultValue: false,
};

export default Checkbox;
