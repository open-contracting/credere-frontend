 

 

/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useT } from '@transifex/react';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import NeedHelpComponent from 'src/components/NeedHelpComponent';
import Text from 'src/stories/text/Text';
import Title from 'src/stories/title/Title';

import CreditLinesTable from '../../components/CreditLinesTable';
import LoansTable from '../../components/LoansTable';
import { MSME_TYPES, MSME_TYPES_OPTIONS, SECTOR_TYPES } from '../../constants';
import useApplicationContext from '../../hooks/useApplicationContext';
import useGetCreditProductsOptions from '../../hooks/useGetCreditProductsOptions';
import useSelectCreditProduct from '../../hooks/useSelectCreditProduct';
import {
  CreditOptionsInput,
  GetCreditProductsOptionsInput,
  ICreditProduct,
  RepaymentTermsInput,
  SelectCreditProductInput,
  creditOptionsSchema,
  repaymentTermsSchema,
} from '../../schemas/application';
import FormInput from '../../stories/form-input/FormInput';
import FormSelect from '../../stories/form-select/FormSelect';
import RadioGroup from '../../stories/radio-group/RadioGroup';
import { formatCurrency, formatDateFromString } from '../../util';

const DEBOUNCE_TIME = 800;
function ViewCreditOptions() {
  const t = useT();

  const applicationContext = useApplicationContext();
  const { data, isLoading: isLoadingOptions, getCreditProductOptionsMutation } = useGetCreditProductsOptions();
  const { isLoading, selectCreditProductMutation } = useSelectCreditProduct();

  const methodsMainForm = useForm<CreditOptionsInput>({
    resolver: zodResolver(creditOptionsSchema),
    defaultValues: {
      borrower_size: applicationContext.state.data?.application.calculator_data.borrower_size || undefined,
      sector: applicationContext.state.data?.borrower.sector || undefined,
      amount_requested: applicationContext.state.data?.application.calculator_data.amount_requested || undefined,
    },
  });

  const {
    handleSubmit: handleSubmitMainForm,
    watch: watchMainForm,
    // formState: { touchedFields },
  } = methodsMainForm;

  const methodsLoanForm = useForm<RepaymentTermsInput>({
    resolver: zodResolver(repaymentTermsSchema),
    defaultValues: {
      repayment_years: applicationContext.state.data?.application.calculator_data.repayment_years || undefined,
      repayment_months: applicationContext.state.data?.application.calculator_data.repayment_months || undefined,
      payment_start_date: applicationContext.state.data?.application.calculator_data.payment_start_date || undefined,
    },
  });

  const [borrowerSizeValue, amountRequestedValue] = watchMainForm(['borrower_size', 'amount_requested']);

  const {
    handleSubmit: handleSubmitLoanForm,
    // formState: { touchedFields },
  } = methodsLoanForm;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetCreditProducts = useCallback(debounce(getCreditProductOptionsMutation, DEBOUNCE_TIME), [
    getCreditProductOptionsMutation,
    debounce,
  ]);

  useEffect(() => {
    if (!borrowerSizeValue || borrowerSizeValue === MSME_TYPES.NOT_INFORMED || !amountRequestedValue) {
      return;
    }

    const payload: GetCreditProductsOptionsInput = {
      borrower_size: borrowerSizeValue,
      amount_requested: amountRequestedValue,
      uuid: applicationContext.state.data?.application.uuid,
    };

    debounceGetCreditProducts(payload);
  }, [
    borrowerSizeValue,
    amountRequestedValue,
    debounceGetCreditProducts,
    applicationContext.state.data?.application.uuid,
  ]);

  const onSelectCreditLine = async (option: ICreditProduct) => {
    const onSubmitHandlerMainForm: SubmitHandler<CreditOptionsInput> = (values) => {
      const formInput: SelectCreditProductInput = {
        credit_product_id: option.id,
        borrower_size: values.borrower_size,
        sector: values.sector,
        amount_requested: values.amount_requested,
        uuid: applicationContext.state.data?.application.uuid,
      };

      selectCreditProductMutation(formInput);
    };

    handleSubmitMainForm(onSubmitHandlerMainForm)();
  };

  const onSelectLoan = async (option: ICreditProduct) => {
    const partialFormInput: Partial<CreditOptionsInput> = {};

    const onSubmitHandlerMainForm: SubmitHandler<CreditOptionsInput> = (values) => {
      partialFormInput.borrower_size = values.borrower_size;
      partialFormInput.sector = values.sector;
      partialFormInput.amount_requested = values.amount_requested;
    };

    const onSubmitHandlerLoanForm: SubmitHandler<RepaymentTermsInput> = (values) => {
      if (partialFormInput.borrower_size && partialFormInput.sector && partialFormInput.amount_requested) {
        const formInput: SelectCreditProductInput = {
          credit_product_id: option.id,
          borrower_size: partialFormInput.borrower_size,
          sector: partialFormInput.sector,
          amount_requested: partialFormInput.amount_requested,
          repayment_years: values.repayment_years,
          repayment_months: values.repayment_months,
          payment_start_date: values.payment_start_date,
          uuid: applicationContext.state.data?.application.uuid,
        };

        selectCreditProductMutation(formInput);
      }
    };
    await handleSubmitMainForm(onSubmitHandlerMainForm)();
    await handleSubmitLoanForm(onSubmitHandlerLoanForm)();
  };

  const paramsForText = useMemo(() => {
    if (!applicationContext.state.data) return {};
    return {
      award_contract_value: `${applicationContext.state.data.award.award_currency} ${formatCurrency(
        applicationContext.state.data.award.award_amount,
        applicationContext.state.data.award.award_currency,
      )}`,
      award_contract_startdate: `${formatDateFromString(applicationContext.state.data.award.contractperiod_startdate)}`,
    };
  }, [applicationContext.state.data]);

  return (
    <>
      <Title type="page" label={t('Financing Options')} className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 md:mr-10">
          <Text className="mb-1">
            {t(
              "Fill out the required information on the left and we'll show you the available financing options on the right.",
            )}
          </Text>
          <Text className="mb-8">{t('Financing can be through credit lines or through loans.')}</Text>
          <Title type="subsection" className="mb-2" label={t('What are the differences?')} />
          <ul>
            <li className="text-darkest">
              <Text className="mb-2">
                {t(
                  'In the loan the total amount agreed at the initial moment is delivered. On the other hand, in the credit line, only the necessary amount is available at any time.',
                )}
              </Text>
            </li>
            <li className="text-darkest">
              <Text className="mb-2">
                {t(
                  'In the loans, interest must be paid from the moment the capital is delivered, while in the credit lines interest will be paid when the necessary capital is available.',
                )}
              </Text>
            </li>
            <li className="text-darkest">
              <Text className="mb-2">
                {t(
                  'The credit line can be renewed several times upon maturity, the loan must be repaid within the agreed term.',
                )}
              </Text>
            </li>
            <li className="text-darkest">
              <Text className="mb-2">{t('The term of the credit line is less than that of the loan.')}</Text>
            </li>
            <li className="text-darkest">
              <Text className="mb-2">{t('Interest rates are usually higher on credit lines than on loans.')}</Text>
            </li>
          </ul>
        </div>
        <div className="my-6 md:my-0 md:ml-10">
          <NeedHelpComponent />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:mr-10">
          <FormProvider {...methodsMainForm}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <RadioGroup label={t('Number of employees')} name="borrower_size" options={MSME_TYPES_OPTIONS} />
              <FormSelect
                className="w-3/5"
                label={t('Sector')}
                name="sector"
                options={SECTOR_TYPES}
                placeholder={t('Sector')}
              />
              <FormInput
                className="w-3/5"
                helperText={t('The maximum amount is 90% of the awarded amount {award_contract_value}', {
                  award_contract_value: paramsForText.award_contract_value,
                })}
                label={t('Amount to finance')}
                name="amount_requested"
                big={false}
                type="currency"
                placeholder={t('Amount requested')}
              />
            </Box>
          </FormProvider>
        </div>
        <div className="grid grid-cols-1 md:col-span-2 gap-4 md:flex md:flex-col md:gap-0">
          <Title type="subsection" className="mb-2" label={t('Credit Lines')} />

          {borrowerSizeValue && amountRequestedValue && (
            <CreditLinesTable
              rows={data?.credit_lines || []}
              currency={applicationContext.state.data?.award.award_currency || import.meta.env.VITE_CURRENCY}
              selectOption={onSelectCreditLine}
              isLoading={isLoading || isLoadingOptions}
            />
          )}
          {(!borrowerSizeValue || borrowerSizeValue === MSME_TYPES.NOT_INFORMED) && (
            <Text className="mb-0 text-sm">{t('Select a number of employees to evaluate available options')}</Text>
          )}
          {!amountRequestedValue && (
            <Text className="mb-0 text-sm">
              {t('Enter a value for amount to finance to evaluate available options')}
            </Text>
          )}
        </div>
      </div>

      {/* Loan Form */}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:mr-10">
          <Title type="subsection" className="mb-2" label={t('For loans')} />

          <FormProvider {...methodsLoanForm}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Text className="mb-1">{t('Repayment terms')}</Text>
              <Box className="mb-2 w-3/5 flex flex-row items-start justify-start gap-2">
                <FormInput label="" name="repayment_years" placeholder={t('Year(s)')} type="number" />
                <FormInput label="" name="repayment_months" placeholder={t('Month(s)')} type="number" />
              </Box>
              <FormInput
                className="w-3/5"
                helperText={
                  applicationContext.state.data?.award.contractperiod_startdate
                    ? t(
                        'The latest the payment start date can be is three months after your contract begins on {award_contract_startdate}.',
                        {
                          award_contract_startdate: paramsForText.award_contract_startdate,
                        },
                      )
                    : t('The latest the payment start date can be is three months after your contract begins.')
                }
                big={false}
                label={t('Payment start date')}
                name="payment_start_date"
                type="date-picker"
              />
            </Box>
          </FormProvider>
        </div>
        <div className="grid grid-cols-1 mb-8 md:col-span-2 gap-4 md:flex md:flex-col md:gap-0">
          <Title type="subsection" className="mb-2" label={t('Loans')} />

          {borrowerSizeValue && amountRequestedValue && (
            <LoansTable
              rows={data?.loans || []}
              amountRequested={amountRequestedValue}
              currency={applicationContext.state.data?.award.award_currency || import.meta.env.VITE_CURRENCY}
              selectOption={onSelectLoan}
              isLoading={isLoading || isLoadingOptions}
            />
          )}
          {(!borrowerSizeValue || borrowerSizeValue === MSME_TYPES.NOT_INFORMED) && (
            <Text className="mb-0 text-sm">{t('Select a number of employees to evaluate available options')}</Text>
          )}
          {!amountRequestedValue && (
            <Text className="mb-0 text-sm">
              {t('Enter a value for amount to finance to evaluate available options')}
            </Text>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewCreditOptions;
