/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { TypeOf, boolean, object } from 'zod';

import Switch from '../stories/switch/Switch';

interface DataVerificationFormProps {
  name: string;
  value: boolean;
  readonly: boolean;
  verifyData: (value: boolean) => void;
  isLoading: boolean;
}

const formCellSchema = object({
  value: boolean(),
});

type FormCellInput = TypeOf<typeof formCellSchema>;

export function DataVerificationForm({ name, value, isLoading, readonly, verifyData }: DataVerificationFormProps) {
  const methods = useForm<FormCellInput>({
    resolver: zodResolver(formCellSchema),
    defaultValues: {
      value,
    },
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<FormCellInput> = (values) => {
    verifyData(values.value);
  };

  return (
    <Box className="py-2 flex flex-col">
      <Box className="flex flex-col align-top">
        <FormProvider {...methods}>
          <Box
            component="form"
            className="flex flex-col pr-4 align-top justify-end"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off">
            <Switch disabled={isLoading || readonly} name={name} label="" defaultValue={value} />
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
}

export default DataVerificationForm;
