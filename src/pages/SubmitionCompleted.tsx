/* eslint-disable no-console */

/* eslint-disable react/jsx-props-no-spreading */
import { useT } from '@transifex/react';

import { Button } from '../stories/button/Button';
import Text from '../stories/text/Text';
import Title from '../stories/title/Title';

function SubmitionCompleted() {
  const t = useT();

  const onCloseWindowHandler = () => {
    window.close();
  };

  return (
    <>
      <Title type="page" label={t('Submission Complete')} className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">
            {t(
              'Thank you for submitting your credit application using Credere, Your application has been sent to {fi_name}.',
              {
                fi_name: 'FI Name',
              },
            )}
          </Text>
          <Text className="mb-8">
            {t(
              'Pending some checks by {fi_name}, we will be in touch via email to let you know if the application has been approved and tell you the next steps for funds to be disbursed to you.',
              {
                fi_name: 'FI Name',
              },
            )}
          </Text>
          <Text className="mb-8">
            {t(
              'In the meantime if you have any questions, you can reach out to member of the Open Contracting Partnership team at: credere@open-contracting.org.',
            )}
          </Text>

          <div className="mt-5 grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button className="md:mr-4" label={t('Close window')} onClick={onCloseWindowHandler} />
            </div>
          </div>
        </div>
        <div className="my-6 md:my-0 md:ml-10" />
      </div>
    </>
  );
}

export default SubmitionCompleted;
