/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from '@transifex/native';
import { TypeOf, boolean, object, string } from 'zod';

const booleanRequiredSchema = boolean().refine((value) => value === true, {
  message: t('You need to check this option to Access the Scheme'),
});

export const introSchema = object({
  agree_topass_info_to_banking_partner: booleanRequiredSchema,
  acept_terms_and_conditions: booleanRequiredSchema,
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

interface Paymentmethod {
  habilita_pago_adelantado: string;
  valor_de_pago_adelantado: string;
}

export interface IAward {
  id: number;
  borrower_id: number;
  source_contract_id: string;
  title: string;
  description: string;
  award_date: string;
  award_amount: number;
  award_currency: string;
  contractperiod_startdate?: any;
  contractperiod_enddate?: any;
  payment_method: Paymentmethod;
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

export interface IBorrower {
  id: number;
  borrower_identifier: string;
  legal_name: string;
  email: string;
  address: string;
  legal_identifier: string;
  type: string;
  sector: string;
  size: string;
  status: string;
  created_at: string;
  updated_at: string;
  declined_at?: any;
}

export interface ILender {
  id: number;
  name: string;
  email_group: string;
  type: string;
  sla_days: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IApplication {
  id: number;
  borrower: IBorrower;
  award: IAward;
  lender?: ILender;
  award_id: number;
  uuid: string;
  primary_email: string;
  status: string;
  award_borrowed_identifier: string;
  borrower_id: number;
  lender_id?: any;
  contract_amount_submitted?: any;
  amount_requested?: any;
  currency: string;
  repayment_months?: any;
  calculator_data: any;
  pending_documents: boolean;
  pending_email_confirmation: boolean;
  borrower_submitted_at?: any;
  borrower_accepted_at?: any;
  borrower_declined_at?: any;
  borrower_declined_preferences_data: any;
  borrower_declined_data: any;
  lender_started_at?: any;
  secop_data_verification: any;
  lender_approved_at?: any;
  lender_approved_data: any;
  lender_rejected_data: any;
  borrewed_uploaded_contracted_at?: any;
  completed_in_days?: any;
  created_at: string;
  updated_at: string;
  expired_at: string;
  archived_at?: any;
}

export interface IExtendedApplication {
  buyer_name: string;
  borrower_name: string;
  lender_name: string;
}

export const EXTENDED_APPLICATION_FROM: IExtendedApplication = {
  buyer_name: 'award.buyer_name',
  borrower_name: 'borrower.legal_name',
  lender_name: 'lender.name',
};

export interface IApplicationResponse {
  application: IApplication;
  borrower: IBorrower;
  award: IAward;
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
