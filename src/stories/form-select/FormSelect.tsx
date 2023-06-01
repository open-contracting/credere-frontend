/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '../form-input/FormInput';
import { Text } from '../text/Text';

export type FormSelectOption = {
  label: string;
  value: string;
};

export type FormSelectProps = {
  name: string;
  label: string;
  placeholder?: string;
  options: FormSelectOption[] | string[];
  renderOption?: (option: FormSelectOption) => string;
};

const defaultRenderOption = (option: FormSelectOption) => option.label;

const isStringArray = (obj: unknown): obj is string[] =>
  Array.isArray(obj) && obj.every((item) => typeof item === 'string');

export function FormSelect({ name, label, placeholder, renderOption = defaultRenderOption, options }: FormSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const optionsChecked: FormSelectOption[] = useMemo(() => {
    if (isStringArray(options)) {
      return options.map((option) => ({
        label: option,
        value: option,
      }));
    }
    return options;
  }, [options]);

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Text>{label}</Text>
          <Select
            displayEmpty
            disableUnderline
            input={<Input />}
            inputProps={{ name, error: !!errors[name] }}
            {...field}>
            {placeholder && (
              <MenuItem disabled value="">
                <div className="text-softGray">{placeholder}</div>
              </MenuItem>
            )}
            {optionsChecked.map((option) => (
              <MenuItem key={`key-${option.value}`} value={option.value}>
                {renderOption(option)}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText className="text-red text-base mx-0" error={!!errors[name]}>{`${
            errors[name] ? errors[name]?.message : ''
          }`}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

FormSelect.defaultProps = {
  placeholder: undefined,
  renderOption: defaultRenderOption,
};

export default FormSelect;
