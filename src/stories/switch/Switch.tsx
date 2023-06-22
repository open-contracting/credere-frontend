/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormControlLabel, FormHelperText, Switch as MUISwitch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import ToggleSwitch from '../../assets/icons/toggle-switch.svg';
import { COLORS } from '../../constants';
import { getProperty } from '../../util';
import { FieldErrorType } from '../form-input/FormInput';

const LabeledSwitch = styled(MUISwitch)(() => ({
  width: 59,
  height: 29,
  '&': {
    padding: 0,
    marginRight: 10,
    marginLeft: 10,
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    transform: 'translateX(30px)',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: `${COLORS.darkest}`,
    opacity: 1,
    '&:before': {
      content: '"Yes"',
      color: `${COLORS.white}`,
      left: 8,
    },
    '&:after': {
      content: '""',
    },
  },
  '& .MuiSwitch-track': {
    width: 59,
    height: 29,
    opacity: 1,
    borderRadius: 25,
    backgroundColor: `${COLORS.fieldBorder}`,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      fontFamily: 'GT Eesti Pro Text',
      fontSize: 14,
      top: '50%',
      transform: 'translateY(-50%)',
    },
    '&:before': {
      content: '""',
    },
    '&:after': {
      content: '"No"',
      color: `${COLORS.black}`,
      right: 8,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export type SwitchProps = {
  name: string;
  label: string;
  className?: string;
  fieldClassName?: string;
  defaultValue?: boolean;
};

export function Switch({ name, label, fieldClassName, defaultValue = false, className }: SwitchProps) {
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
        <FormControl fullWidth className={`mb-2 ${fieldClassName}`}>
          <FormControlLabel
            sx={{ alignItems: 'flex-start' }}
            control={
              <LabeledSwitch
                sx={{ px: '10px', py: '2px', ':hover': { backgroundColor: 'transparent' } }}
                icon={<img className="" src={ToggleSwitch} alt="check-icon-empty" />}
                checkedIcon={<img className="" src={ToggleSwitch} alt="check-icon-checked" />}
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

Switch.defaultProps = {
  className: undefined,
  fieldClassName: '',
  defaultValue: false,
};

export default Switch;
