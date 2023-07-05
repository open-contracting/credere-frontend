import { useT } from '@transifex/react';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

export function StageTwo() {
  const t = useT();

  return (
    <>
      <Title type="page" label={t('Application Approval Process')} className="mb-8" />

      <Title type="subsection" label={t('DataSketch S.A')} className="mb-8" />
      <img src="src/assets/pages/stage-two.svg" alt="Stage two" style={{ marginBottom: '40px', marginLeft: '30px' }} />
      <Title type="section" label={t('Stage 2: MSME Documents')} className="mb-8" />
      <Text className="mb-8">
        {t('Review and verify the data for the MSME. Where information is missing it can be edited manually.')}
      </Text>
      <Text className="mb-8">
        {t(
          'If a document looks incorrect or is not clearly visible, contact the MSME and ask them to provide the document again.',
        )}
      </Text>
    </>
  );
}

export default StageTwo;
