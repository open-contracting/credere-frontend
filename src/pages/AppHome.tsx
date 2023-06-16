import { Container } from '@mui/material';
import useSignOut from 'src/hooks/useLogout';
import useUser from 'src/hooks/useUser';
import BaseLayout from 'src/layout/BaseLayout';
import HomeFI from 'src/pages/fi/HomeFI';
import HomeOCP from 'src/pages/ocp/HomeOCP';

function AppHome() {
  const user = useUser();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut();
  };

  return (
    <BaseLayout auth={!!user} logout={handleLogout}>
      {user?.type === 'OCP' && (
        <Container className="lg:pt-14 lg:px-20 md:pt-8 md:px-12 sm:pt-7 sm:px-10 pt-6 px-6 pb-4 mx-0">
          <HomeOCP />
        </Container>
      )}
      {user?.type === 'FI' && (
        <Container className="lg:pt-16 lg:px-20 md:pt-10 md:px-12 sm:pt-9 sm:px-10 pt-8 px-6 pb-4 mx-0">
          <HomeFI />
        </Container>
      )}
    </BaseLayout>
  );
}

export default AppHome;
