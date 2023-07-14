/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from '@transifex/native';
import { TypeOf, boolean, coerce, nativeEnum, object, string } from 'zod';

import { APPLICATION_STATUS, DOCUMENTS_TYPE, MSME_TYPES } from '../constants';
import { isDateAfterCurrentDate } from '../util';
import { emailSchema } from './auth';

const booleanRequiredSchema = boolean().refine((value) => value === true, {
  message: t('You need to check this option to Access the Scheme'),
});

export const introSchema = object({
  agree_topass_info_to_banking_partner: booleanRequiredSchema,
  accept_terms_and_conditions: booleanRequiredSchema,
});

export type IntroInput = TypeOf<typeof introSchema>;

const UUIDType = string().optional();

export const applicationBaseSchema = object({
  uuid: UUIDType,
});

export type ApplicationBaseInput = TypeOf<typeof applicationBaseSchema>;

export const declineApplicationSchema = object({
  decline_this: boolean(),
  decline_all: boolean(),
  uuid: UUIDType,
}).refine((data) => data.decline_this || data.decline_all, {
  path: ['decline_all'],
  message: t('You need to check at least one option to Decline the Scheme'),
});

export type DeclineApplicationInput = TypeOf<typeof declineApplicationSchema>;

export const declineFeedbackSchema = object({
  dont_need_access_credit: boolean(),
  already_have_acredit: boolean(),
  preffer_to_go_to_bank: boolean(),
  dont_want_access_credit: boolean(),
  other: boolean(),
  other_comments: string().optional(),
  uuid: UUIDType,
});

export type DeclineFeedbackInput = TypeOf<typeof declineFeedbackSchema>;

export const creditOptionsSchema = object({
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
  sector: string().nonempty(t('Sector is required')),
  amount_requested: coerce.number().min(1, t('Amount requested must be greater than 0')),
  uuid: UUIDType,
});

export type CreditOptionsInput = TypeOf<typeof creditOptionsSchema>;

export const repaymentTermsSchema = object({
  repayment_years: coerce
    .number({
      required_error: t('Years is required'),
      invalid_type_error: t('Years must be a number'),
    })
    .gte(0, t('Years must be greater or equal than ')),
  repayment_months: coerce.number().min(1, t('Months must be greater or equal than 1')),
  payment_start_date: string()
    .nonempty(t('Payment start date is required'))
    .refine((value) => isDateAfterCurrentDate(value), {
      message: t('Payment start date must be after current date'),
    }),
});

export type RepaymentTermsInput = TypeOf<typeof repaymentTermsSchema>;

export type GetCreditProductsOptionsInput = Omit<CreditOptionsInput, 'sector'>;

export type SelectCreditProductInput = CreditOptionsInput &
  Partial<RepaymentTermsInput> & { credit_product_id: number };

export interface IAward {
  id: number;
  borrower_id: number;
  source_contract_id: string;
  title: string;
  description: string;
  award_date: string;
  award_amount: number;
  award_currency: string;
  contractperiod_startdate: string;
  contractperiod_enddate: string;
  missing_data: { [key: string]: boolean };
  payment_method: any;
  buyer_name: string;
  source_url: string;
  entity_code: string;
  contract_status: string;
  source_last_updated_at: string;
  previous: boolean;
  procurement_method: string;
  contracting_process_id: string;
  procurement_category: string;
  created_at: string;
  updated_at: string;
}

export type PrivateApplicationInput = {
  application_id: number;
};

export type IUpdateAward = Partial<Omit<IAward, 'id' | 'borrower_id' | 'missing_data' | 'created_at' | 'updated_at'>> &
  PrivateApplicationInput;

export interface IBorrower {
  id: number;
  borrower_identifier: string;
  legal_name: string;
  email: string;
  address: string;
  legal_identifier: string;
  type: string;
  sector: string;
  size: MSME_TYPES;
  status: string;
  missing_data: { [key: string]: boolean };
  created_at: string;
  updated_at: string;
  declined_at?: any;
}

export type IUpdateBorrower = Partial<
  Omit<
    IBorrower,
    'id' | 'borrower_identifier' | 'status' | 'missing_data' | 'created_at' | 'updated_at' | 'declined_at'
  >
> &
  PrivateApplicationInput;

export type IVerifyDocument = {
  document_id: number;
  verified: boolean;
};
export interface ILenderBase {
  name: string;
  email_group: string;
  type: string;
  sla_days: number;
}

export interface ILenderUpdate extends ILenderBase {
  id: number;
}

export interface ICreditProductBase {
  borrower_size: MSME_TYPES;
  lower_limit: number;
  upper_limit: number;
  interest_rate: number;
  type: string;
  required_document_types: { [key: string]: boolean };
  other_fees_total_amount: number;
  other_fees_description: string;
  more_info_url: string;
  lender_id: number;
}

export interface ICreditProductUpdate extends ICreditProductBase {
  id: number;
}

