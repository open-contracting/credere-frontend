import { useT } from '@transifex/react';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import DashboardItemContainer from '../../stories/dashboard/DashboardItemContainer';

export function HomeFI() {
  const t = useT();

  return (
    <>
      <Title type="page" label={t('Home - Dashboard & MSME Applications')} className="mb-8" />
      <Text className="mb-8">
        {t(
          'The purpose of Credere is to provide micro, small and medium sized businesses (MSMEs) in Colombia that have been awarded a public sector contract access to credit.',
        )}
      </Text>
      <Text className="mb-8">
        {t(
          'Credere has been developed help you review the data from the open contracting process in conjunction with the MSME applications for credit.',
        )}
      </Text>
      <Title type="section" label={t('Dashboard')} className="mb-6" />
      <div className="grid lg:gap-10 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <div className="col-span-1">
          <DashboardItemContainer description={t('Application(s) received')} value="15" />
        </div>
        <div className="col-span-1">
          <DashboardItemContainer description={t('Application(s) in progress')} value="17" />
        </div>
        <div className="col-span-1">
          <DashboardItemContainer description={t('Application(s) approved')} value="59" />
        </div>
        <div className="col-span-1">
          <DashboardItemContainer color="red" description={t('Application(s) declined')} value="1" />
        </div>
      </div>
      <div className="grid lg:gap-10 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <div className="col-span-1">
          <DashboardItemContainer description={t('Applications with credit disbursed')} value="15" />
        </div>
        <div className="col-span-1">
          <DashboardItemContainer description={t('Approved applications with credit disbursed')} value="62%" />
        </div>
        <div className="col-span-1">
          <DashboardItemContainer color="red" description={t('Application(s) overdue')} value="59" />
        </div>
        <div className="col-span-1">
          <DashboardItemContainer
            color="red"
            description={t('Average time to process an application')}
            value="5.5 days"
          />
        </div>
      </div>
      <Title type="section" label={t('MSME applications')} className="mb-6 mt-4" />
      <Text className="mb-8">
        {t(
          'Approve applications by selecting the start or continue options. Completed applications are only stored for one week after approval.',
        )}
      </Text>
    </>
  );
}

export default HomeFI;
