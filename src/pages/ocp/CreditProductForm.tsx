/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useT } from '@transifex/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { CreditProductInput, creditProductSchema } from 'src/schemas/OCPsettings';
import Button from 'src/stories/button/Button';
import Checkbox from 'src/stories/checkbox/Checkbox';
import FormInput, { FormInputError } from 'src/stories/form-input/FormInput';
import FormSelect from 'src/stories/form-select/FormSelect';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';
import { z } from 'zod';

import { getCreditProductFn } from '../../api/private';
import {
  BORROWER_TYPE,
  BORROWER_TYPES_NAMES,
  CREDIT_PRODUCT_OPTIONS,
  DOCUMENTS_TYPE,
  DOCUMENT_TYPES_NAMES,
  MSME_TYPES_OPTIONS,
  QUERY_KEYS
} from '../../constants';
import { useParamsTypeSafe } from '../../hooks/useParamsTypeSafe';
import useUpsertCreditProduct from '../../hooks/useUpsertCreditProduct';
import { ICreditProduct } from '../../schemas/application';
import Loader from '../../stories/loader/Loader';
import ApplicationErrorPage from '../msme/ApplicationErrorPage';

export interface CreditProductFormProps {
  lenderId: number;
  creditProduct?: ICreditProduct | null;
}

