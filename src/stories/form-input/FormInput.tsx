/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormHelperText, InputAdornment, InputProps, Input as _Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, FieldError, FieldErrorsImpl, Merge, useFormContext } from 'react-hook-form';

import EmailIcon from '../../assets/icons/email.svg';
import KeyIcon from '../../assets/icons/key.svg';
import { COLORS } from '../../constants';
import { getProperty } from '../../util';
import { Text } from '../text/Text';

export const Input = styled(_Input)`
  background-color: white;
  padding: 17px 18px;
  margin-bottom: 0.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: ${COLORS.fieldBorder};
  &.Mui-error {
    border-color: ${COLORS.red};
    color: ${COLORS.red};
  }
`;

export type FormInputProps = {
  name: string;
  label: string;
  big?: boolean;
  noIcon?: boolean;
  placeholder?: string;
} & InputProps;

const getIcon = (type: string | undefined) => {
  if (!type) {
    return undefined;
  }

  let icon;
  if (type === 'email') {
    icon = EmailIcon;
  }
  if (type === 'password') {
    icon = KeyIcon;
  }

  if (icon) {
    return (
      <InputAdornment position="start">
        <img src={icon} alt="icon" />
      </InputAdornment>
    );
  }

  return undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldErrorType = FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
interface FormInputErrorProps {
  fieldError: FieldErrorType;
  className?: string;
}

export function FormInputError({ fieldError, className = '' }: FormInputErrorProps) {
  if (!fieldError) {
    return null;
  }

  return (
    <FormHelperText className={`text-red text-base mx-0 ${className}`} error={!!fieldError}>{`${
      fieldError ? fieldError?.message : ''
    }`}</FormHelperText>
  );
}

FormInputError.defaultProps = {
  className: '',
};

const AUTH_LABELS_CLASSNAMES = 'text-moodyBlue text-xl mb-3';
export function FormInput({
  name,
  label,
  placeholder,
  big = true,
  noIcon = false,
  type,
  ...otherProps
}: FormInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError: FieldErrorType = getProperty(errors, name);
  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Text className={`${big ? AUTH_LABELS_CLASSNAMES : ''}`}>{label}</Text>
          <Input
            type={type}
            startAdornment={noIcon ? undefined : getIcon(type)}
            {...field}
            fullWidth
            placeholder={placeholder}
            disableUnderline
            error={!!fieldError}
            {...otherProps}
          />
          <FormInputError fieldError={fieldError} />
        </FormControl>
      )}
    />
  );
}

FormInput.defaultProps = {
  noIcon: false,
  big: true,
  placeholder: undefined,
};

export default FormInput;
