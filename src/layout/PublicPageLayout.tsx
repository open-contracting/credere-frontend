import { Container } from '@mui/material';
import { PropsWithChildren } from 'react';

import BaseLayout from './BaseLayout';

export default function PublicPageLayout({ children }: PropsWithChildren) {
  return (
    <BaseLayout>
      <Container className="lg:pt-16 lg:pl-20 md:pt-10 md:pl-12 sm:pt-9 sm:pl-10 pt-8 pl-6 mx-0">{children}</Container>
    </BaseLayout>
  );
}
