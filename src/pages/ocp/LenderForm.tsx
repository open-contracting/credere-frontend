/* eslint-disable no-console */

/* eslint-disable camelcase */

/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ProviderInput, checkProviderSchema } from 'src/schemas/OCPsettings';
import Button from 'src/stories/button/Button';
import Checkbox from 'src/stories/checkbox/Checkbox';
import FormInput, { FormInputError } from 'src/stories/form-input/FormInput';
import FormSelect from 'src/stories/form-select/FormSelect';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';
import { z } from 'zod';

import { getLenderFn } from '../../api/private';
import { LENDER_TYPES, MSME_TYPES, MSME_TYPES_NAMES, QUERY_KEYS } from '../../constants';
import { useParamsTypeSafe } from '../../hooks/useParamsTypeSafe';
import useUpsertLender from '../../hooks/useUpsertLender';
import { ILender } from '../../schemas/application';
import Loader from '../../stories/loader/Loader';
import ApplicationErrorPage from '../msme/ApplicationErrorPage';

export interface LenderFormProps {
  lender?: ILender | null;
}

export function LenderForm({ lender }: LenderFormProps) {
  const t = useT();
  const { createLenderMutation, updateLenderMutation, isLoading, isError } = useUpsertLender();

  const methods = useForm<ProviderInput>({
    resolver: zodResolver(checkProviderSchema),
    defaultValues: lender || {
      borrower_type_preferences: {},
      limits_preferences: {},
    },
  });
  const {
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  const [microCheck, smallCheck, mediumCheck] = watch([
    'borrower_type_preferences.MICRO',
    'borrower_type_preferences.SMALL',
    'borrower_type_preferences.MEDIUM',
  ]);

  useEffect(() => {
    if (!microCheck) {
      setValue('limits_preferences.micro_limits', undefined);
    }
    if (!smallCheck) {
      setValue('limits_preferences.small_limits', undefined);
    }
    if (!mediumCheck) {
      setValue('limits_preferences.medium_limits', undefined);
    }
  }, [microCheck, smallCheck, mediumCheck, setValue]);

  useEffect(() => {
    if (isSubmitSuccessful && !isError && !isLoading) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful, isError, isLoading]);

  const onSubmitHandler: SubmitHandler<ProviderInput> = (values) => {
    console.log(values);
    console.log('lender', lender);
    if (lender) {
      updateLenderMutation({ ...values, id: lender.id });
    } else {
      createLenderMutation(values);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:mb-8 md:mb-8 mb-4 md:grid-cols-2 gap-4 ">
        <div className="flex items-end col-span-1 md:mr-10">
          <Title className="mb-0" type="page" label={t('Settings')} />
        </div>
        <div className="flex justify-start items-start my-4 col-span-1 md:justify-end md:my-0 md:ml-10 lg:justify-end lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button className="md:mr-4" label={t('Dashboard')} component={Link} to="/" />
            </div>

            <div>
              <Button label={t('MSME Applications')} component={Link} to="/admin/applications" />
            </div>
          </div>
        </div>
      </div>

      <Title
        type="section"
        label={lender ? t('Edit Credit Provider') : t('Add New Credit Provider')}
        className="mb-6"
      />
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete="off"
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 0,
          }}>
          <FormInput
            className="w-3/5"
            label={t('Credit provider name (as you want it to appear in the Credere UI)')}
            name="name"
            big={false}
            placeholder={t('Credit provider name')}
          />
          <FormSelect
            className="w-3/5"
            label={t('Select the credit provider type')}
            name="type"
            options={LENDER_TYPES}
            placeholder={t('Type')}
          />
          <Text className="mb-4">
            {t('Select all of the types of MSMEs the credit provider is willing to offer credit to')}
          </Text>
          <Box className="mb-4">
            <Box className="w-3/5 flex flex-row  items-start justify-start gap-2">
              <Checkbox
                label={MSME_TYPES_NAMES[MSME_TYPES.MICRO]}
                name="borrower_type_preferences.MICRO"
                className={errors.borrower_type_preferences ? 'text-red' : ''}
              />
              <Checkbox
                label={MSME_TYPES_NAMES[MSME_TYPES.SMALL]}
                name="borrower_type_preferences.SMALL"
                className={errors.borrower_type_preferences ? 'text-red' : ''}
              />
              <Checkbox
                label={MSME_TYPES_NAMES[MSME_TYPES.MEDIUM]}
                name="borrower_type_preferences.MEDIUM"
                className={errors.borrower_type_preferences ? 'text-red' : ''}
              />
            </Box>
            <FormInputError fieldError={errors.borrower_type_preferences} />
          </Box>
          {microCheck && (
            <>
              <Text className="mb-1">
                {t(
                  'Enter the lower and upper limits that the credit provider will be willing to offer to a micro business',
                )}
              </Text>
              <Box className="mb-2 w-3/5 flex flex-row items-start justify-start gap-2">
                <FormInput
                  label=""
                  name="limits_preferences.micro_limits.lower"
                  placeholder={t('Col$')}
                  type="number"
                />
                <FormInput
                  label=""
                  name="limits_preferences.micro_limits.upper"
                  placeholder={t('Col$')}
                  type="number"
                />
              </Box>
            </>
          )}
          {smallCheck && (
            <>
              <Text className="mb-1">
                {t(
                  'Enter the lower and upper limits that the credit provider will be willing to offer to a small business',
                )}
              </Text>
              <Box className="mb-2 w-3/5 flex flex-row  items-start justify-start gap-2">
                <FormInput
                  label=""
                  name="limits_preferences.small_limits.lower"
                  placeholder={t('Col$')}
                  type="number"
                />
                <FormInput
                  label=""
                  name="limits_preferences.small_limits.upper"
                  placeholder={t('Col$')}
                  type="number"
                />
              </Box>
            </>
          )}
          {mediumCheck && (
            <>
              <Text className="mb-1">
                {t(
                  'Enter the lower and upper limits that the credit provider will be willing to offer to a medium business',
                )}
              </Text>
              <Box className="mb-2 w-3/5 flex flex-row  items-start justify-start gap-2">
                <FormInput
                  label=""
                  name="limits_preferences.medium_limits.lower"
                  placeholder={t('Col$')}
                  type="number"
                />
                <FormInput
                  label=""
                  name="limits_preferences.medium_limits.upper"
                  placeholder={t('Col$')}
                  type="number"
                />
              </Box>
            </>
          )}
          <FormInput
            className="w-3/5"
            label={t('Group destination to send notifications of new applications')}
            name="email_group"
            big={false}
            placeholder={t('Email group list')}
          />

          <FormInput
            className="w-3/5"
            label={t(
              'Set service level agreement (SLA) agreed timeframe for processing applications in Credere (days)',
            )}
            name="sla_days"
            type="number"
            big={false}
            placeholder={t('SLA days')}
          />

          <div className="mt-5 grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button className="md:mr-4" primary={false} label={t('Back')} component={Link} to="/settings" />
            </div>
            <div>
              <Button
                disabled={isLoading}
                label={lender ? t('Update Credit Provider') : t('Add New Credit Provider')}
                type="submit"
              />
            </div>
          </div>
        </Box>
      </FormProvider>
    </>
  );
}

LenderForm.defaultProps = {
  lender: null,
};

export function LoadLender() {
  const t = useT();
  const [queryError, setQueryError] = useState<string>('');

  const { id } = useParamsTypeSafe(
    z.object({
      id: z.coerce.string(),
    }),
  );

  const { isLoading, data } = useQuery({
    queryKey: [QUERY_KEYS.lenders, `${id}`],
    queryFn: async (): Promise<ILender | null> => {
      const lender = await getLenderFn(id);
      return lender;
    },
    retry: 1,
    enabled: !!id,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.detail) {
        setQueryError(error.response.data.detail);
      } else {
        setQueryError(t('Error loading lender'));
      }
    },
  });

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !queryError && <LenderForm lender={data} />}
      {queryError && <ApplicationErrorPage message={queryError} />}
    </>
  );
}
