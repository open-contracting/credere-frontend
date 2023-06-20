import { t } from '@transifex/native';

import { APPLICATION_STATUS_NAMES, LENDER_TYPES, MSME_TYPES, MSME_TYPES_NAMES } from '../constants';
import { PreferencesType } from '../schemas/OCPsettings';
import { FormSelectOption } from '../stories/form-select/FormSelect';

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  month: 'long', // Display full month name
  day: 'numeric', // Display day of the month
  year: 'numeric', // Display full year
};

export const formatDate = (date: Date) => date.toLocaleDateString('en-US', dateFormatOptions);

export const formatDateFromString = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', dateFormatOptions);
};

const currencyFormatOptions = {
  style: 'currency',
  currency: 'COP',
};
export const formatCurrency = (amount: number) => amount.toLocaleString('es-CO', currencyFormatOptions);

export const renderApplicationStatus = (status: string) => APPLICATION_STATUS_NAMES[status] || t('INVALID_STATUS');

function findLabelByValue(value: string, options: FormSelectOption[]): string {
  const foundType = options.find((option) => option.value === value);
  return foundType?.label || value;
}

export const renderLenderType = (type: string) => findLabelByValue(type, LENDER_TYPES);

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
