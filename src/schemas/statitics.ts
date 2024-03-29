import { t } from '@transifex/native';

export type ChartData = {
  name: string;
  value: number;
};

export interface StatisticsKpis {
  applications_received_count: number;
  applications_approved_count: number;
  applications_rejected_count: number;
  applications_waiting_for_information_count: number;
  applications_in_progress_count: number;
  applications_with_credit_disbursed_count: number;
  proportion_of_disbursed: number;
  average_amount_requested: number;
  average_repayment_period: number;
  applications_overdue_count: number;
  average_processing_time: number;
  proportion_of_submitted_out_of_opt_in: number;
}

export interface OptInStat {
  unique_smes_contacted_by_credere: number;
  applications_created: number;
  accepted_count: number;
  accepted_percentage: number;
  accepted_count_woman: number;
  approved_count_woman: number;
  total_credit_disbursed: number;
  approved_count_distinct_micro: number;
  approved_count: number;
  approved_count_distinct_micro_woman: number;
  total_credit_disbursed_micro: number;
  sector_statistics: ChartData[];
  rejected_reasons_count_by_reason: ChartData[];
  fis_chosen_by_msme: ChartData[];
  accepted_count_by_gender: ChartData[];
  submitted_count_by_gender: ChartData[];
  approved_count_by_gender: ChartData[];
  accepted_count_by_size: ChartData[];
  submitted_count_by_size: ChartData[];
  approved_count_by_size: ChartData[];
  accepted_count_distinct_by_gender: ChartData[];
  submitted_count_distinct_by_gender: ChartData[];
  approved_count_distinct_by_gender: ChartData[];
  accepted_count_distinct_by_size: ChartData[];
  submitted_count_distinct_by_size: ChartData[];
  approved_count_distinct_by_size: ChartData[];
  average_credit_disbursed: number;
  accepted_count_distinct: number;
  submitted_count_distinct: number;
  approved_count_distinct: number;
  average_applications_per_day: number;
}

export interface StatisticsFI {
  statistics_kpis: StatisticsKpis;
}

export interface StatisticsOCPoptIn {
  opt_in_stat: OptInStat;
}

export interface StatisticsParmsInput {
  custom_range?: string;
  initial_date?: string;
  final_date?: string;
  lender_id?: number;
}

// eslint-disable-next-line no-shadow
export enum GENDERS {
  Hombre = 'Hombre',
  Mujer = 'Mujer',
  'No definido' = 'No definido',
  Otro = 'Otro',
}

export const GENEDER_NAMES: { [key: string]: string } = {
  [GENDERS.Hombre]: t('Hombre'),
  [GENDERS.Mujer]: t('Mujer'),
  [GENDERS['No definido']]: t('No definido'),
  [GENDERS.Otro]: t('Otro'),
};

// eslint-disable-next-line no-shadow
export enum STATUS_GROUPS {
  Accepted = 'Accepted',
  Submitted = 'Submitted',
  Approved = 'Approved',
}
