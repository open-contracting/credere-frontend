/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useT } from '@transifex/react';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import StepImageEN from 'src/assets/pages/en/stage-five.svg';
import StepImageES from 'src/assets/pages/es/stage-five.svg';
import useApplicationContext from 'src/hooks/useSecureApplicationContext';
import Button from 'src/stories/button/Button';
import Checkbox from 'src/stories/checkbox/Checkbox';
import FormInput from 'src/stories/form-input/FormInput';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import CreditProductReview from '../../components/CreditProductReview';
import useApproveApplication from '../../hooks/useApproveApplication';
import useLangContext from '../../hooks/useLangContext';
import { ApproveApplicationInput, FormApprovedInput, approveSchema } from '../../schemas/application';
import RejectApplicationDialog from './RejectApplicationDialog';

export function StageFive() {
  const t = useT();
  const navigate = useNavigate();
  const applicationContext = useApplicationContext();
  const application = applicationContext.state.data;
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const langContext = useLangContext();
  const StepImage = langContext.state.selected.startsWith('en') ? StepImageEN : StepImageES;

  const { approveApplicationMutation, isLoading } = useApproveApplication();

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onRejectApplication = () => {
    setOpenDialog(true);
  };

  const methods = useForm<FormApprovedInput>({
    resolver: zodResolver(approveSchema),
  });

  const { handleSubmit } = methods;

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

  const onGoBackHandler = () => {
    navigate('../stage-four');
  };

  return (
    <>
      <Title type="page" label={t('Application Approval Process')} className="mb-4" />
      <Text className="text-lg mb-12">{application?.borrower.legal_name}</Text>
      <img className="mb-14 ml-8" src={StepImage} alt="step" />
      <Title type="section" label={t('Stage 5: Approve')} className="mb-8" />

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
              <Button primary={false} className="md:mr-4" label={t('Go Back')} onClick={onGoBackHandler} />
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
      <RejectApplicationDialog open={openDialog} handleClose={handleClose} />
    </>
  );
}

export default StageFive;
