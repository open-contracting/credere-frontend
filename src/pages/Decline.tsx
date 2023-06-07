/* eslint-disable no-console */

/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useT } from '@transifex/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FAQComponent from '../components/FAQComponent';
import useApplicationContext from '../hooks/useApplicationContext';
import useDeclineApplication from '../hooks/useDeclineApplication';
import { DeclineApplicationInput, declineApplicationSchema } from '../schemas/application';
import { Button } from '../stories/button/Button';
import Checkbox from '../stories/checkbox/Checkbox';
import Text from '../stories/text/Text';
import Title from '../stories/title/Title';

function Decline() {
  const t = useT();
  const navigate = useNavigate();
  const applicationContext = useApplicationContext();
  const { declineApplicationMutation, isLoading } = useDeclineApplication();

  const methods = useForm<DeclineApplicationInput>({
    resolver: zodResolver(declineApplicationSchema),
  });

  const { handleSubmit } = methods;
  const onSubmitHandler: SubmitHandler<DeclineApplicationInput> = (values) => {
    declineApplicationMutation({ ...values, uuid: applicationContext.state.data?.application.uuid });
  };

  const onBackHandler = () => {
    navigate('../intro');
  };

  return (
    <>
      <Title type="page" label={t('Confirm Removal')} className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">{t('Please confirm your preferences.')}</Text>
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
                name="decline_this"
                defaultValue={false}
                label={t("I don't want to receive emails regarding credit opportunities for this contract")}
              />
              <Checkbox
                name="decline_all"
                defaultValue={false}
                label={t("I don't want to receive any opportunities for credit at all")}
              />
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

export default Decline;