export function CreditProductForm({ creditProduct, lenderId }: CreditProductFormProps) {
  const t = useT();
  const { createCreditProductMutation, updateCreditProductMutation, isLoading, isError } = useUpsertCreditProduct();

  const methods = useForm<CreditProductInput>({
    resolver: zodResolver(creditProductSchema),
    defaultValues: creditProduct || {
      required_document_types: {},
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful && !isError && !isLoading) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful, isError, isLoading]);

  const onSubmitHandler: SubmitHandler<CreditProductInput> = (values) => {
    if (creditProduct) {
      updateCreditProductMutation({ ...values, id: creditProduct.id, lender_id: creditProduct.lender_id });
    } else {
      createCreditProductMutation({ ...values, lender_id: lenderId });
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
        label={
          creditProduct
            ? t('Edit Credit Product for {lenderName}', { lenderName: creditProduct.lender?.name })
            : t('Add New Credit Product')
        }
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
          <FormSelect
            className="w-3/5"
            label={t('Select type of MSMEs the credit provider is willing to offer credit to')}
            name="borrower_size"
            options={MSME_TYPES_OPTIONS}
            placeholder={t('Borrower size')}
          />

          <FormSelect
            className="w-3/5"
            label={t('Select the type of credit product')}
            name="type"
            options={CREDIT_PRODUCT_OPTIONS}
            placeholder={t('Type')}
          />

          <Text className="mb-4">
            {t('Select the legal type of MSMEs the credit provider is willing to offer credit to')}
          </Text>
          <Box className="mb-4">
            <Box className="w-3/5 flex flex-col items-start justify-start gap-2">
              <Checkbox
                label={BORROWER_TYPES_NAMES[BORROWER_TYPE.NATURAL_PERSON]}
                name={`borrower_types.${BORROWER_TYPE.NATURAL_PERSON}`}
                className={errors.borrower_types ? 'text-red' : ''}
              />
              <Checkbox
                label={BORROWER_TYPES_NAMES[BORROWER_TYPE.LEGAL_PERSON]}
                name={`borrower_types.${BORROWER_TYPE.LEGAL_PERSON}`}
                className={errors.borrower_types ? 'text-red' : ''}
              />
            </Box>
            <FormInputError fieldError={errors.borrower_types} />
          </Box>

          <Text className="mb-1">
            {t(
              'Enter the lower and upper limits that the credit provider will be willing to offer for this credit product',
            )}
          </Text>
          <Box className="mb-2 w-3/5 flex flex-row items-start justify-start gap-2">
            <FormInput label="" name="lower_limit" placeholder={t('Lower limit')} type="currency" />
            <FormInput label="" name="upper_limit" placeholder={t('Upper limit')} type="currency" />
          </Box>

          <FormInput
            className="w-3/5"
            label={t('Interest rate of the credit product')}
            name="interest_rate"
            type="number"
            big={false}
            placeholder={t('Interes rate')}
          />

          <Text className="mb-4">
            {t('Select all the documents that the credit provider will require from the MSME')}
          </Text>
          <Box className="mb-4">
            <Box className="w-3/5 flex flex-col items-start justify-start gap-2">
              <Checkbox
                label={DOCUMENT_TYPES_NAMES[DOCUMENTS_TYPE.INCORPORATION_DOCUMENT]}
                name={`required_document_types.${DOCUMENTS_TYPE.INCORPORATION_DOCUMENT}`}
                className={errors.required_document_types ? 'text-red' : ''}
              />
              <Checkbox
                label={DOCUMENT_TYPES_NAMES[DOCUMENTS_TYPE.SUPPLIER_REGISTRATION_DOCUMENT]}
                name={`required_document_types.${DOCUMENTS_TYPE.SUPPLIER_REGISTRATION_DOCUMENT}`}
                className={errors.required_document_types ? 'text-red' : ''}
              />
              <Checkbox
                label={DOCUMENT_TYPES_NAMES[DOCUMENTS_TYPE.BANK_CERTIFICATION_DOCUMENT]}
                name={`required_document_types.${DOCUMENTS_TYPE.BANK_CERTIFICATION_DOCUMENT}`}
                className={errors.required_document_types ? 'text-red' : ''}
              />
              <Checkbox
                label={DOCUMENT_TYPES_NAMES[DOCUMENTS_TYPE.FINANCIAL_STATEMENT]}
                name={`required_document_types.${DOCUMENTS_TYPE.FINANCIAL_STATEMENT}`}
                className={errors.required_document_types ? 'text-red' : ''}
              />
               <Checkbox
                label={DOCUMENT_TYPES_NAMES[DOCUMENTS_TYPE.SHAREHOLDER_COMPOSITION]}
                name={`required_document_types.${DOCUMENTS_TYPE.SHAREHOLDER_COMPOSITION}`}
                className={errors.required_document_types ? 'text-red' : ''}
              />
              <Checkbox
                label={DOCUMENT_TYPES_NAMES[DOCUMENTS_TYPE.CHAMBER_OF_COMMERCE]}
                name={`required_document_types.${DOCUMENTS_TYPE.CHAMBER_OF_COMMERCE}`}
                className={errors.required_document_types ? 'text-red' : ''}
              />
              <Checkbox
                label={DOCUMENT_TYPES_NAMES[DOCUMENTS_TYPE.THREE_LAST_BANK_STATEMENT]}
                name={`required_document_types.${DOCUMENTS_TYPE.THREE_LAST_BANK_STATEMENT}`}
                className={errors.required_document_types ? 'text-red' : ''}
              />
            </Box>
            <FormInputError fieldError={errors.required_document_types} />
          </Box>

          <FormInput
            className="w-3/5"
            label={t('Enter the total amount of other fees that the credit provider will charge the MSME')}
            name="other_fees_total_amount"
            big={false}
            type="currency"
            placeholder={t('Other fees total amount')}
          />

          <FormInput
            className="w-3/5"
            label={t('Enter de details of the other fees that the credit provider will charge the MSME')}
            name="other_fees_description"
            multiline
            rows={4}
            big={false}
            placeholder={t('Other fees description')}
          />

          <FormInput
            className="w-3/5"
            label={t('Enter the URL where the MSME can find more information about the credit product')}
            name="more_info_url"
            big={false}
            placeholder={t('More info URL')}
          />

          <div className="mt-5 grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button
                className="md:mr-4"
                primary={false}
                label={t('Back')}
                component={Link}
                to={`/settings/lender/${lenderId}/edit`}
              />
            </div>
            <div>
              <Button
                disabled={isLoading}
                label={creditProduct ? t('Update Credit product') : t('Add New Credit product')}
                type="submit"
              />
            </div>
          </div>
        </Box>
      </FormProvider>
    </>
  );
}

CreditProductForm.defaultProps = {
  creditProduct: null,
};

export function LoadCreditProduct() {
  const t = useT();
  const [queryError, setQueryError] = useState<string>('');

  const { id, lenderId } = useParamsTypeSafe(
    z.object({
      id: z.coerce.string().optional(),
      lenderId: z.coerce.string(),
    }),
  );

  const { isLoading, data } = useQuery({
    queryKey: [QUERY_KEYS.credit_product, `${id}`],
    queryFn: async (): Promise<ICreditProduct | null> => {
      const creditProduct = await getCreditProductFn(`${id}`);
      return creditProduct;
    },
    retry: 1,
    enabled: !!id,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.detail) {
        setQueryError(error.response.data.detail);
      } else {
        setQueryError(t('Error loading credit product'));
      }
    },
  });

  if (!id) {
    return <CreditProductForm lenderId={Number(lenderId)} />;
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !queryError && <CreditProductForm lenderId={Number(lenderId)} creditProduct={data} />}
      {queryError && <ApplicationErrorPage message={queryError} />}
    </>
  );
}
