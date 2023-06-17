import { Container } from '@mui/material';
import useSignOut from 'src/hooks/useLogout';
import useUser from 'src/hooks/useUser';
import BaseLayout from 'src/layout/BaseLayout';
import SettingsOCP from 'src/pages/ocp/SettingsOCP';

function AppSettingsOCP() {
  const user = useUser();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut();
  };

  return (
    <BaseLayout auth={!!user} logout={handleLogout}>
      {user?.type === 'OCP' && (
        <Container className="lg:pt-14 lg:px-20 md:pt-8 md:px-12 sm:pt-7 sm:px-10 pt-6 px-6 pb-4 mx-0">
          <SettingsOCP />
        </Container>
      )}
    </BaseLayout>
  );
}

export default AppSettingsOCP;
