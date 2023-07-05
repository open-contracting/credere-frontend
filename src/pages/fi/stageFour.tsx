import { useT } from '@transifex/react';
import Title from 'src/stories/title/Title';

export function StageFour() {
  const t = useT();

  return (
    <>
      <Title type="page" label={t('Application Approval Process')} className="mb-8" />

      <Title type="subsection" label={t('DataSketch S.A')} className="mb-8" />
      <img
        src="src/assets/pages/stage-four.svg"
        alt="Stage four"
        style={{ marginBottom: '40px', marginLeft: '30px' }}
      />
      <Title type="section" label={t('Stage 4: Summary')} className="mb-8" />
    </>
  );
}

export default StageFour;