export interface ICreditProduct extends ICreditProductUpdate {
  lender: ILenderUpdate;
  created_at?: string;
  updated_at?: string;
}

export interface ILender extends ILenderUpdate {
  created_at: string;
  updated_at: string;
  credit_products: ICreditProduct[];
}

export interface IBorrowerDocument {
  id: number;
  type: DOCUMENTS_TYPE;
  verified: boolean;
  name: string;
}

export interface IApplication {
  id: number;
  borrower: IBorrower;
  award: IAward;
  lender?: ILender;
  award_id: number;
  uuid: string;
  primary_email: string;
  status: APPLICATION_STATUS;
  award_borrowed_identifier: string;
  borrower_id: number;
  lender_id?: number;
  contract_amount_submitted?: any;
  amount_requested?: any;
  currency: string;
  repayment_months?: number;
  repayment_years?: number;
  payment_start_date?: string;
  calculator_data: any;
  pending_documents: boolean;
  pending_email_confirmation: boolean;
  borrower_submitted_at?: any;
  borrower_accepted_at?: any;
  borrower_declined_at?: any;
  borrower_declined_preferences_data: any;
  borrower_declined_data: any;
  lender_started_at?: any;
  secop_data_verification: { [key: string]: boolean };
  lender_approved_at?: any;
  lender_approved_data: any;
  lender_rejected_data: any;
  borrower_uploaded_contracted_at?: any;
  completed_in_days?: any;
  created_at: string;
  updated_at: string;
  expired_at: string;
  archived_at?: any;
  credit_product_id?: number;
  credit_product?: ICreditProduct;
  borrower_documents: IBorrowerDocument[];
}

export interface IExtendedApplication {
  buyer_name: string;
  borrower_name: string;
  lender_name: string;
}

export interface UploadFileInput {
  type: DOCUMENTS_TYPE;
  file: File;
  uuid: string;
}

export interface UploadComplianceInput {
  id: number;
  file: File;
}

export interface UploadContractInput {
  file: File;
  uuid: string;
}

export const EXTENDED_APPLICATION_FROM: IExtendedApplication = {
  buyer_name: 'award.buyer_name',
  borrower_name: 'borrower.legal_name',
  lender_name: 'lender.name',
};

export interface IExtendedUser {
  lender_name: string;
  user_name: string;
}

export const EXTENDED_USER_FROM: IExtendedUser = {
  lender_name: 'lender.name',
  user_name: 'user_name',
};

export interface IApplicationResponse {
  application: IApplication;
  borrower: IBorrower;
  award: IAward;
  lender: ILender;
  documents: IBorrowerDocument[];
  creditProduct: ICreditProduct;
}

export interface PaginationInput {
  page: number;
  page_size: number;
  sort_field: string;
  sort_order: 'asc' | 'desc';
}

export interface IApplicationsListResponse {
  items: IApplication[];
  count: number;
  page: number;
  page_size: number;
}

export interface IApplicationCreditOptions {
  loans: ICreditProduct[];
  credit_lines: ICreditProduct[];
}

export interface ILenderListResponse {
  items: ILender[];
  count: number;
  page: number;
  page_size: number;
}

export const formEmailSchema = object({
  message: string().min(1, t('A message is required')),
});

export type FormEmailInput = TypeOf<typeof formEmailSchema>;

export type EmailToSMEInput = FormEmailInput & PrivateApplicationInput;

export const approveSchema = object({
  compliant_checks_completed: boolean(),
  compliant_checks_passed: boolean(),
  additional_comments: string(),
});

export type FormApprovedInput = TypeOf<typeof approveSchema>;

export type ApproveApplicationInput = FormApprovedInput & PrivateApplicationInput;

export const rejectSchema = object({
  compliance_checks_failed: boolean(),
  poor_credit_history: boolean(),
  risk_of_fraud: boolean(),
  other: boolean(),
  other_reason: string(),
});

export type FormRejectInput = TypeOf<typeof rejectSchema>;

export type RejectApplicationInput = FormRejectInput & PrivateApplicationInput;

const amountSchema = coerce.number().min(1, t('Amount must be greater than 0'));
export const uploadContractSchema = object({
  contract_amount_submitted: amountSchema,
});

export type FormContractAmountInput = TypeOf<typeof uploadContractSchema>;

export type ContractAmountInput = FormContractAmountInput & ApplicationBaseInput;

export const completeApplicationSchema = object({
  disbursed_final_amount: amountSchema,
});

export type FormCompleteApplicationInput = TypeOf<typeof completeApplicationSchema>;

export type CompleteApplicationInput = FormCompleteApplicationInput & PrivateApplicationInput;

export const changeEmailSchema = object({
  new_email: emailSchema,
});

export type FormChangeEmailInput = TypeOf<typeof changeEmailSchema>;

export type ChangeEmailInput = FormChangeEmailInput & ApplicationBaseInput;

export interface ConfirmChangeEmailInput {
  uuid: string;
  confirmation_email_token: string;
}
