/* eslint-disable no-console */

/* eslint-disable react/jsx-props-no-spreading */
import { useT } from '@transifex/react';
import { useNavigate } from 'react-router-dom';

import NeedHelpComponent from '../components/NeedHelpComponent';
import { Button } from '../stories/button/Button';
import Text from '../stories/text/Text';
import Title from '../stories/title/Title';

function ViewCreditOptions() {
  const t = useT();
  const navigate = useNavigate();

  const onNextHandler = () => {
    navigate('../submition-completed');
  };

  return (
    <>
      <Title type="page" label={t('View Credit Options')} className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">
            {t(
              'Select view for the different credit options to review details for monthly repayments you will need to make for the option.',
            )}
          </Text>

          <div className="mt-5 grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button className="md:mr-4" label={t('Next')} onClick={onNextHandler} />
            </div>
          </div>
        </div>
        <div className="my-6 md:my-0 md:ml-10">
          <NeedHelpComponent />
        </div>
      </div>
    </>
  );
}

export default ViewCreditOptions;
