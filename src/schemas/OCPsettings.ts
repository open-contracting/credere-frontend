import { t } from '@transifex/native';
import { TypeOf, boolean, coerce, nativeEnum, object, preprocess, string } from 'zod';

import { BORROWER_TYPE, CREDIT_PRODUCT_TYPE, DOCUMENTS_TYPE, MSME_TYPES } from '../constants';

const creditProviderNameSchema = string().min(1, t('Provider name is required'));
const creditProviderTypeSchema = string().nonempty(t('Provider type is required'));
const microSchema = boolean();
const smallSchema = boolean();
const mediumSchema = boolean();

const preferencesSchema = object({
  MICRO: microSchema,
  SMALL: smallSchema,
  MEDIUM: mediumSchema,
}).refine((data) => data.MICRO || data.SMALL || data.MEDIUM, {
  path: [''],
  message: t('You need to check at least one option'),
});

export const lenderSchema = object({
  name: creditProviderNameSchema,
  type: creditProviderTypeSchema,
  sla_days: coerce.number().int().positive().min(1, t('SLA days must be greater than 0')),
  email_group: string().email(t('Email Address is invalid')),
});

export type ProviderInput = TypeOf<typeof lenderSchema>;

export type PreferencesType = TypeOf<typeof preferencesSchema>;

export const creditProductSchema = object({
  borrower_size: nativeEnum(MSME_TYPES, {
    errorMap: (issue) => {
      switch (issue.code) {
        case 'invalid_type':
        case 'invalid_enum_value':
          return { message: t('Borrower size is required') };
        default:
          return { message: t('Select an option') };
      }
    },
  }),
  lower_limit: coerce.number().min(1, t('Lower limit must be greater than 0')),
  upper_limit: coerce.number().min(1, t('Upper limit must be greater than 0')),
  interest_rate: preprocess(
    (args) => (args === '' ? undefined : args),
    coerce
      .number({
        required_error: t('Interest rate is required'),
        invalid_type_error: t('Interest rate must be a number'),
      })
      .gte(0, t('Interest rate must be greater or equal than 0'))
      .lte(100, t('Interest rate must be less or equal than 100')),
  ),
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
  required_document_types: object({
    [DOCUMENTS_TYPE.INCORPORATION_DOCUMENT]: boolean(),
    [DOCUMENTS_TYPE.SUPPLIER_REGISTRATION_DOCUMENT]: boolean(),
    [DOCUMENTS_TYPE.BANK_CERTIFICATION_DOCUMENT]: boolean(),
    [DOCUMENTS_TYPE.FINANCIAL_STATEMENT]: boolean(),
  }).refine(
    (data) =>
      data[DOCUMENTS_TYPE.INCORPORATION_DOCUMENT] ||
      data[DOCUMENTS_TYPE.SUPPLIER_REGISTRATION_DOCUMENT] ||
      data[DOCUMENTS_TYPE.BANK_CERTIFICATION_DOCUMENT] ||
      data[DOCUMENTS_TYPE.FINANCIAL_STATEMENT],
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
