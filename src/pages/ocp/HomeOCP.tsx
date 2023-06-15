import { useT } from '@transifex/react';
import { Link } from 'react-router-dom';
import Button from 'src/stories/button/Button';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

export function HomeOCP() {
  const t = useT();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-end col-span-1 md:col-span-2 md:mr-10">
          <Title className="mb-0" type="page" label={t('Home - Dashbaord')} />
        </div>
        <div className="my-6 md:my-0 md:ml-10">
          <div className="grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button className="md:mr-4" label={t('MSME Applications')} component={Link} to="/admin/applications" />
            </div>

            <div>
              <Button label={t('Settings')} component={Link} to="/admin/settings" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">{t('MSME opt-in statistics')}</Text>
        </div>
        <div className="my-6 md:my-0 md:ml-10" />
      </div>
    </>
  );
}

export default HomeOCP;
