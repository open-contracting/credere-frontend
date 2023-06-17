/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useT } from '@transifex/react';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ProviderInput, checkProviderSchema } from 'src/schemas/OCPsettings';
import Button from 'src/stories/button/Button';
import Checkbox from 'src/stories/checkbox/Checkbox';
import FormInput from 'src/stories/form-input/FormInput';
import FormSelect from 'src/stories/form-select/FormSelect';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

export function SettingsOCP() {
  const t = useT();

  const methods = useForm<ProviderInput>({
    resolver: zodResolver(checkProviderSchema),
  });
  const {
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const [microChecked, smallChecked, mediumChecked] = watch(['Micro', 'Small', 'Medium']);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<ProviderInput> = (values) => {
    if (!(values.Micro || values.Small || values.Medium)) {
      alert('Please select at least one MSME type.');
      return;
    }
    console.log(values);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-end col-span-1 md:col-span-2 md:mr-10">
          <Title className="mb-0" type="page" label={t('Settings')} />
        </div>
        <div className="my-6 md:my-0 md:ml-10">
          <div className="grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button className="md:mr-4" label={t('Dashboard')} component={Link} to="/admin/settings" />
            </div>

            <div>
              <Button label={t('MSME Applications')} component={Link} to="/admin/applications" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Title className="mb-0" label={t('Add New Credit Provider')} />
      </div>

      <Text className="mb-8">{t('Credit provider name (as you want it to appear in the Credere UI)')}</Text>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete="off"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { sm: '480px' },
            borderRadius: 0,
          }}>
          <FormInput name="creditProviderName" placeholder={t('Credit provider name')} />
          <Text className="mb-8">{t('Select the credit provider type')}</Text>
          <FormSelect
            name="creditProviderType"
            options={['Financiera', 'Banco', 'Cooperativa']}
            placeholder={t('Type')}
          />
          <Text className="mb-8">
            {t('Select all of the types of MSMEs the credit provider is willing to offer credit to')}
          </Text>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
            }}>
            <Checkbox label={t('0 to 10')} name="Micro" />
            <Checkbox label={t('11 to 50')} name="Small" />
            <Checkbox label={t('51 to 200')} name="Medium" />
          </Box>
          {microChecked && (
            <>
              <Text className="mb-8">
                {t(
                  'Enter the lower and upper limits that the credit provider will be willing to offer to a micro business',
                )}
              </Text>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                }}>
                <FormInput name="MicroLower" placeholder={t('Col$')} type="number" />
                <FormInput name="MicroUpper" placeholder={t('Col$')} type="number" />
              </Box>
            </>
          )}
          {smallChecked && (
            <>
              <Text className="mb-8">
                {t(
                  'Enter the lower and upper limits that the credit provider will be willing to offer to a small business',
                )}
              </Text>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                }}>
                <FormInput name="SmallLower" placeholder={t('Col$')} type="number" />
                <FormInput name="SmallUpper" placeholder={t('Col$')} type="number" />
              </Box>
            </>
          )}
          {mediumChecked && (
            <>
              <Text className="mb-8">
                {t(
                  'Enter the lower and upper limits that the credit provider will be willing to offer to a medium business',
                )}
              </Text>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                }}>
                <FormInput name="MediumLower" placeholder={t('Col$')} type="number" />
                <FormInput name="MediumUpper" placeholder={t('Col$')} type="number" />
              </Box>
            </>
          )}

          <Button className="mb-10" label={t('Add New Credit Provider')} type="submit" />
        </Box>
      </FormProvider>
    </>
  );
}

export default SettingsOCP;
