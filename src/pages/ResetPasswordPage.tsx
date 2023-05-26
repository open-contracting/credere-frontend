/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import useResetPassword from '../hooks/useResetPassword';
import { ResetPasswordInput, resetPasswordSchema } from '../schemas/auth';
import { Button } from '../stories/button/Button';
import FormInput from '../stories/form-input/FormInput';
import Text from '../stories/text/Text';
import Title from '../stories/title/Title';

export function ResetPasswordPage() {
  const { resetPasswordMutation, isLoading } = useResetPassword();

  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<ResetPasswordInput> = (values) => {
    // Executing the  Mutation
    resetPasswordMutation(values);
  };

  return (
    <Box className="bg-background">
      <Title
        type="page"
        className="lg:pt-16 lg:pl-20 md:pt-10 md:pl-12 sm:pt-9 sm:pl-10 pt-8 pl-6 lg:mb-16 mb-10"
        label="Forgot Password"
      />
      <Container
        maxWidth={false}
        className="bg-background"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              autoComplete="off"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                p: { xs: '1rem', sm: '2rem' },
                width: { sm: '580px' },
                borderRadius: 0,
              }}>
              <Title type="section" className="self-center mb-8" label="Enter your email to reset password" />
              <FormInput name="username" label="Email Address" type="email" placeholder="example@email.com" />

              <Button className="mb-10" label="Submit" type="submit" disabled={isLoading} />
              <Box>
                <Text className="inline-block">Need help? Email </Text>
                <Text className="inline-block underline ml-1">
                  <a className="text-darkest" href="mailto:credere@open-contracting.org">
                    credere@open-contracting.org
                  </a>
                </Text>
              </Box>
            </Box>
          </FormProvider>
        </Box>
      </Container>
    </Box>
  );
}

export default ResetPasswordPage;
