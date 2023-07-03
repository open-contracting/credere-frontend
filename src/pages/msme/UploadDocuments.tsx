import { useT } from '@transifex/react';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import NeedHelpComponent from '../../components/NeedHelpComponent';

function UploadDocuments() {
  const t = useT();

  // const applicationContext = useApplicationContext();

  return (
    <>
      <Title type="page" label={t('Credit Application')} className="mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">
            {t(
              'For your application to be processed, we need a few additional pieces of information. Please attach the required documents. This should take no more than a few minutes of your time.',
            )}
          </Text>
        </div>
        <div className="my-6 md:my-0 md:ml-10">
          <NeedHelpComponent />
        </div>
      </div>
    </>
  );
}

export default UploadDocuments;
