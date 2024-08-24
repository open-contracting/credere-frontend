/* eslint-disable @typescript-eslint/no-unused-vars */

/* tslint:disable:no-unused-variable */
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
export const CONSTANTS_STORAGE_KEY = 'CONSTANTS_STORAGE_KEY';

// eslint-disable-next-line no-shadow
export enum QUERY_KEYS {
  user = 'user',
  application_uuid = 'application_uuid',
  applications = 'applications',
  lenders = 'lenders',
  users = 'users',
  credit_product = 'credit_product',
  procurement_categories = 'procurement_categories',
  downloadDocument = 'downloadDocument',
  downloadApplication = 'downloadApplication',
  awards = 'awards',
  statistics_fi = 'statistics_fi',
  statistics_ocp = 'statistics_ocp',
  statistics_ocp_opt_in = 'statistics_ocp_opt_in',
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

export const NOT_STARTED_STATUS = [APPLICATION_STATUS.SUBMITTED];

export const STARTED_STATUS = [APPLICATION_STATUS.STARTED, APPLICATION_STATUS.INFORMATION_REQUESTED];

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

// eslint-disable-next-line no-shadow
export enum STATISTICS_DATE_FILTER {
  CUSTOM_RANGE = 'CUSTOM_RANGE',
  LAST_WEEK = 'LAST_WEEK',
  LAST_MONTH = 'LAST_MONTH',
}

export const STATISTICS_DATE_FILTER_OPTIONS: FormSelectOption[] = [
  {
    value: STATISTICS_DATE_FILTER.CUSTOM_RANGE,
    label: t('Custom range'),
  },
  {
    value: STATISTICS_DATE_FILTER.LAST_WEEK,
    label: t('Last week'),
  },
  {
    value: STATISTICS_DATE_FILTER.LAST_MONTH,
    label: t('Last month'),
  },
];

export const SIGNED_CONTRACT_DOCUMENT_TYPE = 'SIGNED_CONTRACT';

export const DEFAULT_BORROWER_SIZE = 'NOT_INFORMED';

// eslint-disable-next-line no-shadow
export enum USER_TYPES {
  OCP = 'OCP',
  FI = 'FI',
}

export const USER_TYPE_OPTIONS: FormSelectOption[] = [
  {
    value: USER_TYPES.OCP,
    label: t('OCP Admin'),
  },
  {
    value: USER_TYPES.FI,
    label: t('FI User'),
  },
];
