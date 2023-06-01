/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container } from '@mui/material';
import { useT } from '@transifex/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import QRCode from 'react-qr-code';
import { z } from 'zod';

import { useParamsTypeSafe, useSearchParamsTypeSafe } from '../hooks/useParamsTypeSafe';
import useSetupMFA from '../hooks/useSetupMFA';
import { SetupMFAInputForm, setupMFASchema } from '../schemas/auth';
import { Button } from '../stories/button/Button';
import FormInput from '../stories/form-input/FormInput';
import Text from '../stories/text/Text';
import Title from '../stories/title/Title';

export function SetupMFAPage() {
  const t = useT();
  const { setupMFAMutation, isLoading } = useSetupMFA();

  const { secret, session } = useParamsTypeSafe(
    z.object({
      secret: z.coerce.string(),
      session: z.coerce.string(),
    }),
  );

  const { username } = useSearchParamsTypeSafe(
    z.object({
      username: z.coerce.string(),
    }),
  );

  const methods = useForm<SetupMFAInputForm>({
    resolver: zodResolver(setupMFASchema),
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<SetupMFAInputForm> = (values) => {
    // Executing the Mutation
    setupMFAMutation({ temp_password: values.temp_password, secret, session });
  };

  return (
    <Box className="bg-background">
      <Title
        type="page"
        className="lg:pt-16 lg:pl-20 md:pt-10 md:pl-12 sm:pt-9 sm:pl-10 pt-8 pl-6 lg:mb-16 mb-10"
        label={t('MFA Setup')}
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
              <Title type="section" className="self-center mb-8" label={t('Configure MFA')} />
              <Text>label={t('Install an Authenticator App or use the Google Chrome Authenticator extension.')}</Text>
              <Text>{t('Use this QR')}</Text>
              <QRCode
                className="self-center"
                value={`otpauth://totp/${username}?secret=${secret}&issuer=Credere (OCP)`}
              />

              <Text className="mt-10">{t('Or enter the secret manually:')}</Text>
              <Text className="mb-10 text-xs">{secret}</Text>
              <FormInput name="temp_password" label={t('One-Time Password Code (MFA)')} />
              <Button className="mb-10" label={t('Finish setup')} type="submit" disabled={isLoading} />
              <Box>
                <Text className="inline-block">{t('Need help? Email')} </Text>
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

export default SetupMFAPage;
