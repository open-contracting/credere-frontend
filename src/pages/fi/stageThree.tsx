import { useT } from '@transifex/react';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

export function StageThree() {
  const t = useT();

  return (
    <>
      <Title type="page" label={t('Application Approval Process')} className="mb-8" />

      <Title type="subsection" label={t('DataSketch S.A')} className="mb-8" />
      <img
        src="src/assets/pages/stage-three.svg"
        alt="Stage three"
        style={{ marginBottom: '40px', marginLeft: '30px' }}
      />
      <Title type="section" label={t('Stage 3: Award Data')} className="mb-8" />
      <Text className="mb-8">{t('Review the data for the SME.')}</Text>
      <Text className="mb-8">
        {t(
          'You can search for any missing information by reviewing data and documents for the contracting process in SECOP II.',
        )}
      </Text>
    </>
  );
}

export default StageThree;
