/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useT } from '@transifex/react';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import DocumentField from '../../components/DocumentField';
import FAQComponent from '../../components/FAQComponent';
import NeedHelpComponent from '../../components/NeedHelpComponent';
import { DOCUMENTS_TYPE } from '../../constants';
import useApplicationContext from '../../hooks/useApplicationContext';
import useConfirmContractAmount from '../../hooks/useConfirmContractAmount';
import { FormContractAmountInput, uploadContractSchema } from '../../schemas/application';
import Button from '../../stories/button/Button';
import FormInput from '../../stories/form-input/FormInput';

function UploadContract() {
  const t = useT();
  const { isLoading, confirmContractAmountMutation } = useConfirmContractAmount();
  const applicationContext = useApplicationContext();
  const application = applicationContext.state.data?.application;

  const [uploadState, setUploadState] = useState<{ [key: string]: boolean }>({});

  const methods = useForm<FormContractAmountInput>({
    resolver: zodResolver(uploadContractSchema),
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<FormContractAmountInput> = (values) => {
    if (application?.uuid) {
      confirmContractAmountMutation({ uuid: application.uuid, ...values });
    }
  };

  return (
    <>
      <Title type="page" label={t('Upload Contract')} className="mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">
            {t(
              'For your application to be completed, we need you to upload a copy of the signed contract with {buyer_name} and for you to provide the final contract value before the funds can be disbursed by the credit provider.',
              {
                buyer_name: applicationContext.state.data?.award.buyer_name,
              },
            )}
          </Text>

          <DocumentField
            className="md:w-3/5"
            setUploadState={setUploadState}
            label={t('Please attach the signed contract.')}
            documentType={DOCUMENTS_TYPE.SIGNED_CONTRACT}
          />

          <FormProvider {...methods}>
            <Box
              component="form"
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              autoComplete="off">
              <FormInput
                className="w-3/5"
                label={t('Enter the final contract value as per the signed contract.')}
                name="contract_amount_submitted"
                big={false}
                type="currency"
                placeholder={t('Contract amount')}
              />

              <div className="mt-4 mb-10 grid grid-cols-1 gap-4 md:gap-0">
                <div>
                  <Button
                    label={t('Submit')}
                    type="submit"
                    disabled={!uploadState[DOCUMENTS_TYPE.SIGNED_CONTRACT] || isLoading}
                  />
                </div>
              </div>
            </Box>
          </FormProvider>
        </div>
        <div className="my-6 md:my-0 md:ml-10">
          <NeedHelpComponent />
          <FAQComponent className="my-8" />
        </div>
      </div>
    </>
  );
}

export default UploadContract;
