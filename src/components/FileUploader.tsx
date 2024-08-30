/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable react/jsx-props-no-spreading */
import { t as tNative } from '@transifex/native';
import { useT } from '@transifex/react';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { ErrorCode, useDropzone } from 'react-dropzone';
import Cloud from 'src/assets/icons/cloud.svg';
import Button from 'src/stories/button/Button';
import Text from 'src/stories/text/Text';

import { Progress } from '../stories/loader/Loader';

interface FileUploaderProps {
  className?: string;
  loading: boolean;
  onAcceptedFile: (file: File) => void;
}

const maxSizeMB = import.meta.env.VITE_MAX_FILE_SIZE_MB;

const fileUploadErrorsMap = {
  [ErrorCode.TooManyFiles]: tNative('Only one file can be uploaded'),
  [ErrorCode.FileInvalidType]: tNative('File type is not supported'),
  [ErrorCode.FileTooLarge]: tNative('File is larger than {maxSizeMB} MB', { maxSizeMB }),
};

export function FileUploader({ className, loading, onAcceptedFile }: FileUploaderProps) {
  const t = useT();
  const { enqueueSnackbar } = useSnackbar();

  const { getRootProps, getInputProps, open, isDragActive, isDragAccept, isDragReject, acceptedFiles, fileRejections } =
    useDropzone({
      accept: {
        'image/*': ['.jpeg', '.png'],
        'application/pdf': ['.pdf'],
        'application/octet-stream': ['.zip'],
      },
      maxFiles: 1,
      maxSize: maxSizeMB * 1024 * 1024,
    });

  useEffect(() => {
    acceptedFiles.forEach((file) => {
      onAcceptedFile(file);
    });
  }, [acceptedFiles, onAcceptedFile]);

  useEffect(() => {
    fileRejections.forEach((file) => {
      let errorMessage = '';
      file.errors.forEach((error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (fileUploadErrorsMap[error.code]) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          errorMessage += `${t(fileUploadErrorsMap[error.code])}.\n`;
        } else {
          errorMessage += `${error.message}.\n`;
        }
      });
      enqueueSnackbar(t('File not uploaded: {errorMessage}', { errorMessage }), {
        variant: 'error',
      });
    });
  }, [fileRejections, enqueueSnackbar, t]);

  return (
    <>
      <div
        {...getRootProps({ className: `dropzone flex items-center justify-center ${className}` })}
        onClick={(e) => e.stopPropagation()}>
        {!loading && (
          <label
            htmlFor="dropzone-file"
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center justify-center w-full h-64 border-1 border-fieldBorder border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="flex flex-row items-center justify-center">
                <img src={Cloud} alt="cloud-icon" />
                <Text className="text-sm font-light mb-0 ml-2">
                  {!isDragActive && t('Drag and drop or click here')}
                  {isDragAccept && t('File will be accepted')}
                  {isDragReject && t('File will be rejected')}
                </Text>
              </div>
              <Button
                noIcon
                primary={false}
                className="mt-4 border border-solid border-fieldBorder"
                label={t('Browse file')}
                onClick={open}
              />
            </div>
            <input id="dropzone-file" type="file" className="hidden" {...getInputProps({ multiple: true })} />
          </label>
        )}
        {loading && <Progress />}
      </div>
      <Text className="text-sm font-light mt-4">
        {t(
          'Accepted formats are PDF, JPEG, PNG and ZIP (if you have more than one document). The maximum file size permitted is {maxSizeMB}MB.',
          { maxSizeMB },
        )}
      </Text>
    </>
  );
}

FileUploader.defaultProps = {
  className: '',
};

export default FileUploader;
