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
};

export const USER_LOCAL_STORAGE_KEY = 'CREDERE_USER';
export const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'CREDERE_USER_ACCESS_TOKEN';

export const QUERY_KEYS = {
  user: 'user',
};

export const DISPATCH_ACTIONS = {
  SET_USER: 'SET_USER',
};

export default {
  COLORS,
  USER_LOCAL_STORAGE_KEY,
  QUERY_KEYS,
  DISPATCH_ACTIONS,
};
