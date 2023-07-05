import { useT } from '@transifex/react';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

export function StageFive() {
  const t = useT();

  return (
    <>
      <Title type="page" label={t('Application Approval Process')} className="mb-8" />

      <Title type="subsection" label={t('DataSketch S.A')} className="mb-8" />
      <img
        src="src/assets/pages/stage-five.svg"
        alt="Stage five"
        style={{ marginBottom: '40px', marginLeft: '30px' }}
      />
      <Title type="section" label={t('Stage 5: Approve')} className="mb-8" />
      <Text className="mb-8">
        {t('Decision:')} <strong>{t('Credit approved pending compliance checks to be completed.')}</strong>
      </Text>
    </>
  );
}

export default StageFive;
