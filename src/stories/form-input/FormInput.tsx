/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormHelperText, InputAdornment, InputProps, Input as _Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DateField as MUIDateField, DatePicker as MUIDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { Controller, FieldError, FieldErrorsImpl, Merge, useFormContext } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

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

export const InputFormCell = styled(_Input)`
  background-color: white;
  padding: 6px 9px;
  font-size: 14px;
  border-width: 1px;
  border-style: solid;
  border-color: ${COLORS.fieldBorder};
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  &.Mui-error {
    border-color: ${COLORS.red};
    color: ${COLORS.red};
  }
  & input {
    padding-top: 4px;
    padding-bottom: 5px;
  }
`;

export const DateField = styled(MUIDateField)`
  .MuiInputBase-root.MuiInput-root:before,
  .MuiInputBase-root.MuiInput-root:after,
  .MuiInputBase-root.MuiInput-root:hover:before,
  .MuiInputBase-root.MuiInput-root:hover {
    content: '';
    border-bottom: 0px;
  }
  .Mui-error {
    input {
      border-color: ${COLORS.red};
      color: ${COLORS.red};
    }
  }
  & input {
    background-color: white;
    padding-top: 10px;
    padding-right: 9px;
    padding-bottom: 11px;
    padding-left: 9px;
    font-size: 14px;
    border-width: 1px;
    border-style: solid;
    border-color: ${COLORS.fieldBorder};
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    &.Mui-error {
      border-color: ${COLORS.red};
      color: ${COLORS.red};
    }
  }
`;

export const DatePickerCell = styled(MUIDatePicker)`
  .MuiInputBase-root.MuiInput-root:before,
  .MuiInputBase-root.MuiInput-root:after,
  .MuiInputBase-root.MuiInput-root:hover:before,
  .MuiInputBase-root.MuiInput-root:hover {
    content: '';
    border-bottom: 0px;
  }
  .Mui-error {
    input {
      border-color: ${COLORS.red};
      color: ${COLORS.red};
    }
  }
  &.MuiTextField-root {
    background-color: white;
    padding-top: 6px;
    padding-right: 9px;
    padding-bottom: 6px;
    padding-left: 9px;
    font-size: 14px;
    border-width: 1px;
    border-style: solid;
    border-color: ${COLORS.fieldBorder};
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    &.Mui-error {
      border-color: ${COLORS.red};
      color: ${COLORS.red};
    }
  }
  & input {
    font-size: 14px;
  }
  & .MuiInputAdornment-root.MuiInputAdornment-positionEnd .MuiButtonBase-root.MuiIconButton-root {
    margin-right: -8px;
    padding-top: 1px;
    padding-bottom: 0px;
  }
`;

export const DatePicker = styled(MUIDatePicker)`
  .MuiInputBase-root.MuiInput-root:before,
  .MuiInputBase-root.MuiInput-root:after,
  .MuiInputBase-root.MuiInput-root:hover:before,
  .MuiInputBase-root.MuiInput-root:hover {
    content: '';
    border-bottom: 0px;
  }
  .Mui-error {
    input {
      border-color: ${COLORS.red};
      color: ${COLORS.red};
    }
  }
  &.MuiTextField-root {
    background-color: white;
    padding: 18px 18px;
    margin-bottom: 0.5rem;
    border-width: 1px;
    border-style: solid;
    font-size: 14px;
    border-width: 1px;
    border-style: solid;
    border-color: ${COLORS.fieldBorder};
    &.Mui-error,
    &:has(.Mui-error) {
      border-color: ${COLORS.red};
      color: ${COLORS.red};
    }
  }
  & input {
    font-size: 14px;
  }
  & .MuiInputAdornment-root.MuiInputAdornment-positionEnd .MuiButtonBase-root.MuiIconButton-root {
    margin-right: -8px;
    padding-top: 1px;
    padding-bottom: 0px;
  }
`;

interface CustomProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
}

// eslint-disable-next-line react/display-name
const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange(values.value);
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
});

