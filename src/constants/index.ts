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

// eslint-disable-next-line no-shadow
export enum DOCUMENTS_TYPE {
  INCORPORATION_DOCUMENT = 'INCORPORATION_DOCUMENT',
  SUPPLIER_REGISTRATION_DOCUMENT = 'SUPPLIER_REGISTRATION_DOCUMENT',
  BANK_NAME = 'BANK_NAME',
  BANK_CERTIFICATION_DOCUMENT = 'BANK_CERTIFICATION_DOCUMENT',
  FINANCIAL_STATEMENT = 'FINANCIAL_STATEMENT',
  SIGNED_CONTRACT = 'SIGNED_CONTRACT',
  SHAREHOLDER_COMPOSITION = 'SHAREHOLDER_COMPOSITION',
  CHAMBER_OF_COMMERCE = 'CHAMBER_OF_COMMERCE',
  THREE_LAST_BANK_STATEMENT = 'THREE_LAST_BANK_STATEMENT',
}

export const DOCUMENT_TYPES_NAMES: { [key: string]: string } = {
  [DOCUMENTS_TYPE.INCORPORATION_DOCUMENT]: t('Incorporation document'),
  [DOCUMENTS_TYPE.SUPPLIER_REGISTRATION_DOCUMENT]: t('Supplier registration document'),
  [DOCUMENTS_TYPE.BANK_CERTIFICATION_DOCUMENT]: t('Bank certification document'),
  [DOCUMENTS_TYPE.FINANCIAL_STATEMENT]: t('Financial statement'),
  [DOCUMENTS_TYPE.SIGNED_CONTRACT]: t('Signed contract'),
  [DOCUMENTS_TYPE.SHAREHOLDER_COMPOSITION]: t('Shareholder composition'),
  [DOCUMENTS_TYPE.CHAMBER_OF_COMMERCE]: t('Chamber of Commerce'),
  [DOCUMENTS_TYPE.THREE_LAST_BANK_STATEMENT]: t('Three last bank statement'),
};

// eslint-disable-next-line no-shadow
export enum BORROWER_TYPE {
  NATURAL_PERSON = 'NATURAL_PERSON',
  LEGAL_PERSON = 'LEGAL_PERSON',
}

export const BORROWER_TYPES_NAMES: { [key: string]: string } = {
  [BORROWER_TYPE.NATURAL_PERSON]: t('Natural Person'),
  [BORROWER_TYPE.LEGAL_PERSON]: t('Legal Person'),
};

// eslint-disable-next-line no-shadow
export enum MSME_TYPES {
  NOT_INFORMED = 'NOT_INFORMED',
  MICRO = 'MICRO',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  BIG = 'BIG',
}

export const MSME_TYPES_NAMES: { [key: string]: string } = {
  [MSME_TYPES.MICRO]: t('0 to 10'),
  [MSME_TYPES.SMALL]: t('11 to 50'),
  [MSME_TYPES.MEDIUM]: t('51 to 200'),
  [MSME_TYPES.BIG]: t('+ 200'),
  [MSME_TYPES.NOT_INFORMED]: t('Not informed'),
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
  {
    value: MSME_TYPES.BIG,
    label: MSME_TYPES_NAMES.BIG,
  },
];

// https://clasificaciones.dane.gov.co/ciiu4-0/seccion_clasificacion
export const SECTOR_TYPES: FormSelectOption[] = [
  {
    value: 'agricultura',
    label: t('Agricultura, ganadería, caza, silvicultura y pesca'),
  },
  {
    value: 'minas',
    label: t('Explotación de minas y canteras'),
  },
  {
    value: 'manufactura',
    label: t('Industrias manufactureras'),
  },
  {
    value: 'electricidad',
    label: t('Suministro de electricidad, gas, vapor y aire acondicionado'),
  },
  {
    value: 'agua',
    label: t(
      'Distribución de agua; evacuación y tratamiento de aguas residuales, gestión de desechos y actividades de saneamiento ambiental',
    ),
  },
  {
    value: 'construccion',
    label: t('Construcción'),
  },
  {
    value: 'transporte',
    label: t('Transporte y almacenamiento'),
  },
  {
    value: 'alojamiento',
    label: t('Alojamiento y servicios de comida'),
  },
  {
    value: 'comunicaciones',
    label: t('Información y comunicaciones'),
  },
  {
    value: 'actividades_financieras',
    label: t('Actividades financieras y de seguros'),
  },
  {
    value: 'actividades_inmobiliarias',
    label: t('Actividades inmobiliarias'),
  },
  {
    value: 'actividades_profesionales',
    label: t('Actividades profesionales, científicas y técnicas'),
  },
  {
    value: 'actividades_servicios_administrativos',
    label: t('Actividades de servicios administrativos y de apoyo'),
  },
  {
    value: 'administracion_publica',
    label: t('Administración pública y defensa; planes de seguridad social de afiliación obligatoria'),
  },
  {
    value: 'educacion',
    label: t('Educación'),
  },
  {
    value: 'atencion_salud',
    label: t('Actividades de atención de la salud humana y de asistencia social'),
  },
  {
    value: 'actividades_artisticas',
    label: t('Actividades artísticas, de entretenimiento y recreación'),
  },
  {
    value: 'otras_actividades',
    label: t('Otras actividades de servicios'),
  },
  {
    value: 'actividades_hogares',
    label: t(
      'Actividades de los hogares individuales en calidad de empleadores; actividades no diferenciadas de los hogares individuales como productores de bienes yservicios para uso propio',
    ),
  },
  {
    value: 'actividades_organizaciones_extraterritoriales',
    label: t('Actividades de organizaciones y entidades extraterritoriales'),
  },
];

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

// eslint-disable-next-line no-shadow
export enum ERROR_CODES {
  BORROWER_FIELD_VERIFICATION_MISSING = 'BORROWER_FIELD_VERIFICATION_MISSING',
  DOCUMENT_VERIFICATION_MISSING = 'DOCUMENT_VERIFICATION_MISSING',
  APPLICATION_ALREADY_COPIED = 'APPLICATION_ALREADY_COPIED',
}

export const ERRORS_MESSAGES: { [key: string]: string } = {
  [ERROR_CODES.BORROWER_FIELD_VERIFICATION_MISSING]: t('Some borrower data field are not verified'),
  [ERROR_CODES.DOCUMENT_VERIFICATION_MISSING]: t('Some documents are not verified'),
  [ERROR_CODES.APPLICATION_ALREADY_COPIED]: t('A new application has alredy been created from this one'),
};
