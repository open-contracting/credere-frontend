import { useT } from '@transifex/react';
import NeedHelpComponent from 'src/components/NeedHelpComponent';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

export type ApplicationErrorPageProps = {
  message: string;
};

export function ApplicationErrorPage({ message }: ApplicationErrorPageProps) {
  const t = useT();

  return (
    <>
      <Title type="page" label={t('Something went wrong')} className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">{message || t('An error occurred while processing your request')}</Text>
        </div>
        <div className="my-6 md:my-0 md:ml-10">
          <NeedHelpComponent />
        </div>
      </div>
    </>
  );
}

export default ApplicationErrorPage;
