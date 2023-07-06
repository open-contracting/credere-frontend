/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormControlLabel, FormHelperText, Checkbox as MUICheckbox, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import Checked from '../../assets/icons/check-checked.svg';
import NotChecked from '../../assets/icons/check-empty.svg';
import { getProperty } from '../../util';
import { FieldErrorType } from '../form-input/FormInput';

export type CheckboxProps = {
  name: string;
  label: string;
  className?: string;
  fieldClassName?: string;
  defaultValue?: boolean;
};

export function Checkbox({ name, label, fieldClassName, defaultValue = false, className }: CheckboxProps) {
  const {
    control,
    formState: { errors, defaultValues },
  } = useFormContext();

  const fieldError: FieldErrorType = getProperty(errors, name);
  const defultValueForm = getProperty(defaultValues, name) || defaultValue;
  return (
    <Controller
      control={control}
      defaultValue={defultValueForm}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth className={twMerge(`mb-2 ${fieldClassName}`)}>
          <FormControlLabel
            sx={{ alignItems: 'flex-start' }}
            control={
              <MUICheckbox
                sx={{ px: '10px', py: '2px', ':hover': { backgroundColor: 'transparent' } }}
                icon={<img src={NotChecked} alt="check-icon-empty" />}
                checkedIcon={<img src={Checked} alt="check-icon-checked" />}
                {...field}
                defaultChecked={defultValueForm}
              />
            }
            label={
              <Typography
                variant="body1"
                className={twMerge(`text-darkest text-lg ${fieldError ? 'text-red' : ''} ${className}`)}>
                {label}
              </Typography>
            }
          />
          <FormHelperText className="text-red text-base mx-0" error={!!fieldError}>{`${
            fieldError ? fieldError?.message : ''
          }`}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

Checkbox.defaultProps = {
  className: undefined,
  fieldClassName: '',
  defaultValue: false,
};

export default Checkbox;
