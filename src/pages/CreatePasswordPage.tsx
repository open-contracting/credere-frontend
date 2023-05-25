 

/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSearchParamsTypeSafe } from '../hooks/useParamsTypeSafe';
import useUpdatePassword from '../hooks/useUpdatePassword';
import { UpdatePasswordInput, UpdatePasswordPayload, setPasswordSchema } from '../schemas/auth';
import { Button } from '../stories/button/Button';
import FormInput from '../stories/form-input/FormInput';
import Text from '../stories/text/Text';
import Title from '../stories/title/Title';

const params = z.object({
  email: z.coerce.string().email(),
  key: z.coerce.string(),
});

export function CreatePasswordPage() {
  const updatePassword = useUpdatePassword();
  const { email: username, key: tempPassword } = useSearchParamsTypeSafe(params, 'This is an invalid link');

  const methods = useForm<UpdatePasswordInput>({
    resolver: zodResolver(setPasswordSchema),
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

  const onSubmitHandler: SubmitHandler<UpdatePasswordInput> = (values) => {
    // Executing the Mutation
    const payload: UpdatePasswordPayload = {
      password: values.password,
      temp_password: tempPassword,
      username,
    };

    updatePassword(payload);
  };

  return (
    <Box className="bg-background">
      <Title
        type="page"
        className="lg:pt-16 lg:pl-20 md:pt-10 md:pl-12 sm:pt-9 sm:pl-10 pt-8 pl-6 lg:mb-16 mb-10"
        label="Create Password"
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
              <Title type="section" className="self-center mb-8" label="Set account password" />
              <FormInput name="password" label="Password" type="password" />
              <FormInput name="passwordConfirm" label="Confirm password" type="password" />

              <Button className="mb-10" label="Submit" type="submit" />
              <Box>
                <Text className="inline-block">Need help? Email</Text>
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

export default CreatePasswordPage;
