import { t } from '@transifex/native';
import { TypeOf, boolean, coerce, nativeEnum, object, preprocess, string } from 'zod';

import { BORROWER_TYPE, CREDIT_PRODUCT_TYPE, DOCUMENTS_TYPE } from '../constants';

const creditProviderNameSchema = string().min(1, t('Provider name is required'));
const creditProviderTypeSchema = string().min(1, t('Provider type is required'));

export const lenderSchema = object({
  name: creditProviderNameSchema,
  type: creditProviderTypeSchema,
  sla_days: coerce
    .number()
    .int()
    .positive(t('SLA days must be greater than 0'))
    .min(1, t('SLA days must be greater than 0')),
  email_group: string().email(t('Email Address is invalid')),
  logo_filename: string(),
  default_pre_approval_message: string(),
});

export type ProviderInput = TypeOf<typeof lenderSchema>;

export const creditProductSchema = object({
  borrower_size: string().min(1, t('Borrower size is required')),
  lower_limit: coerce.number().min(1, t('Lower limit must be greater than 0')),
  upper_limit: coerce.number().min(1, t('Upper limit must be greater than 0')),
  interest_rate: string().min(1, t('Interest rate description is required')),
  type: nativeEnum(CREDIT_PRODUCT_TYPE, {
    errorMap: (issue) => {
      switch (issue.code) {
        case 'invalid_type':
        case 'invalid_enum_value':
          return { message: t('Type of product is required') };
        default:
          return { message: t('Select an option') };
      }
    },
  }),
  procurement_category_to_exclude: string(),
  required_document_types: object({
    [DOCUMENTS_TYPE.INCORPORATION_DOCUMENT]: boolean(),
    [DOCUMENTS_TYPE.SUPPLIER_REGISTRATION_DOCUMENT]: boolean(),
    [DOCUMENTS_TYPE.BANK_CERTIFICATION_DOCUMENT]: boolean(),
    [DOCUMENTS_TYPE.FINANCIAL_STATEMENT]: boolean(),
    [DOCUMENTS_TYPE.SHAREHOLDER_COMPOSITION]: boolean(),
    [DOCUMENTS_TYPE.CHAMBER_OF_COMMERCE]: boolean(),
    [DOCUMENTS_TYPE.THREE_LAST_BANK_STATEMENT]: boolean(),
  }).refine(
    (data) =>
      data[DOCUMENTS_TYPE.INCORPORATION_DOCUMENT] ||
      data[DOCUMENTS_TYPE.SUPPLIER_REGISTRATION_DOCUMENT] ||
      data[DOCUMENTS_TYPE.BANK_CERTIFICATION_DOCUMENT] ||
      data[DOCUMENTS_TYPE.FINANCIAL_STATEMENT] ||
      data[DOCUMENTS_TYPE.SHAREHOLDER_COMPOSITION] ||
      data[DOCUMENTS_TYPE.CHAMBER_OF_COMMERCE] ||
      data[DOCUMENTS_TYPE.THREE_LAST_BANK_STATEMENT],
    {
      path: [''],
      message: t('You need to check at least one option'),
    },
  ),
  borrower_types: object({
    [BORROWER_TYPE.NATURAL_PERSON]: boolean(),
    [BORROWER_TYPE.LEGAL_PERSON]: boolean(),
  }).refine((data) => data[BORROWER_TYPE.NATURAL_PERSON] || data[BORROWER_TYPE.LEGAL_PERSON], {
    path: [''],
    message: t('You need to check at least one option'),
  }),
  other_fees_total_amount: preprocess(
    (args) => (args === '' ? undefined : args),
    coerce
      .number({
        required_error: t('Other fees total amount is required'),
        invalid_type_error: t('Other fees total amount must be a number'),
      })
      .gte(0, t('Other fees total amount must be greater or equal than 0')),
  ),
  other_fees_description: string().min(1, t('Other fees description is required')),
  additional_information: string(),
  more_info_url: string().url(t('URL is invalid (Hint: include http:// or https://)')),
})
  .refine((data) => data.lower_limit < data.upper_limit, {
    path: ['lower_limit'],
    message: t('Lower limit must be less than upper limit'),
  })
  .refine((data) => data.lower_limit < data.upper_limit, {
    path: ['upper_limit'],
    message: t('Upper limit must be greater than lower limit'),
  });

export type CreditProductInput = TypeOf<typeof creditProductSchema>;
