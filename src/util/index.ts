import { t } from '@transifex/native';
import dayjs from 'dayjs';
import lodash from 'lodash';

import {
  APPLICATION_STATUS_NAMES,
  CREDIT_PRODUCT_OPTIONS,
  LENDER_TYPES,
  MSME_TYPES,
  MSME_TYPES_NAMES,
  MSME_TYPES_OPTIONS,
  SECTOR_TYPES,
  USER_TYPE_OPTIONS,
} from '../constants';
import CURRENCY_FORMAT_OPTIONS from '../constants/intl';
import { PreferencesType } from '../schemas/OCPsettings';
import { FormSelectOption } from '../stories/form-select/FormSelect';

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  month: 'long', // Display full month name
  day: 'numeric', // Display day of the month
  year: 'numeric', // Display full year
};

export const formatLocalizedDate = (locale: string, date: Date) => date.toLocaleDateString(locale, dateFormatOptions);

export const formatLocalizedDateFromString = (locale: string, date: string | null | undefined) => {
  if (!date) {
    return t('No defined');
  }

  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, dateFormatOptions);
};

export const formatCurrency = (amount: number, currency?: string) => {
  const currencyFormatOptions = CURRENCY_FORMAT_OPTIONS[currency || 'default'] || CURRENCY_FORMAT_OPTIONS.default;

  const formatter = new Intl.NumberFormat(currencyFormatOptions.locale, currencyFormatOptions.options);
  return formatter.format(amount);
};

export const formatPaymentMethod = (value: { [key: string]: string }) => {
  if (!value) {
    return t('No defined');
  }

  let paymentMethodString = '';

  Object.keys(value).forEach((key) => {
    if (Number(value[key])) {
      paymentMethodString += `${lodash.startCase(key)}: ${formatCurrency(Number(value[key]))}\n`;
    } else {
      paymentMethodString += `${lodash.startCase(key)}: ${value[key]}\n`;
    }
  });

  return paymentMethodString;
};

export const renderApplicationStatus = (status: string) => APPLICATION_STATUS_NAMES[status] || t('INVALID_STATUS');

function findLabelByValue(value: string, options: FormSelectOption[]): string {
  const foundType = options.find((option) => option.value === value);
  return foundType?.label || value;
}

export const renderLenderType = (type: string) => findLabelByValue(type, LENDER_TYPES);
export const renderUserType = (type: string) => findLabelByValue(type, USER_TYPE_OPTIONS);
export const renderCreditProductType = (type: string) => findLabelByValue(type, CREDIT_PRODUCT_OPTIONS);
export const renderBorrowerSizeType = (type: string) => MSME_TYPES_NAMES[type as MSME_TYPES];

export const renderSector = (type: string) => findLabelByValue(type, SECTOR_TYPES);
export const renderSize = (type: string) => {
  if (type === 'NOT_INFORMED') {
    return t('Not informed');
  }
  return findLabelByValue(type, MSME_TYPES_OPTIONS);
};
export const renderLenderPreferences = (preferences: PreferencesType) => {
  let preferencesString = '';
  if (preferences.MICRO) {
    preferencesString += MSME_TYPES_NAMES[MSME_TYPES.MICRO];
  }
  if (preferences.SMALL) {
    preferencesString += preferencesString
      ? `, ${MSME_TYPES_NAMES[MSME_TYPES.SMALL]}`
      : MSME_TYPES_NAMES[MSME_TYPES.SMALL];
  }
  if (preferences.MEDIUM) {
    preferencesString += preferencesString
      ? `, ${MSME_TYPES_NAMES[MSME_TYPES.MEDIUM]}`
      : MSME_TYPES_NAMES[MSME_TYPES.MEDIUM];
  }
  return preferencesString;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getProperty(obj: any, propertyString: string): any {
  if (!obj) {
    return undefined;
  }
  const properties = propertyString.split('.');
  let result = obj;

  // eslint-disable-next-line no-restricted-syntax
  for (const property of properties) {
    result = result[property];
    if (result === undefined) {
      // Property doesn't exist, handle the error or return a default value
      return undefined;
    }
  }

  return result;
}

export const isDateBeforeMonths = (date: string, referenceDate: string, months: number) => {
  const diffInMonths = dayjs(referenceDate).diff(date, 'month');

  return diffInMonths > 0 && diffInMonths <= months;
};

export const addMonthsToDate = (date: string | undefined, months: number) => {
  if (!date) {
    return '';
  }

  const addedDate = dayjs(date).add(months, 'month');

  return addedDate.toDate().toLocaleDateString('en-US', dateFormatOptions);
};

export const isDateAfterCurrentDate = (date: string) => {
  const currentDate = dayjs();
  return dayjs(date).isAfter(currentDate, 'day');
};

export const downloadBlob = (blob: Blob, filename: string) => {
  if (blob) {
    const href = window.URL.createObjectURL(blob);
    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = filename;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  }
};
