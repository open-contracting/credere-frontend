/* eslint-disable camelcase */

/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Link as MUILink } from '@mui/material';
import { useT } from '@transifex/react';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import WarnRed from '../../assets/icons/warn-red.svg';
import { DOCUMENTS_TYPE } from '../../constants';
import useCompleteApplication from '../../hooks/useCompleteApplication';
import useDownloadApplication from '../../hooks/useDownloadApplication';
import useDownloadDocument from '../../hooks/useDownloadDocument';
import useApplicationContext from '../../hooks/useSecureApplicationContext';
import { FormCompleteApplicationInput, IBorrowerDocument, completeApplicationSchema } from '../../schemas/application';
import Button from '../../stories/button/Button';
import FormInput from '../../stories/form-input/FormInput';
import LinkButton from '../../stories/link-button/LinkButton';
import RejectApplicationDialog from './RejectApplicationDialog';

function ReviewContract() {
  const t = useT();
  const navigate = useNavigate();
  const { isLoading, completeApplicationMutation } = useCompleteApplication();
  const applicationContext = useApplicationContext();
  const application = applicationContext.state.data;
  const [idToDownloadApplication, setIdToDownloadApplication] = useState<number | undefined>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { downloadedApplication, isLoading: isLoadingDownload } = useDownloadApplication(idToDownloadApplication);

  const onDownloadApplicationHandler = useCallback(() => {
    setIdToDownloadApplication(application?.id);
  }, [setIdToDownloadApplication, application?.id]);

  const [idToDownload, setIdToDownload] = useState<number | undefined>();
  const [contract, setContract] = useState<IBorrowerDocument | undefined>();

  const { downloadedDocument, isLoading: isLoadingDocument } = useDownloadDocument(idToDownload);

  const borrower_documents = application?.borrower_documents;

  const onDownloadContract = () => {
    setIdToDownload(contract?.id);
  };

  const onRejectApplication = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (borrower_documents) {
      const document = borrower_documents?.find(
        (doc: IBorrowerDocument) => doc.type === DOCUMENTS_TYPE.SIGNED_CONTRACT,
      );
      setContract(document);
    }
  }, [borrower_documents]);

  useEffect(() => {
    if (downloadedDocument && contract) {
      const href = window.URL.createObjectURL(downloadedDocument);

      const anchorElement = document.createElement('a');

      anchorElement.href = href;
      anchorElement.download = contract.name;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
      setIdToDownload(undefined);
    }
  }, [downloadedDocument, contract]);

  useEffect(() => {
    if (downloadedApplication) {
      const href = window.URL.createObjectURL(downloadedApplication);

      const anchorElement = document.createElement('a');

      anchorElement.href = href;
      const filename = `${t('application')}-${application?.borrower.legal_identifier}.zip`;
      anchorElement.download = filename;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
      setIdToDownloadApplication(undefined);
    }
  }, [application?.borrower.legal_identifier, downloadedApplication, t]);

  const onGoHomeHandler = () => {
    navigate('/');
  };

  const methods = useForm<FormCompleteApplicationInput>({
    resolver: zodResolver(completeApplicationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<FormCompleteApplicationInput> = (values) => {
    if (application?.id) {
      completeApplicationMutation({ application_id: application.id, ...values });
    }
  };

  return (
    <div className="xl:w-4/5">
      <Title type="page" label={t('Review MSME Contract')} className="mb-4" />
      <Text className="text-lg mb-10">{application?.borrower.legal_name}</Text>

      <Text className="mb-8">
        {t('Review the signed contract uploaded by {buyer_name} for the public sector {tender_title}.', {
          tender_title: applicationContext.state.data?.award.title,
          buyer_name: applicationContext.state.data?.award.buyer_name,
        })}
      </Text>
      <Text className="mb-4">
        {t(
          'The contract can also be viewed in SECOP II, but the information and documents can take a few days to be updated in that system.',
        )}
      </Text>
      <div className="mt-4 mb-4 grid grid-cols-1 md:flex md:gap-6">
        <div>
          <LinkButton
            className="mb-2 px-1"
            onClick={onDownloadContract}
            label={t('Download contract')}
            disabled={isLoadingDocument}
          />
        </div>
        <div>
          <LinkButton
            className="mb-2 px-1"
            target="_blank"
            rel="noreferrer"
            label={t('View data in SECOP II')}
            component={MUILink}
            href={`${application?.award.source_url}`}
          />
        </div>
      </div>

      <FormProvider {...methods}>
        <Box
          component="form"
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete="off">
          <FormInput
            className="md:w-2/5"
            label={t('Enter the credit final amount')}
            helperText={t(
              'The final credit amount can be different if the contract value is significantly different to the award value.',
            )}
            name="disbursed_final_amount"
            big={false}
            type="currency"
            placeholder={t('Credit amount')}
          />
          <Text className="mb-4 mt-4">
            {t(
              "Once the contract has been reviewed, mark the application as 'Credit ready' to complete the process in Credere.",
            )}
          </Text>

          <div className="mt-6 md:mb-8 grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button primary={false} className="md:mr-4" label={t('Back to home')} onClick={onGoHomeHandler} />
            </div>
            <div>
              <Button
                className="md:mr-4"
                label={t('Credit ready')}
                type="submit"
                disabled={isLoading || isLoadingDocument || isLoadingDownload}
              />
            </div>
            <div>
              <Button
                className="md:mr-4"
                label={t('Reject')}
                icon={WarnRed}
                onClick={onRejectApplication}
                disabled={isLoading || isLoadingDocument || isLoadingDownload}
              />
            </div>
            <div>
              <Button
                disabled={isLoadingDownload}
                label={t('Download application')}
                onClick={onDownloadApplicationHandler}
              />
            </div>
          </div>
          <Text className="mb-10 text-sm font-light">
            {t('Data for the MSME application will only be stored for one week after the process has been completed. ')}
          </Text>
        </Box>
      </FormProvider>
      <RejectApplicationDialog open={openDialog} handleClose={handleClose} />
    </div>
  );
}

export default ReviewContract;
