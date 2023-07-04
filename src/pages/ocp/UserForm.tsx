/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from 'src/stories/button/Button';
import FormInput from 'src/stories/form-input/FormInput';
import FormSelect, { FormSelectOption } from 'src/stories/form-select/FormSelect';
import Title from 'src/stories/title/Title';

import { getLendersFn } from '../../api/private';
import { QUERY_KEYS, USER_TYPES, USER_TYPE_OPTIONS } from '../../constants';
import useUpsertUser from '../../hooks/useUpsertUser';
import { ILender, ILenderListResponse } from '../../schemas/application';
import { CreateUserInput, IUser, createUserSchema } from '../../schemas/auth';

export interface UserFormProps {
  user?: IUser | null;
}

export function UserForm({ user }: UserFormProps) {
  const t = useT();
  const { createUserMutation, isLoading } = useUpsertUser();

  const [options, setOptions] = useState<FormSelectOption[]>([]);

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const { handleSubmit, watch } = methods;

  const [typeValue] = watch(['type']);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.lenders],
    queryFn: async (): Promise<ILenderListResponse | null> => {
      const response = await getLendersFn();
      return response;
    },
    retry: 1,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.detail) {
        enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(t('Error loading lenders'), {
          variant: 'error',
        });
      }
    },
  });

  useEffect(() => {
    if (data && data.items.length > 0) {
      const lenderOptions: FormSelectOption[] = data.items.map((lender: ILender) => ({
        label: lender.name,
        value: `${lender.id}`,
      }));
      setOptions(lenderOptions);
    }
  }, [data]);

  const onSubmitHandler: SubmitHandler<CreateUserInput> = (values) => {
    createUserMutation(values);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:mb-8 md:mb-8 mb-4 md:grid-cols-2 gap-4 ">
        <div className="flex items-end col-span-1 md:mr-10">
          <Title className="mb-0" type="page" label={t('Settings')} />
        </div>
        <div className="flex justify-start items-start my-4 col-span-1 md:justify-end md:my-0 md:ml-10 lg:justify-end lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button className="md:mr-4" label={t('Dashboard')} component={Link} to="/" />
            </div>

            <div>
              <Button label={t('MSME Applications')} component={Link} to="/admin/applications" />
            </div>
          </div>
        </div>
      </div>

      <Title type="section" label={user ? t('Update user') : t('Create User')} className="mb-6" />

      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete="off"
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 0,
          }}>
          <FormInput
            className="w-3/5"
            label={t('Email Address')}
            name="email"
            big={false}
            placeholder={t('Email Address')}
          />
          <FormInput
            className="w-3/5"
            label={t('Name of the user')}
            name="name"
            big={false}
            placeholder={t('Full name')}
          />
          <FormSelect
            className="w-3/5"
            label={t('Select the role of the user')}
            name="type"
            options={USER_TYPE_OPTIONS}
            placeholder={t('User type')}
          />
          {typeValue === USER_TYPES.FI && (
            <FormSelect
              className="w-3/5"
              label={t('Select the lender associated with this FI User')}
              name="lender_id"
              options={options}
              placeholder={t('Lender')}
            />
          )}

          <div className="mt-8 grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button className="md:mr-4" primary={false} label={t('Back')} component={Link} to="/settings" />
            </div>
            <div>
              <Button disabled={isLoading} label={user ? t('Update user') : t('Create User')} type="submit" />
            </div>
          </div>
        </Box>
      </FormProvider>
    </>
  );
}

UserForm.defaultProps = {
  user: null,
};

export default UserForm;
