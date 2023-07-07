 
import { useT } from '@transifex/react';
import { useNavigate } from 'react-router-dom';
import StepImage from 'src/assets/pages/stage-five.svg';
import useApplicationContext from 'src/hooks/useSecureApplicationContext';
import Button from 'src/stories/button/Button';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

export function StageFiveApproved() {
  const t = useT();
  const navigate = useNavigate();
  const applicationContext = useApplicationContext();
  const application = applicationContext.state.data;

  const onDownloadApplication = () => {
    // eslint-disable-next-line no-console
    console.log('download application');
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
          <Button primary={false} className="md:mr-4" label={t('Back to home')} onClick={onGoHomeHandler} />
        </div>
        <div>
          <Button disabled label={t('Download application')} onClick={onDownloadApplication} />
        </div>
      </div>
    </>
  );
}

export default StageFiveApproved;
