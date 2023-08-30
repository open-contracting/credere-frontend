/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useT } from '@transifex/react';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ConfirmIcon from 'src/assets/icons/confirm.svg';
import EditIcon from 'src/assets/icons/edit.svg';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import DocumentField from '../../components/DocumentField';
import FAQComponent from '../../components/FAQComponent';
import NeedHelpComponent from '../../components/NeedHelpComponent';
import { APPLICATION_STATUS, DOCUMENTS_TYPE } from '../../constants';
import useApplicationContext from '../../hooks/useApplicationContext';
import useChangeEmail from '../../hooks/useChangeEmail';
import useSubmitAdditionalData from '../../hooks/useSubmitAdditionalData';
import { changeEmailSchema, FormChangeEmailInput } from '../../schemas/application';
import Button from '../../stories/button/Button';
import FormInput from '../../stories/form-input/FormInput';
import LinkButton from '../../stories/link-button/LinkButton';

function UploadDocuments() {
  const t = useT();
  const navigate = useNavigate();
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const { isLoading: isLoadingChangeEmail, changeEmailMutation, data } = useChangeEmail();
  const { isLoading: isLoadingAdditionalData, submitAdditionalDataMutation } = useSubmitAdditionalData();
  const applicationContext = useApplicationContext();
  const application = applicationContext.state.data?.application;
  const [uploadState, setUploadState] = useState<{ [key: string]: boolean }>({});

  const showUploaderFor = useMemo(
    () => applicationContext.state.data?.creditProduct.required_document_types || {},
    [applicationContext.state.data?.creditProduct.required_document_types],
  );

  const allUploaded = useMemo(
    () =>
      Object.keys(showUploaderFor).every((key) => !showUploaderFor[key] || (showUploaderFor[key] && uploadState[key])),
    [showUploaderFor, uploadState],
  );

  const submitApplicationHandler = () => {
    if (applicationContext.state.data?.application.status === APPLICATION_STATUS.INFORMATION_REQUESTED) {
      submitAdditionalDataMutation({ uuid: applicationContext.state.data?.application.uuid });
    } else {
      navigate('../confirm-submission');
    }
  };

  const methods = useForm<FormChangeEmailInput>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      new_email: application?.primary_email,
    },
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (application?.primary_email) {
      setValue('new_email', application?.primary_email);
    }
  }, [application?.primary_email, setValue]);

  const onSubmitHandler: SubmitHandler<FormChangeEmailInput> = (values) => {
    if (application) {
      changeEmailMutation({ uuid: application.uuid, ...values });
      setEditEmail(false);
    }
  };

  return (
    <>
      <Title
        type="page"
        label={
          applicationContext.state.data?.application.status === APPLICATION_STATUS.INFORMATION_REQUESTED
            ? t('Submit Additional Data')
            : t('Credit Application')
        }
        className="mb-10"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">
            {t(
              'For your application to be processed, we need a few additional pieces of information. Please attach the required documents. This should take no more than a few minutes of your time.',
            )}
          </Text>
          {showUploaderFor[DOCUMENTS_TYPE.BANK_CERTIFICATION_DOCUMENT] && (
            <DocumentField
              className="md:w-3/5"
              setUploadState={setUploadState}
              label={t('Please attach the bank certification document for your company.')}
              documentType={DOCUMENTS_TYPE.BANK_CERTIFICATION_DOCUMENT}
            />
          )}
          {showUploaderFor[DOCUMENTS_TYPE.FINANCIAL_STATEMENT] && (
            <DocumentField
              className="md:w-3/5"
              setUploadState={setUploadState}
              label={t('Please attach the financial statement for your business for the last accounting period.')}
              documentType={DOCUMENTS_TYPE.FINANCIAL_STATEMENT}
            />
          )}
          {showUploaderFor[DOCUMENTS_TYPE.INCORPORATION_DOCUMENT] && (
            <DocumentField
              className="md:w-3/5"
              setUploadState={setUploadState}
              label={t('Please attach your incorporation certificate for your company.')}
              documentType={DOCUMENTS_TYPE.INCORPORATION_DOCUMENT}
            />
          )}
          {showUploaderFor[DOCUMENTS_TYPE.SUPPLIER_REGISTRATION_DOCUMENT] && (
            <DocumentField
              className="md:w-3/5"
              setUploadState={setUploadState}
              label={t('Please attach your supplier registration document for your company.')}
              documentType={DOCUMENTS_TYPE.SUPPLIER_REGISTRATION_DOCUMENT}
            />
          )}
          {showUploaderFor[DOCUMENTS_TYPE.SHAREHOLDER_COMPOSITION] && (
            <DocumentField
              className="md:w-3/5"
              setUploadState={setUploadState}
              label={t('Please attach your shareholder composition document.')}
              documentType={DOCUMENTS_TYPE.SHAREHOLDER_COMPOSITION}
            />
          )}
          {showUploaderFor[DOCUMENTS_TYPE.CHAMBER_OF_COMMERCE] && (
            <DocumentField
              className="md:w-3/5"
              setUploadState={setUploadState}
              label={t('Please attach your Certificado de inscripción del Registro Único de Proponentes (RUP).')}
              documentType={DOCUMENTS_TYPE.CHAMBER_OF_COMMERCE}
            />
          )}
          {showUploaderFor[DOCUMENTS_TYPE.THREE_LAST_BANK_STATEMENT] && (
            <DocumentField
              className="md:w-3/5"
              setUploadState={setUploadState}
              label={t('Please attach your last three bank statements.')}
              documentType={DOCUMENTS_TYPE.THREE_LAST_BANK_STATEMENT}
            />
          )}

          <FormProvider {...methods}>
            <Box
              component="form"
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              autoComplete="off">
              <Text className="mb-0">
                {t('Confirm or edit the email address that you would like us to use to contact you on.')}
              </Text>
              <div className="flex flex-row">
                <FormInput
                  fullWidth={false}
                  formControlClasses="w-96"
                  label=""
                  name="new_email"
                  big={false}
                  disabled={!editEmail || isLoadingChangeEmail}
                  placeholder={t('New primary email')}
                />
                {editEmail && (
                  <LinkButton
                    icon={ConfirmIcon}
                    type="submit"
                    className="mr-4"
                    label={t('Confirm')}
                    disabled={isLoadingChangeEmail}
                  />
                )}
                {!editEmail && (
                  <LinkButton className="mr-4" icon={EditIcon} onClick={() => setEditEmail(true)} label={t('Edit')} />
                )}
              </div>
              {data && (
                <Text className="mb-10 text-sm text-red font-light">
                  {t('Email changed! Check your old and new email addresses to confirm.')}
                </Text>
              )}
              {!data && application?.pending_email_confirmation && (
                <Text className="mb-10 text-sm text-red font-light">
                  {t('There is a pending email confirmation, check your inbox to confirm the new email.')}
                </Text>
              )}
            </Box>
          </FormProvider>
          <div className="mt-6 md:mb-8 grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button className="md:mr-4" label={t('Back')} />
            </div>

            <div>
              <Button
                label={
                  applicationContext.state.data?.application.status === APPLICATION_STATUS.INFORMATION_REQUESTED
                    ? t('Submit Additional Data')
                    : t('Continue')
                }
                onClick={submitApplicationHandler}
                disabled={!allUploaded || isLoadingAdditionalData}
              />
            </div>
          </div>
        </div>
        <div className="my-6 md:my-0 md:ml-10">
          <NeedHelpComponent />
          <FAQComponent className="my-8" />
        </div>
      </div>
    </>
  );
}

export default UploadDocuments;
