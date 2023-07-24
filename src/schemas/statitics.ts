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
  opt_in_query_count: number;
  opt_in_percentage: number;
  sector_statistics: ChartData[];
  rejected_reasons_count_by_reason: ChartData[];
  fis_choosen_by_msme: ChartData[];
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
