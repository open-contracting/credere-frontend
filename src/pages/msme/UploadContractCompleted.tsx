import { Link as MUILink } from '@mui/material';
import { useT } from '@transifex/react';
import { Button } from 'src/stories/button/Button';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import useApplicationContext from '../../hooks/useApplicationContext';

function UploadContractCompleted() {
  const t = useT();
  const applicationContext = useApplicationContext();

  return (
    <>
      <Title type="page" label={t('Upload Contract Complete')} className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">
            {t('We have received the signed copy for your contract with {buyer_name} for the award {award_title}.', {
              award_title: applicationContext.state.data?.award.title,
              buyer_name: applicationContext.state.data?.award.buyer_name,
            })}
          </Text>
          <Text className="mb-8">
            {t('The credit provider will now review the contract and reach out to you to release the funds.')}
          </Text>
          <Text className="mb-8">
            {t(
              'In the meantime if you have any questions, you can reach out to member of the Open Contracting Partnership team at: credere@open-contracting.org.',
            )}
          </Text>

          <div className="mt-5 grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button
                className="md:mr-4"
                label={t('Learn more about OCP')}
                target="_blank"
                rel="noreferrer"
                component={MUILink}
                href={`${import.meta.env.VITE_MORE_INFO_OCP_URL || 'https://www.open-contracting.org/es/'}`}
              />
            </div>
          </div>
        </div>
        <div className="my-6 md:my-0 md:ml-10" />
      </div>
    </>
  );
}

export default UploadContractCompleted;
