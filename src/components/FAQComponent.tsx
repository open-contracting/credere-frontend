import { useT } from '@transifex/react';
import { Link } from 'react-router-dom';

import FAQContainer from '../stories/faq/FAQContainer';
import FAQSection from '../stories/faq/FAQSection';
import LinkButton from '../stories/link-button/LinkButton';

export function FAQComponent() {
  const t = useT();
  return (
    <FAQContainer>
      <FAQSection title={t('What is the MSME credit scheme?')}>
        {t(
          'Guaranteed loans give high-risk borrowers a way to access financing, and provide protection for the lender.',
        )}
      </FAQSection>
      <FAQSection title={t('Why am I being offered credit?')}>
        {t(
          'The City of Bogota is trying to encourage more SME participation in public sector contracts. Your businesses was identified as an SME.',
        )}
      </FAQSection>
      <FAQSection className="border-b-0 pb-1" title={t('Who is involved in this scheme?')}>
        {t(
          'This project is being run by the Open Contracting Partnership in conjunction with Mastercard. We have partnered with Colombian banks such as Bancolombia who are providing the credit offer.',
        )}
      </FAQSection>
      <LinkButton className="ml-1 mb-2" label={t('View all FAQs')} component={Link} to="/frequently-asked-questions" />
    </FAQContainer>
  );
}

export default FAQComponent;
