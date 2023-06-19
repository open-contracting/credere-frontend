import useUser from 'src/hooks/useUser';
import HomeFI from 'src/pages/fi/HomeFI';
import HomeOCP from 'src/pages/ocp/HomeOCP';

function AppHome() {
  const user = useUser();

  return (
    <>
      {user?.type === 'OCP' && <HomeOCP />}
      {user?.type === 'FI' && <HomeFI />}
    </>
  );
}

export default AppHome;
