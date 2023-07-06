/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { useT } from '@transifex/react';

import useUpdateAward from '../hooks/useUpdateAward';
import { IApplication, IUpdateAward } from '../schemas/application';
import { formatCurrency, formatDateFromString, formatPaymentMethod } from '../util';
import ApplicationTableDataAwardRow from './ApplicationTableDataAwardRow';
import { DataTableHeadCell, DataTableHeadLabel } from './DataTable';

export interface ApplicationAwardTableProps {
  application: IApplication;
  readonly?: boolean;
  className?: string;
}

export function ApplicationAwardTable({ application, readonly = false, className }: ApplicationAwardTableProps) {
  const t = useT();
  const { updateAwardMutation, isLoading } = useUpdateAward();

  const { award } = application;

  const updateValue = (value: any, name: keyof IUpdateAward) => {
    const payload: IUpdateAward = {
      application_id: application.id,
      [name]: value,
    };

    updateAwardMutation(payload);
  };

  return (
    <Paper elevation={0} square className={className}>
      <TableContainer>
        <Table aria-labelledby="application-table" size="medium">
          <TableHead>
            <TableRow>
              <DataTableHeadCell width={260}>
                <DataTableHeadLabel label={t('Open Contracting Field')} />
              </DataTableHeadCell>
              <DataTableHeadCell width={240}>
                <DataTableHeadLabel label={t('Data Available')} />
              </DataTableHeadCell>
              <DataTableHeadCell>
                <DataTableHeadLabel label={t('Data')} />
              </DataTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ApplicationTableDataAwardRow
              isLoading={isLoading}
              readonly={readonly}
              updateValue={updateValue}
              missingData={award.missing_data}
              name="title"
              label={t('Award Title')}
              award={award}
            />
            <ApplicationTableDataAwardRow
              isLoading={isLoading}
              readonly={readonly}
              updateValue={updateValue}
              missingData={award.missing_data}
              name="contracting_process_id"
              label={t('Contracting Process ID')}
              award={award}
            />
            <ApplicationTableDataAwardRow
              isLoading={isLoading}
              readonly={readonly}
              updateValue={updateValue}
              missingData={award.missing_data}
              name="description"
              label={t('Award Description')}
              award={award}
            />
            <ApplicationTableDataAwardRow
              type="date-field"
              isLoading={isLoading}
              readonly={readonly}
              updateValue={updateValue}
              missingData={award.missing_data}
              name="award_date"
              label={t('Award Date')}
              award={award}
              formatter={formatDateFromString}
            />
            <ApplicationTableDataAwardRow
              type="currency"
              isLoading={isLoading}
              readonly={readonly}
              updateValue={updateValue}
              missingData={award.missing_data}
              name="award_amount"
              label={t('Award Value Currency & Amount')}
              formLabel={t('Award Amount')}
              award={award}
              formatter={(value) => `${award.award_currency} ${formatCurrency(value, award.award_currency)}`}
            />
            <ApplicationTableDataAwardRow
              type="date-field"
              isLoading={isLoading}
              readonly={readonly}
              updateValue={updateValue}
              missingData={award.missing_data}
              name="contractperiod_startdate"
              label={t('Contract Start Date')}
              award={award}
              formatter={formatDateFromString}
            />
            <ApplicationTableDataAwardRow
              type="date-field"
              isLoading={isLoading}
              readonly={readonly}
              updateValue={updateValue}
              missingData={award.missing_data}
              name="contractperiod_enddate"
              label={t('Contract End Date')}
              award={award}
              formatter={formatDateFromString}
            />
            <ApplicationTableDataAwardRow
              preWhitespace
              isLoading={isLoading}
              readonly={readonly}
              updateValue={updateValue}
              missingData={award.missing_data}
              name="payment_method"
              label={t('Payment Method')}
              award={award}
              formatter={formatPaymentMethod}
            />
            <ApplicationTableDataAwardRow
              isLoading={isLoading}
              readonly={readonly}
              updateValue={updateValue}
              missingData={award.missing_data}
              name="buyer_name"
              label={t('Buyer Name')}
              award={award}
            />
            <ApplicationTableDataAwardRow
              isLoading={isLoading}
              readonly={readonly}
              updateValue={updateValue}
              missingData={award.missing_data}
              name="procurement_method"
              label={t('Procurement Method')}
              award={award}
            />
            <ApplicationTableDataAwardRow
              isLoading={isLoading}
              readonly={readonly}
              updateValue={updateValue}
              missingData={award.missing_data}
              name="procurement_category"
              label={t('Contract Type')}
              award={award}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

ApplicationAwardTable.defaultProps = {
  readonly: false,
  className: '',
};

export default ApplicationAwardTable;
