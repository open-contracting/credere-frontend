/* eslint-disable no-console */

/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useT } from '@transifex/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FAQComponent from '../components/FAQComponent';
import useApplicationContext from '../hooks/useApplicationContext';
import useDeclineFeedbackApplication from '../hooks/useDeclineFeedbackApplication';
import { DeclineFeedbackInput, declineFeedbackSchema } from '../schemas/application';
import { Button } from '../stories/button/Button';
import Checkbox from '../stories/checkbox/Checkbox';
import FormInput from '../stories/form-input/FormInput';
import Text from '../stories/text/Text';
import Title from '../stories/title/Title';

function DeclineFeedback() {
  const t = useT();
  const navigate = useNavigate();
  const applicationContext = useApplicationContext();
  const { declineFeedbackMutation, isLoading } = useDeclineFeedbackApplication();

  const methods = useForm<DeclineFeedbackInput>({
    resolver: zodResolver(declineFeedbackSchema),
  });

  const {
    handleSubmit,
    watch,
    // formState: { touchedFields },
  } = methods;
  const onSubmitHandler: SubmitHandler<DeclineFeedbackInput> = (values) => {
    const payload: DeclineFeedbackInput = {
      ...values,
      other_commnets: values.other ? values.other_commnets : '',
      uuid: applicationContext.state.data?.application.uuid,
    };
    declineFeedbackMutation(payload);
  };

  const onBackHandler = () => {
    navigate('../decline');
  };

  return (
    <>
      <Title type="page" label={t('Confirm Removal')} className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">{t('Thanks for letting us know. You won’t receive any more emails from us.')}</Text>
          <Text className="mb-8">
            {t(
              'Please take a moment to provide us with feedback on the main reason why the offer was declined. This will help us to understand the needs of SMEs better.',
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
                name="dont_need_access_credit"
                defaultValue={false}
                label={t("I don't need credit to fulfil this contract")}
              />
              <Checkbox
                name="already_have_acredit"
                defaultValue={false}
                label={t('I already have alternative access to credit')}
              />
              <Checkbox
                name="preffer_to_go_to_bank"
                defaultValue={false}
                label={t('I prefer to go to my bank by myself')}
              />
              <Checkbox
                name="dont_want_access_credit"
                defaultValue={false}
                label={t("I don't like the idea of accessing credit")}
              />
              <Checkbox name="other" defaultValue={false} label={t('Other, please specify')} />
              <FormInput disabled={!watch('other')} multiline name="other_comments" label="" big={false} rows={4} />
              <div className="mt-5 grid grid-cols-1 gap-4 md:flex md:gap-0">
                <div>
                  <Button className="md:mr-4" label={t('Back')} onClick={onBackHandler} disabled={isLoading} />
                </div>

                <div>
                  <Button label={t('Submit')} type="submit" disabled={isLoading} />
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

export default DeclineFeedback;
