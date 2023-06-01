/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormControlLabel, FormHelperText, Checkbox as MUICheckbox } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import Checked from '../../assets/icons/check-checked.svg';
import NotChecked from '../../assets/icons/check-empty.svg';

export type CheckboxProps = {
  name: string;
  label: string;
  className?: string;
};

export function Checkbox({ name, label, className }: CheckboxProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormControlLabel
            className={twMerge(`text-darkest text-lg mb-4 ${className}`)}
            control={
              <MUICheckbox
                // sx={{
                //   color: COLORS.darkest,
                //   '&.Mui-checked': {
                //     color: COLORS.darkest,
                //   },
                // }}
                icon={<img src={NotChecked} alt="icon" />}
                checkedIcon={<img src={Checked} alt="icon" />}
                {...field}
              />
            }
            label={label}
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
};

export default Checkbox;
