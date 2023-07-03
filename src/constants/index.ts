import { t } from '@transifex/native';

import { FormSelectOption } from '../stories/form-select/FormSelect';

export const COLORS: { [key: string]: string } = {
  grass: '#D6E100',
  background: '#F2F2F2',
  darkest: '#444444',
  gray: '#4D4D54',
  softGray: '#C4C4C4',
  lightGray: '#EEEEEE',
  secondary: '#24B2A7',
  moodyBlue: '#6C75E1',
  red: '#FB6045',
  darkGreen: '#17736B',
  fieldBorder: '#DADADA',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const USER_LOCAL_STORAGE_KEY = 'CREDERE_USER';
export const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'CREDERE_USER_ACCESS_TOKEN';
export const LANG_STORAGE_KEY = 'CREDERE_LANG';

// eslint-disable-next-line no-shadow
export enum QUERY_KEYS {
  user = 'user',
  application_uuid = 'application_uuid',
  applications_fi = 'applications_fi',
  applications_ocp = 'applications_ocp',
  lenders = 'lenders',
  credit_product = 'credit_product',
}

export const DISPATCH_ACTIONS = {
  SET_USER: 'SET_USER',
  SET_LANG: 'SET_LANG',
  SET_APPLICATION: 'SET_APPLICATION',
};

export const PAGE_SIZES = [5, 10, 25];

// eslint-disable-next-line no-shadow
export enum APPLICATION_STATUS {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  LAPSED = 'LAPSED',
  DECLINED = 'DECLINED',
  SUBMITTED = 'SUBMITTED',
  STARTED = 'STARTED',
  APPROVED = 'APPROVED',
  CONTRACT_UPLOADED = 'CONTRACT_UPLOADED',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  INFORMATION_REQUESTED = 'INFORMATION_REQUESTED',
}

export const COMPLETED_STATUS = [
  APPLICATION_STATUS.COMPLETED,
  APPLICATION_STATUS.REJECTED,
  APPLICATION_STATUS.APPROVED,
  APPLICATION_STATUS.LAPSED,
];

export const NOT_STARTED_STATUS = [APPLICATION_STATUS.ACCEPTED];

export const STARTED_STATUS = [
  APPLICATION_STATUS.STARTED,
  APPLICATION_STATUS.CONTRACT_UPLOADED,
  APPLICATION_STATUS.INFORMATION_REQUESTED,
];

export const APPLICATION_STATUS_NAMES: { [key: string]: string } = {
  [APPLICATION_STATUS.PENDING]: t('Pending'),
  [APPLICATION_STATUS.ACCEPTED]: t('Accepted'),
  [APPLICATION_STATUS.LAPSED]: t('Lapsed'),
  [APPLICATION_STATUS.DECLINED]: t('Declined'),
  [APPLICATION_STATUS.SUBMITTED]: t('Submitted'),
  [APPLICATION_STATUS.STARTED]: t('Started'),
  [APPLICATION_STATUS.APPROVED]: t('Approved'),
  [APPLICATION_STATUS.CONTRACT_UPLOADED]: t('Contract uploaded'),
  [APPLICATION_STATUS.COMPLETED]: t('Completed'),
  [APPLICATION_STATUS.REJECTED]: t('Rejected'),
  [APPLICATION_STATUS.INFORMATION_REQUESTED]: t('Information requested'),
};

export const LENDER_TYPES: FormSelectOption[] = [
  {
    value: 'commercial_bank',
    label: t('Commercial Bank'),
  },
  {
    value: 'fintech',
    label: t('FinTech'),
  },
  {
    value: 'government_bank',
    label: t('Government Bank'),
  },
];

export const CREDIT_PRODUCT_TYPE = {
  LOAN: 'LOAN',
  CREDIT_LINE: 'CREDIT_LINE',
};

export const CREDIT_PRODUCT_OPTIONS: FormSelectOption[] = [
  {
    value: CREDIT_PRODUCT_TYPE.LOAN,
    label: t('Loan'),
  },
  {
    value: CREDIT_PRODUCT_TYPE.CREDIT_LINE,
    label: t('Credit line'),
  },
];

export const DOCUMENTS_TYPE = {
  INCORPORATION_DOCUMENT: 'INCORPORATION_DOCUMENT',
  SUPPLIER_REGISTRATION_DOCUMENT: 'SUPPLIER_REGISTRATION_DOCUMENT',
  BANK_NAME: 'BANK_NAME',
  BANK_CERTIFICATION_DOCUMENT: 'BANK_CERTIFICATION_DOCUMENT',
  FINANCIAL_STATEMENT: 'FINANCIAL_STATEMENT',
  SIGNED_CONTRACT: 'SIGNED_CONTRACT',
  COMPLIANCE_REPORT: 'COMPLIANCE_REPORT',
};

// eslint-disable-next-line no-shadow
export enum MSME_TYPES {
  MICRO = 'MICRO',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
}

export const MSME_TYPES_NAMES: { [key: string]: string } = {
  [MSME_TYPES.MICRO]: t('0 to 10'),
  [MSME_TYPES.SMALL]: t('11 to 50'),
  [MSME_TYPES.MEDIUM]: t('51 to 200'),
};

export const MSME_TYPES_OPTIONS: FormSelectOption[] = [
  {
    value: MSME_TYPES.MICRO,
    label: MSME_TYPES_NAMES.MICRO,
  },
  {
    value: MSME_TYPES.SMALL,
    label: MSME_TYPES_NAMES.SMALL,
  },
  {
    value: MSME_TYPES.MEDIUM,
    label: MSME_TYPES_NAMES.MEDIUM,
  },
];

export const DOCUMENT_TYPES_NAMES: { [key: string]: string } = {
  [DOCUMENTS_TYPE.INCORPORATION_DOCUMENT]: t('Incorporation document'),
  [DOCUMENTS_TYPE.SUPPLIER_REGISTRATION_DOCUMENT]: t('Supplier registration document'),
  [DOCUMENTS_TYPE.BANK_CERTIFICATION_DOCUMENT]: t('Bank certification document'),
  [DOCUMENTS_TYPE.FINANCIAL_STATEMENT]: t('Financial statement'),
  [DOCUMENTS_TYPE.SIGNED_CONTRACT]: t('Signed contract'),
  [DOCUMENTS_TYPE.COMPLIANCE_REPORT]: t('Compliance report'),
};
