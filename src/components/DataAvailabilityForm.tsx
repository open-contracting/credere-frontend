/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Collapse } from '@mui/material';
import { t as tNative } from '@transifex/native';
import { useT } from '@transifex/react';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { TypeOf, object, string } from 'zod';

import FormInput from '../stories/form-input/FormInput';
import LinkButton from '../stories/link-button/LinkButton';
import Text from '../stories/text/Text';

interface DataAvailabilityFormProps {
  name: string;
  value: string | number | null;
  type?: 'currency' | 'date-picker' | 'date-field';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateValue: (value: any) => void;
  isLoading: boolean;
}

const formCellSchema = object({
  value: string().min(1, tNative('This field is required')),
});

type FormCellInput = TypeOf<typeof formCellSchema>;

export function DataAvailabilityForm({ name, value, isLoading, type, updateValue }: DataAvailabilityFormProps) {
  const t = useT();
  const [open, setOpen] = useState(false);

  const methods = useForm<FormCellInput>({
    resolver: zodResolver(formCellSchema),
    defaultValues: {
      value: value ? `${value}` : undefined,
    },
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<FormCellInput> = (values) => {
    updateValue(values.value);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box className="py-2 flex flex-col">
      <Text fontVariant className="mb-0 text-sm">
        {value || t('(Blank)')}
      </Text>
      <Box className="flex flex-col align-top">
        <Box className="flex flex-col align-top" onClick={handleToggle}>
          <Text fontVariant className="mb-0 mt-1 text-sm text-red">
            {open ? '-' : '+'} {value ? t('Edit manually') : t('Add manually')}
          </Text>
        </Box>

        <Collapse in={open}>
          <FormProvider {...methods}>
            <Box
              component="form"
              className="flex flex-col mt-4 pr-4 align-top justify-end"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              autoComplete="off">
              <FormInput
                inputCell
                fontVariant
                type={type}
                rows={!type ? 3 : undefined}
                multiline={!type}
                formControlClasses="mb-2"
                labelClassName="mb-0 text-sm"
                big={false}
                noIcon
                name="value"
                size="small"
                label={name}
              />

              <LinkButton
                disabled={isLoading}
                noIcon
                className="min-w-min px-0 py-0 text-sm self-end justify-end"
                label={t('Update')}
                type="submit"
              />
            </Box>
          </FormProvider>
        </Collapse>
      </Box>
    </Box>
  );
}

DataAvailabilityForm.defaultProps = {
  type: undefined,
};

export default DataAvailabilityForm;