export type FormInputProps = {
  name: string;
  label: string;
  big?: boolean;
  fullWidth?: boolean;
  noIcon?: boolean;
  placeholder?: string;
  helperText?: string;
  labelClassName?: string;
  formControlClasses?: string;
  fontVariant?: boolean;
  inputCell?: boolean;
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

const TEXT_TYPES = ['text', 'email', 'password', 'number'];
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
  helperText,
  big = true,
  fullWidth = true,
  noIcon = false,
  type,
  labelClassName,
  fontVariant,
  className,
  inputCell,
  formControlClasses,
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
        <FormControl fullWidth={fullWidth} sx={{ mb: 2 }} className={formControlClasses} error={!!fieldError}>
          <Text fontVariant={fontVariant} className={`${big ? AUTH_LABELS_CLASSNAMES : ''} ${labelClassName}`}>
            {label}
          </Text>
          {!inputCell && (!type || TEXT_TYPES.includes(type)) && (
            <Input
              type={type}
              startAdornment={noIcon ? undefined : getIcon(type)}
              {...field}
              fullWidth={fullWidth}
              placeholder={placeholder}
              disableUnderline
              error={!!fieldError}
              sx={
                fontVariant
                  ? {
                      fontFamily: 'GT Eesti Pro Text',
                    }
                  : {}
              }
              {...otherProps}
              className={className}
            />
          )}
          {!inputCell && type === 'currency' && (
            <Input
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              inputComponent={NumericFormatCustom as any}
              type={type}
              startAdornment={noIcon ? undefined : getIcon(type)}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              fullWidth={fullWidth}
              placeholder={placeholder}
              disableUnderline
              error={!!fieldError}
              {...otherProps}
              className={className}
            />
          )}
          {inputCell && !type && (
            <InputFormCell
              type={type}
              startAdornment={noIcon ? undefined : getIcon(type)}
              {...field}
              fullWidth={fullWidth}
              placeholder={placeholder}
              disableUnderline
              error={!!fieldError}
              sx={
                fontVariant
                  ? {
                      fontFamily: 'GT Eesti Pro Text',
                    }
                  : {}
              }
              {...otherProps}
              className={className}
            />
          )}
          {inputCell && type === 'date-picker' && (
            <DatePickerCell
              autoFocus
              className={className}
              onChange={(value: unknown) => {
                const date = value as Dayjs;
                if (date.isValid()) {
                  field.onChange(date.toISOString());
                }
              }}
              slotProps={{
                textField: {
                  variant: 'standard',
                  value: dayjs(field.value),
                  onBlur: field.onBlur,
                  fullWidth,
                  placeholder,
                  error: !!fieldError,
                },
              }}
              sx={
                fontVariant
                  ? {
                      fontFamily: 'GT Eesti Pro Text',
                    }
                  : {}
              }
            />
          )}
          {!inputCell && type === 'date-picker' && (
            <DatePicker
              autoFocus
              className={className}
              onChange={(value: unknown) => {
                const date = value as Dayjs;
                if (date.isValid()) {
                  field.onChange(date.toISOString());
                }
              }}
              slotProps={{
                textField: {
                  variant: 'standard',
                  value: dayjs(field.value),
                  onBlur: field.onBlur,
                  fullWidth,
                  placeholder,
                  error: !!fieldError,
                },
              }}
              sx={
                fontVariant
                  ? {
                      fontFamily: 'GT Eesti Pro Text',
                    }
                  : {}
              }
            />
          )}
          {inputCell && type === 'date-field' && (
            <DateField
              autoFocus
              onChange={(value: unknown) => {
                const date = value as Dayjs;
                if (date.isValid()) {
                  field.onChange(date.toISOString());
                }
              }}
              variant="standard"
              slotProps={{
                textField: {
                  value: dayjs(field.value),
                  onBlur: field.onBlur,
                  fullWidth,
                  placeholder,
                  error: !!fieldError,
                },
              }}
              sx={
                fontVariant
                  ? {
                      fontFamily: 'GT Eesti Pro Text',
                    }
                  : {}
              }
            />
          )}
          {inputCell && type === 'currency' && (
            <InputFormCell
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              inputComponent={NumericFormatCustom as any}
              type={type}
              startAdornment={noIcon ? undefined : getIcon(type)}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              fullWidth={fullWidth}
              placeholder={placeholder}
              disableUnderline
              error={!!fieldError}
              sx={
                fontVariant
                  ? {
                      fontFamily: 'GT Eesti Pro Text',
                    }
                  : {}
              }
              {...otherProps}
              className={className}
            />
          )}
          {helperText && (
            <FormHelperText className={`font-light text-sm mx-0 ${className}`}>{helperText}</FormHelperText>
          )}
          <FormInputError className={labelClassName} fieldError={fieldError} />
        </FormControl>
      )}
    />
  );
}

FormInput.defaultProps = {
  noIcon: false,
  big: true,
  fullWidth: true,
  placeholder: undefined,
  helperText: undefined,
  labelClassName: '',
  fontVariant: undefined,
  inputCell: undefined,
  formControlClasses: '',
};

export default FormInput;
