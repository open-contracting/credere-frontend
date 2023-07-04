/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useT } from '@transifex/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useRegisterUser from 'src/hooks/useRegisterUser';
import { RegisteruserInput, registerUserSchema } from 'src/schemas/OCPregisterUser';
import { Button } from 'src/stories/button/Button';
import FormInput from 'src/stories/form-input/FormInput';
import FormSelect from 'src/stories/form-select/FormSelect';
import Title from 'src/stories/title/Title';

import { USER_TYPE_OPTIONS } from '../../constants';

export function RegisterUserPage() {
  const t = useT();
  const { registerUserMutation, isLoading } = useRegisterUser();

  const methods = useForm<RegisteruserInput>({
    resolver: zodResolver(registerUserSchema),
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<RegisteruserInput> = (values) => {
    // Executing the loginUser Mutation
    registerUserMutation(values);
    console.log(values);
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

      <Title type="section" label={t('Register User')} className="mb-6" />
      <Box className="bg-background">
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
              label={t('Email Address)')}
              name="email"
              big={false}
              placeholder={t('example@email.com')}
            />
            <FormInput className="w-3/5" label={t('Email Address)')} name="name" big={false} placeholder={t('name')} />
            <FormSelect
              className="w-3/5"
              label={t('Select the user type')}
              name="type"
              options={USER_TYPE_OPTIONS}
              placeholder={t('OCP-FI')}
            />
            <FormSelect
              className="w-3/5"
              label={t('Select the lender associated with this FI user')}
              name="lender"
              options={['39']}
              placeholder={t('lender')}
            />

            <div className="mt-8 grid grid-cols-1 gap-4 md:flex md:gap-0">
              <div>
                <Button className="md:mr-4" primary={false} label={t('Back')} component={Link} to="/settings" />
              </div>
              <div>
                <Button
                  disabled={isLoading}
                  //   label={lender ? t('Update Credit Provider') : t('Save and Add Credit Product')}
                  label={t('Save or update new user')}
                  type="submit"
                />
              </div>
            </div>
          </Box>
        </FormProvider>
      </Box>
    </>
  );
}

export default RegisterUserPage;
