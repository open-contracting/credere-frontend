/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useT } from '@transifex/react';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import StepImage from 'src/assets/pages/stage-five.svg';
import useApplicationContext from 'src/hooks/useSecureApplicationContext';
import Button from 'src/stories/button/Button';
import Checkbox from 'src/stories/checkbox/Checkbox';
import FormInput from 'src/stories/form-input/FormInput';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import CreditProductReview from '../../components/CreditProductReview';
import DocumentField from '../../components/DocumentField';
import { APPLICATION_STATUS, DOCUMENTS_TYPE } from '../../constants';
import useApproveApplication from '../../hooks/useApproveApplication';
import { ApproveApplicationInput, FormApprovedInput, approveSchema } from '../../schemas/application';

export function StageFive() {
  const t = useT();
  const navigate = useNavigate();
  const applicationContext = useApplicationContext();
  const application = applicationContext.state.data;
  const [approvedApplication, setApprovedApplication] = useState(false);

  const { approveApplicationMutation, isLoading, isError } = useApproveApplication();

  useEffect(() => {
    if (application?.status === APPLICATION_STATUS.APPROVED) {
      setApprovedApplication(true);
    }
  }, [application]);

  const onRejectApplication = () => {
    navigate('../stage-one');
  };

  const onDownloadApplication = () => {
    // eslint-disable-next-line no-console
    console.log('download application');
  };

  const methods = useForm<FormApprovedInput>({
    resolver: zodResolver(approveSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitSuccessful },
  } = methods;

  const [compliantChecksCompletedWatch, compliantChecksPassWatch] = watch([
    'compliant_checks_completed',
    'compliant_checks_passed',
  ]);

  useEffect(() => {
    if (isSubmitSuccessful && !isError && !isLoading) {
      setApprovedApplication(true);
    }
  }, [isSubmitSuccessful, isError, isLoading]);

  const onSubmitHandler: SubmitHandler<FormApprovedInput> = (values) => {
    if (applicationContext.state.data?.id) {
      const payload: ApproveApplicationInput = {
        ...values,
        application_id: applicationContext.state.data?.id,
      };
      approveApplicationMutation(payload);
    }
  };

  const onGoHomeHandler = () => {
    navigate('/');
  };

  return (
    <>
      <Title type="page" label={t('Application Approval Process')} className="mb-4" />
      <Text className="text-lg mb-12">{application?.borrower.legal_name}</Text>
      <img className="mb-14 ml-8" src={StepImage} alt="step" />
      <Title type="section" label={t('Stage 5: Approve')} className="mb-8" />
      {!approvedApplication && (
        <>
          <Text className="mb-4">
            {t('Decision:')}{' '}
            <strong>
              {t('Credit approved')}
              {!compliantChecksCompletedWatch || !compliantChecksPassWatch
                ? ` ${t('pending compliance checks to be completed.')}`
                : '.'}
            </strong>
          </Text>

          {application && <CreditProductReview className="md:w-3/5" application={application} />}

          <FormProvider {...methods}>
            <Box
              className="mt-8"
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              autoComplete="off"
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Checkbox
                name="compliant_checks_completed"
                defaultValue={false}
                label={t('Compliance checks have been completed for {legal_name} and all company directors', {
                  legal_name: application?.borrower.legal_name,
                })}
              />
              <Checkbox
                className="mb-8"
                name="compliant_checks_passed"
                defaultValue={false}
                label={t('{legal_name} has passed compliance checks', { legal_name: application?.borrower.legal_name })}
              />
              <DocumentField
                secure
                className="md:w-2/5"
                label={t('Attach the compliance report here (optional)')}
                documentType={DOCUMENTS_TYPE.COMPLIANCE_REPORT}
              />
              <FormInput
                multiline
                rows={4}
                className="w-3/5"
                name="additional_comments"
                label={t('Add any additional comments here (optional)')}
                big={false}
              />
              <div className="mt-6 md:mb-8 grid grid-cols-1 gap-4 md:flex md:gap-0">
                <div>
                  <Button primary={false} className="md:mr-4" label={t('Go Home')} onClick={onGoHomeHandler} />
                </div>

                <div>
                  <Button className="md:mr-4" label={t('Approve')} type="submit" disabled={isLoading} />
                </div>

                <div>
                  <Button label={t('Reject')} onClick={onRejectApplication} disabled={isLoading} />
                </div>
              </div>
            </Box>
          </FormProvider>
        </>
      )}
      {approvedApplication && (
        <>
          <Text className="mb-4">
            {t('The credit application has been approved. The SME will be notified by email shortly.')}
          </Text>
          <Text className="mb-8">
            {t(
              "Once the contract between the MSME and the buyer has been signed the funds can be arranged to be transferred to the MSME's business bank account.",
            )}
          </Text>
          <div className="mt-6 md:mb-8 grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button primary={false} className="md:mr-4" label={t('Go Home')} onClick={onGoHomeHandler} />
            </div>
            <div>
              <Button disabled label={t('Download application')} onClick={onDownloadApplication} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default StageFive;
