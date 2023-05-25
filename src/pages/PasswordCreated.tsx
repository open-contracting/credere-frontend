import { Link } from 'react-router-dom';

import { Button } from '../stories/button/Button';
import Text from '../stories/text/Text';
import Title from '../stories/title/Title';

function PasswordCreated() {
  return (
    <>
      <Title type="page" label="Password Set" className="mb-8" />
      <Text>Thank you for setting up your Credere account.</Text>
      <Text className="mb-8"> Please login to start reviewing and approving credit applications from MSMEs.</Text>
      <Button label="Login" component={Link} to="/login" />
    </>
  );
}

export default PasswordCreated;
