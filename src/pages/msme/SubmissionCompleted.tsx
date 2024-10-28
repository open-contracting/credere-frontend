import { Link as MUILink } from '@mui/material';
import { useT } from '@transifex/react';
import { Button } from 'src/stories/button/Button';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import useApplicationContext from '../../hooks/useApplicationContext';

function SubmissionCompleted() {
  const t = useT();
  const applicationContext = useApplicationContext();

  return (
    <>
      <Title type="page" label={t('Submission Complete')} className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">
            {t(
              'Thank you for submitting your credit application using Credere, Your application has been sent to {fi_name}.',
              {
                fi_name: applicationContext.state.data?.lender.name,
              },
            )}
          </Text>
          {applicationContext.state.data?.lender.external_onboarding_url &&
          !applicationContext.state.data?.application.borrower_accessed_external_onboarding_at ? (
            <div className="mb-8">
              <Text className="mb-8">
                {t(
                  'The financial institution you chose requires an onboarding process in its systems, please complete the last step by completing the formalization process with {fi_name} by clicking on the following button.',
                  {
                    fi_name: applicationContext.state.data?.lender.name,
                  },
                )}
              </Text>
              <Button
                label={t('Complete the onboarding process')}
                target="_blank"
                rel="noreferrer"
                component={MUILink}
                href={`${applicationContext.state.data?.lender.external_onboarding_url}`}
              />
            </div>
          ) : (
            <div>
              <Text className="mb-8">
                {t(
                  'Pending some checks by {fi_name}, we will be in touch via email to let you know if the application has been approved and tell you the next steps for funds to be disbursed to you.',
                  {
                    fi_name: applicationContext.state.data?.lender.name,
                  },
                )}
              </Text>
            </div>
          )}
          <div>
            <Text className="mb-8">
              {t(
                'In the meantime if you have any questions, you can reach out to member of the Open Contracting Partnership team at: credere@open-contracting.org.',
              )}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubmissionCompleted;
