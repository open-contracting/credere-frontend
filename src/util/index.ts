import { t } from '@transifex/native';

import { APPLICATION_STATUS_NAMES } from '../constants';

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
