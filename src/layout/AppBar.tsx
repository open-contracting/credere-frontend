import { Box, Container, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { useT } from '@transifex/react';
import { Link } from 'react-router-dom';

import OCPLogo from '../assets/ocp-logo.svg';
import { Button } from '../stories/button/Button';

export interface AppBarProps {
  // eslint-disable-next-line react/require-default-props
  auth?: boolean;
  // eslint-disable-next-line react/require-default-props
  logout?: () => void | undefined;
}

export function AppBar({ auth = true, logout }: AppBarProps) {
  const t = useT();
  return (
    <MuiAppBar position="static" className="bg-darkest" elevation={0}>
      <Container maxWidth={false} className="lg:pl-20 md:pl-12 sm:pl-10 pl-6 mx-0">
        <Toolbar disableGutters sx={{ height: '100px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            <img src={OCPLogo} alt="logo" />
          </Link>

          <>
            {auth && !!logout && (
              <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                <Button size="small" label={t('Logout')} onClick={() => logout()} />
              </Box>
            )}
            {!auth && (
              <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                <Button size="small" label={t('Login')} component={Link} to="/login" />
              </Box>
            )}
          </>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}

export default AppBar;
