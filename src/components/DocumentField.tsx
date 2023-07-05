import { Box } from '@mui/material';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import Text from 'src/stories/text/Text';

import { uploadFileFn } from '../api/public';
import { DOCUMENTS_TYPE } from '../constants';
import useApplicationContext from '../hooks/useApplicationContext';
import { IBorrowerDocument, UploadFileInput } from '../schemas/application';
import LinkButton from '../stories/link-button/LinkButton';
import FileUploader from './FileUploader';

interface DocumentFieldProps {
  className?: string;
  label: string;
  documentType: DOCUMENTS_TYPE;
  setUploadState: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
}

export function DocumentField({ label, documentType, className, setUploadState }: DocumentFieldProps) {
  const t = useT();
  const { enqueueSnackbar } = useSnackbar();
  const [current, setCurrent] = useState<IBorrowerDocument | undefined>();
  const [showUploader, setShowUploader] = useState<boolean>(true);

  const applicationContext = useApplicationContext();

  useEffect(() => {
    if (applicationContext.state.data?.documents) {
      const currentDocument = applicationContext.state.data?.documents.find(
        (document: IBorrowerDocument) => document.type === documentType,
      );

      if (currentDocument) {
        setCurrent(currentDocument);
        setShowUploader(false);
        setUploadState((prev) => ({ ...prev, [documentType]: true }));
      }
    }
  }, [applicationContext.state.data?.documents, documentType, setUploadState]);

  const onAcceptedFile = useCallback(
    async (file: File) => {
      if (applicationContext.state.data?.application?.uuid) {
        const payload: UploadFileInput = {
          file,
          type: documentType,
          uuid: applicationContext.state.data?.application?.uuid,
        };
        try {
          const uploaded = await uploadFileFn(payload);
          setCurrent(uploaded);
          setShowUploader(false);
          setUploadState((prev) => ({ ...prev, [documentType]: true }));
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            if (error.response.data && error.response.data.detail) {
              enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
                variant: 'error',
              });
            }
          } else {
            enqueueSnackbar(t('Error uploading file. {error}', { error }), {
              variant: 'error',
            });
          }
        }
      }
    },
    [applicationContext.state.data?.application?.uuid, documentType, enqueueSnackbar, setUploadState, t],
  );

  return (
    <Box className="mb-8">
      <Text className="mb-4">{label}</Text>
      {current && (
        <Box className="flex flex-row items-center mb-4">
          <Box className="flex flex-col items-start">
            <Text className="mb-0 text-sm">{t('Current uploaded document')}</Text>
            <Text className="mb-0 text-sm font-thin">{current.name}</Text>
          </Box>
          <LinkButton
            className="ml-4 "
            noIcon
            label={showUploader ? t('Keep current') : t('Replace')}
            onClick={() => setShowUploader((prev) => !prev)}
          />
        </Box>
      )}
      {showUploader && <FileUploader className={className} onAcceptedFile={onAcceptedFile} />}
    </Box>
  );
}

DocumentField.defaultProps = {
  className: '',
};

export default DocumentField;
