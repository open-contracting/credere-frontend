import { useT } from '@transifex/react';
import { useMemo, useState } from 'react';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import DocumentField from '../../components/DocumentField';
import FAQComponent from '../../components/FAQComponent';
import NeedHelpComponent from '../../components/NeedHelpComponent';
import { APPLICATION_STATUS, DOCUMENTS_TYPE } from '../../constants';
import useApplicationContext from '../../hooks/useApplicationContext';
import useSubmitAdditionalData from '../../hooks/useSubmitAdditionalData';
import useSubmitApplication from '../../hooks/useSubmitApplication';
import Button from '../../stories/button/Button';

function UploadDocuments() {
  const t = useT();
  const { isLoading, submitApplicationMutation } = useSubmitApplication();
  const { isLoading: isLoadingAdditionalData, submitAdditionalDataMutation } = useSubmitAdditionalData();
  const applicationContext = useApplicationContext();
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
      submitApplicationMutation({ uuid: applicationContext.state.data?.application.uuid });
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
          <div className="mt-6 md:mb-8 grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button className="md:mr-4" label={t('Back')} />
            </div>

            <div>
              <Button
                label={t('Submit Application')}
                onClick={submitApplicationHandler}
                disabled={!allUploaded || isLoading || isLoadingAdditionalData}
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
