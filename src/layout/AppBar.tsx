import { Box, Container, Toolbar, useMediaQuery } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { useT } from '@transifex/react';
import { Link } from 'react-router-dom';

import OCPLogo from '../assets/ocp-logo.svg';
import SelectLanguageComponent from '../components/SelectLanguageComponent';
import { Button } from '../stories/button/Button';

export interface AppBarProps {
  // eslint-disable-next-line react/require-default-props
  auth?: boolean;
  // eslint-disable-next-line react/require-default-props
  logout?: () => void | undefined;
}

const styleWithMobileLogo = {
  width: '125px',
};

export function AppBar({ auth = true, logout }: AppBarProps) {
  const t = useT();
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <MuiAppBar position="static" className="bg-darkest" elevation={0}>
      <Container maxWidth={false} className="lg:px-20 md:px-12 sm:px-10 px-6 mx-0">
        <Toolbar disableGutters sx={{ height: '100px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            <img style={matches && auth ? {} : styleWithMobileLogo} src={OCPLogo} alt="logo" />
          </Link>

          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
            <SelectLanguageComponent />
            {auth && !!logout && (
              <Button noIcon={!matches} className="ml-2" size="small" label={t('Logout')} onClick={() => logout()} />
            )}
            {!auth && <Button className="ml-2" size="small" label={t('Login')} component={Link} to="/login" />}
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}

export default AppBar;
