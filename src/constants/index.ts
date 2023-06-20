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
