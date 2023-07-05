import { useT } from '@transifex/react';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

export function StageOne() {
  const t = useT();

  return (
    <>
      <Title type="page" label={t('Application Approval Process')} className="mb-8" />

      <Title type="subsection" label={t('DataSketch S.A')} className="mb-8" />
      <img src="src/assets/pages/stage-one.svg" alt="Stageone" style={{ marginBottom: '40px', marginLeft: '30px' }} />
      <Title type="section" label={t('Stage 1: MSME Information')} className="mb-8" />
      <Text className="mb-8">
        {t('Review and verify the data for the MSME. Where information is missing it can be edited manually.')}
      </Text>
      <Text className="mb-8">
        {t(
          'You can search for any missing information by reviewing data and documents for the contracting process in SECOP II.',
        )}
      </Text>
    </>
  );
}

export default StageOne;
