import Text from '../stories/text/Text';
import Title from '../stories/title/Title';

function App() {
  return (
    <>
      <Title type="page" label="Credere" />
      <Text>Version {import.meta.env.VITE_APP_VERSION}</Text>
    </>
  );
}

export default App;
