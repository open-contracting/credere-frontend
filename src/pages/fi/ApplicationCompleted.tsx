import { useT } from '@transifex/react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/stories/button/Button';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import useApplicationContext from '../../hooks/useSecureApplicationContext';

function ApplicationCompleted() {
  const t = useT();
  const navigate = useNavigate();
  const applicationContext = useApplicationContext();
  const application = applicationContext.state.data;

  const onGoHomeHandler = () => {
    navigate('/');
  };

  const onDownloadApplication = () => {
    // eslint-disable-next-line no-console
    console.log('download application');
  };

  return (
    <div className="xl:w-4/5">
      <Title type="page" label={t('Application Completed')} className="mb-4" />
      <Text className="text-lg mb-10">{application?.borrower.legal_name}</Text>

      <Text className="mb-4">{t('This application has been completed.')}</Text>

      <div className="mt-4 md:mb-4 grid grid-cols-1 gap-4 md:flex md:gap-0">
        <div>
          <Button primary={false} className="md:mr-4" label={t('Back to home')} onClick={onGoHomeHandler} />
        </div>
        <div>
          <Button disabled label={t('Download application')} onClick={onDownloadApplication} />
        </div>
      </div>
      <Text className="mb-10 text-sm font-light">
        {t('Data for the MSME application will only be stored for one week after the process has been completed. ')}
      </Text>
    </div>
  );
}

export default ApplicationCompleted;
