import { Link as MUILink } from '@mui/material';
import { useT } from '@transifex/react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/stories/button/Button';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import FAQComponent from '../../components/FAQComponent';
import useLocalizedDateFormatter from '../../hooks/useLocalizedDateFormatter';

function TermsAndConditions() {
  const t = useT();
  const navigate = useNavigate();
  const dateUpdate = new Date();
  const { formatDate } = useLocalizedDateFormatter();

  return (
    <>
      <Title type="page" label={t('Terms and Conditions')} className="mb-4" />
      <Text className="text-sm mb-12">
        {t('Last Revised:')} {formatDate(dateUpdate)}
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-8">
            {t(
              'Welcome to Credere. Because the Terms and Conditions contain legal obligations, please read them carefully.',
            )}
          </Text>
          <Title type="subsection" label={t('1. YOUR AGREEMENT')} className="mb-4" />
          <Text className="mb-8">
            {t(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue nisi vitae suscipit tellus mauris. Euismod elementum nisi quis eleifend quam adipiscing. Condimentum id venenatis a condimentum vitae sapien. Vitae elementum curabitur vitae nunc sed velit dignissim. Rhoncus est pellentesque elit ullamcorper dignissim cras. Massa id neque aliquam vestibulum morbi blandit cursus risus. Eget aliquet nibh praesent tristique magna. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Consectetur adipiscing elit duis tristique sollicitudin. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Purus in mollis nunc sed.',
            )}
          </Text>

          <Title type="subsection" label={t('2. PRIVACY')} className="mb-4" />
          <Text className="mb-8">
            {t(
              'Non pulvinar neque laoreet suspendisse interdum. Nec feugiat in fermentum posuere urna nec. Dapibus ultrices in iaculis nunc sed augue. Neque gravida in fermentum et sollicitudin ac. Mattis aliquam faucibus purus in. Ac felis donec et odio pellentesque. Tortor at risus viverra adipiscing at in tellus. Vel fringilla est ullamcorper eget. Fames ac turpis egestas maecenas pharetra. Lectus mauris ultrices eros in cursus. Sapien faucibus et molestie ac feugiat. Lacus sed turpis tincidunt id aliquet risus. Libero nunc consequat interdum varius sit amet mattis.',
            )}
          </Text>

          <Title type="subsection" label={t('3. LINKED SITES')} className="mb-4" />
          <Text className="mb-8">
            {t(
              'Auctor urna nunc id cursus. Tortor consequat id porta nibh venenatis cras sed. Sit amet luctus venenatis lectus magna fringilla. Suscipit tellus mauris a diam maecenas sed enim ut. Tincidunt dui ut ornare lectus. Sem viverra aliquet eget sit. Ultrices vitae auctor eu augue ut lectus arcu bibendum. Odio eu feugiat pretium nibh ipsum consequat. Sit amet est placerat in egestas erat imperdiet. Sapien et ligula ullamcorper malesuada proin libero. Justo nec ultrices dui sapien eget. Dictum at tempor commodo ullamcorper a lacus vestibulum sed. Sem et tortor consequat id porta nibh venenatis cras sed. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus.',
            )}
          </Text>

          <Title type="subsection" label={t('4. FORWARD LOOKING STATEMENTS')} className="mb-4" />
          <Text className="mb-8">
            {t(
              'Nulla posuere sollicitudin aliquam ultrices sagittis orci. Pharetra sit amet aliquam id diam maecenas ultricies. Vestibulum sed arcu non odio euismod lacinia at. Sem et tortor consequat id. Nec nam aliquam sem et tortor consequat id porta. A iaculis at erat pellentesque. Eu consequat ac felis donec et odio pellentesque diam volutpat. Eleifend mi in nulla posuere. Erat nam at lectus urna duis. Diam maecenas sed enim ut sem viverra. Habitant morbi tristique senectus et. Turpis egestas pretium aenean pharetra magna ac. Dui id ornare arcu odio ut sem nulla. Elementum facilisis leo vel fringilla. Faucibus pulvinar elementum integer enim neque.',
            )}
          </Text>

          <Title type="subsection" label={t('5. EXCLUSIONS AND LIMITATIONS')} className="mb-4" />
          <Text className="mb-8">
            {t(
              'Mauris ultrices eros in cursus turpis. Sed risus ultricies tristique nulla. Vitae ultricies leo integer malesuada nunc vel risus commodo. Dignissim enim sit amet venenatis urna cursus. Eget duis at tellus at urna. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Eu consequat ac felis donec et odio pellentesque. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Adipiscing commodo elit at imperdiet dui accumsan. Nulla facilisi cras fermentum odio eu feugiat pretium. Sem fringilla ut morbi tincidunt augue interdum velit euismod.',
            )}
          </Text>

          <Title type="subsection" label={t('6. INTELLECTUAL PROPERTY INFRINGEMENT CLAIMS')} className="mb-4" />
          <Text className="mb-15">
            {t(
              'Sollicitudin aliquam ultrices sagittis orci a. Mattis nunc sed blandit libero. In aliquam sem fringilla ut morbi. Mi sit amet mauris commodo quis imperdiet massa. Rutrum quisque non tellus orci ac auctor augue mauris augue. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Adipiscing enim eu turpis egestas pretium aenean. Risus nullam eget felis eget. Mattis aliquam faucibus purus in massa tempor. Dignissim enim sit amet venenatis urna cursus eget nunc. Turpis in eu mi bibendum neque egestas congue quisque. Vitae tortor condimentum lacinia quis vel eros donec ac. Semper quis lectus nulla at. Blandit libero volutpat sed cras ornare arcu dui. Tellus molestie nunc non blandit massa enim nec.',
            )}
          </Text>

          <div className="mt-5 mb-10 grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button className="md:mr-4" primary={false} label={t('Go back')} onClick={() => navigate(-1)} />
            </div>
            <div>
              <Button
                label={t('Learn more about OCP')}
                target="_blank"
                rel="noreferrer"
                component={MUILink}
                href={`${import.meta.env.VITE_MORE_INFO_OCP_URL || 'https://www.open-contracting.org/es/'}`}
              />
            </div>
          </div>
        </div>
        <div className="my-6 md:my-0 md:ml-10">
          <FAQComponent />
        </div>
      </div>
    </>
  );
}

export default TermsAndConditions;
