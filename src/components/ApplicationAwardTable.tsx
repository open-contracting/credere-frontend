/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { useT } from '@transifex/react';

import useUpdateAward from '../hooks/useUpdateAward';
import { IApplication, IAward, IUpdateAward } from '../schemas/application';
import { formatCurrency, formatDateFromString, formatPaymentMethod } from '../util';
import DataAvailability from './DataAvailability';
import DataAvailabilityForm from './DataAvailabilityForm';
import { DataTableCell, DataTableHeadCell, DataTableHeadLabel } from './DataTable';

export interface ApplicationTableDataRowProps {
  label: string;
  name: keyof IAward;
  formLabel?: string;
  award: IAward;
  missingData: { [key: string]: boolean };
  type?: 'currency' | 'date-picker' | 'date-field';
  preWhitespace?: boolean;
  formatter?: (value: any) => string;
  updateValue?: (value: any, name: keyof IUpdateAward) => void;
  isLoading: boolean;
}

export function ApplicationTableDataRow({
  label,
  name,
  award,
  formLabel,
  missingData,
  type,
  formatter,
  preWhitespace,
  updateValue,
  isLoading,
}: ApplicationTableDataRowProps) {
  const value = award[name];
  const missing = missingData[name];
  const formattedValue = formatter ? formatter(value) : value;

  return (
    <TableRow>
      <DataTableCell>{label}</DataTableCell>
      <DataTableCell>
        <DataAvailability available={!missing} name={label} />
      </DataTableCell>
      {!missing && <DataTableCell className={preWhitespace ? 'whitespace-pre' : ''}>{formattedValue}</DataTableCell>}
      {missing && updateValue && (
        <DataTableCell>
          <DataAvailabilityForm
            type={type}
            name={formLabel || label}
            value={value ? formattedValue : value}
            isLoading={isLoading}
            // eslint-disable-next-line no-shadow
            updateValue={(value: any) => updateValue(value, name as keyof IUpdateAward)}
          />
        </DataTableCell>
      )}
    </TableRow>
  );
}

ApplicationTableDataRow.defaultProps = {
  formatter: undefined,
  updateValue: undefined,
  preWhitespace: false,
  type: undefined,
  formLabel: undefined,
};

export interface ApplicationAwardTableProps {
  application: IApplication;
}

export function ApplicationAwardTable({ application }: ApplicationAwardTableProps) {
  const t = useT();
  const { updateAwardMutation, isLoading } = useUpdateAward();

  const { award } = application;

  const udpateValue = (value: any, name: keyof IUpdateAward) => {
    const payload: IUpdateAward = {
      application_id: application.id,
    };
    payload[name] = value;
    updateAwardMutation(payload);
  };

  return (
    <Box>
      <Paper elevation={0} square>
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
              <ApplicationTableDataRow
                isLoading={isLoading}
                updateValue={udpateValue}
                missingData={award.missing_data}
                name="title"
                label={t('Award Title')}
                award={award}
              />
              <ApplicationTableDataRow
                isLoading={isLoading}
                updateValue={udpateValue}
                missingData={award.missing_data}
                name="contracting_process_id"
                label={t('Contracting Process ID')}
                award={award}
              />
              <ApplicationTableDataRow
                isLoading={isLoading}
                updateValue={udpateValue}
                missingData={award.missing_data}
                name="description"
                label={t('Award Description')}
                award={award}
              />
              <ApplicationTableDataRow
                type="date-field"
                isLoading={isLoading}
                updateValue={udpateValue}
                missingData={award.missing_data}
                name="award_date"
                label={t('Award Date')}
                award={award}
                formatter={formatDateFromString}
              />
              <ApplicationTableDataRow
                type="currency"
                isLoading={isLoading}
                updateValue={udpateValue}
                missingData={award.missing_data}
                name="award_amount"
                label={t('Award Value Currency & Amount')}
                formLabel={t('Award Amount')}
                award={award}
                formatter={(value) => `${award.award_currency} ${formatCurrency(value, award.award_currency)}`}
              />
              <ApplicationTableDataRow
                type="date-field"
                isLoading={isLoading}
                updateValue={udpateValue}
                missingData={award.missing_data}
                name="contractperiod_startdate"
                label={t('Contract Start Date')}
                award={award}
                formatter={formatDateFromString}
              />
              <ApplicationTableDataRow
                type="date-field"
                isLoading={isLoading}
                updateValue={udpateValue}
                missingData={award.missing_data}
                name="contractperiod_enddate"
                label={t('Contract End Date')}
                award={award}
                formatter={formatDateFromString}
              />
              <ApplicationTableDataRow
                preWhitespace
                isLoading={isLoading}
                updateValue={udpateValue}
                missingData={award.missing_data}
                name="payment_method"
                label={t('Payment Method')}
                award={award}
                formatter={formatPaymentMethod}
              />
              <ApplicationTableDataRow
                isLoading={isLoading}
                updateValue={udpateValue}
                missingData={award.missing_data}
                name="buyer_name"
                label={t('Buyer Name')}
                award={award}
              />
              <ApplicationTableDataRow
                isLoading={isLoading}
                updateValue={udpateValue}
                missingData={award.missing_data}
                name="procurement_method"
                label={t('Procurement Method')}
                award={award}
              />
              <ApplicationTableDataRow
                isLoading={isLoading}
                updateValue={udpateValue}
                missingData={award.missing_data}
                name="procurement_category"
                label={t('Contract Type')}
                award={award}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default ApplicationAwardTable;
