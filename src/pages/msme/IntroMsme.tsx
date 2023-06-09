/* eslint-disable no-console */

/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useT } from '@transifex/react';
import { useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FAQComponent from 'src/components/FAQComponent';
import useAccessScheme from 'src/hooks/useAccessScheme';
import useApplicationContext from 'src/hooks/useApplicationContext';
import { IntroInput, introSchema } from 'src/schemas/application';
import { Button } from 'src/stories/button/Button';
import Checkbox from 'src/stories/checkbox/Checkbox';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

function IntroMsme() {
  const t = useT();
  const navigate = useNavigate();
  const applicationContext = useApplicationContext();
  const { accessSchemeMutation, isLoading } = useAccessScheme();

  const methods = useForm<IntroInput>({
    resolver: zodResolver(introSchema),
  });
  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<IntroInput> = () => {
    accessSchemeMutation({ uuid: applicationContext.state.data?.application.uuid });
  };

  const navigateDeclineHandler = () => {
    navigate('../decline');
  };

  const paramsForText = useMemo(() => {
    if (!applicationContext.state.data) return {};
    return {
      award_title: applicationContext.state.data.award.description,
      buyer_name: applicationContext.state.data.award.buyer_name,
      award_contract_value: applicationContext.state.data.award.award_amount,
    };
  }, [applicationContext.state.data]);

  return (
    <>
      <Title type="page" label={t('Credere by Open Contracting Partnership')} className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">
            {t(
              'Congratulations on winning the award for the public sector contract for {award_title} with {buyer_name}.',
              {
                award_title: paramsForText.buyer_name,
                buyer_name: paramsForText.buyer_name,
              },
            )}
          </Text>
          <Text className="mb-8">
            {t(
              'As a micro, small or medium sized business (MSME) that has been awarded a public sector contract, you are eligible to apply for credit using this scheme. ',
            )}
          </Text>
          <Text className="mb-8">
            {t(
              'You can request up 90% of the value of the award in your credit application, which is currently {award_contract_value}.',
              { award_contract_value: paramsForText.award_contract_value },
            )}
          </Text>
          <Text className="mb-8">
            {t(
              "If you would like to view the credit options available, then all you have to do is click 'Access the scheme' below. Once you have selected a credit option, the online application takes just a couple of minutes.",
            )}
          </Text>
          <Text className="mb-8">
            {t(
              'You have two weeks to select a credit option and make an application after which access to the scheme will be removed for security reasons.',
            )}
          </Text>
          <Text className="mb-8">
            {t(
              'You are under no obligation to accept the credit when it is offered to you. You do not have to be an existing customer with any of our partners to be able to access this offer.',
            )}
          </Text>
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              autoComplete="off"
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Checkbox
                name="agree_topass_info_to_banking_partner"
                defaultValue={false}
                label={t('A agree for my details to be passed onto the banking partner.')}
              />
              <Checkbox
                name="accept_terms_and_conditions"
                defaultValue={false}
                label={t('I have read the terms and conditions for the credit guarantee scheme.')}
              />
              <div className="mt-5 grid grid-cols-1 gap-4 md:flex md:gap-0">
                <div>
                  <Button className="md:mr-4" label={t('Acces the scheme')} type="submit" disabled={isLoading} />
                </div>

                <div>
                  <Button label={t('Decline')} onClick={navigateDeclineHandler} disabled={isLoading} />
                </div>
              </div>
            </Box>
          </FormProvider>
        </div>
        <div className="my-6 md:my-0 md:ml-10">
          <FAQComponent />
        </div>
      </div>
    </>
  );
}

export default IntroMsme;
