import { useT } from '@transifex/react';
import { useNavigate } from 'react-router-dom';
import StepImage from 'src/assets/pages/stage-four.svg';
import useApplicationContext from 'src/hooks/useSecureApplicationContext';
import Button from 'src/stories/button/Button';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

export function StageFour() {
  const t = useT();
  const navigate = useNavigate();
  const applicationContext = useApplicationContext();
  const application = applicationContext.state.data;

  const onBackHandler = () => {
    navigate('../stage-three');
  };

  const onNextHandler = () => {
    navigate('../stage-five');
  };

  return (
    <>
      <Title type="page" label={t('Application Approval Process')} className="mb-4" />
      <Text className="text-ig mb-12">{application?.borrower.legal_name}</Text>
      <img className="mb-14 ml-8" src={StepImage} alt="step" />
      <Title type="section" label={t('Stage 4: Summary')} className="mb-8" />
      <div className="mt-5 md:mb-8 grid grid-cols-1 gap-4 md:flex md:gap-0">
        <div>
          <Button className="md:mr-4" label={t('Go Back')} onClick={onBackHandler} />
        </div>

        <div>
          <Button label={t('Next')} onClick={onNextHandler} />
        </div>
      </div>
    </>
  );
}

export default StageFour;
