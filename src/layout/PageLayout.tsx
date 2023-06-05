import { Container } from '@mui/material';
import { PropsWithChildren } from 'react';

import useSignOut from '../hooks/useLogout';
import useUser from '../hooks/useUser';
import BaseLayout from './BaseLayout';

export default function AuthPageLayout({ children }: PropsWithChildren) {
  const user = useUser();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut();
  };

  return (
    <BaseLayout auth={!!user} logout={handleLogout}>
      <Container className="lg:pt-16 lg:px-20 md:pt-10 md:px-12 sm:pt-9 sm:px-10 pt-8 px-6 mx-0">{children}</Container>
    </BaseLayout>
  );
}
