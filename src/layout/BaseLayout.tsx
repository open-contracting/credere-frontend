import { Container } from '@mui/material';
import { PropsWithChildren } from 'react';

import { AppBar, AppBarProps } from './AppBar';

export default function BaseLayout({ children, auth, logout }: AppBarProps & PropsWithChildren) {
  return (
    <Container
      maxWidth={false}
      className="bg-background p-0 m-0"
      sx={{
        minHeight: '100vh',
      }}>
      <AppBar auth={auth} logout={logout} />
      {children}
    </Container>
  );
}
