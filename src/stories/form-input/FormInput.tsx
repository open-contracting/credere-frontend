import { FormControl, FormHelperText, InputAdornment, InputProps, Typography, Input as _Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';

import EmailIcon from '../../assets/icons/email.svg';
import KeyIcon from '../../assets/icons/key.svg';
import { COLORS } from '../../constants';

const Input = styled(_Input)`
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

type IFormInputProps = {
  name: string;
  label: string;
} & InputProps;

const getIcon = (type: string | undefined) => {
  if (!type) {
    return undefined;
  }

  let icon = '';
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
export default function FormInput({ name, label, type, ...otherProps }: IFormInputProps) {
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
          <Typography variant="body1" className="text-moodyBlue text-xl mb-3">
            {label}
          </Typography>
          <Input
            // inputProps={{
            //   className: 'w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400',
            // }}
            type={type}
            startAdornment={getIcon(type)}
            {...field}
            fullWidth
            disableUnderline
            error={!!errors[name]}
            {...otherProps}
          />
          <FormHelperText className="text-red text-base mx-0" error={!!errors[name]}>{`${
            errors[name] ? errors[name]?.message : ''
          }`}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
