/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { useT } from '@transifex/react';

import useUpdateBorrower from '../hooks/useUpdateBorrower';
import { IApplication, IUpdateBorrower } from '../schemas/application';
import ApplicationTableDataBorrowerRow from './ApplicationTableDataBorrowerRow';
import { DataTableHeadCell, DataTableHeadLabel } from './DataTable';

export interface ApplicationBorrowerTableProps {
  application: IApplication;
  readonly: boolean;
}

export function ApplicationBorrowerTable({ application, readonly }: ApplicationBorrowerTableProps) {
  const t = useT();
  const { updateBorrowerMutation, isLoading } = useUpdateBorrower();

  const { borrower } = application;

  const updateValue = (value: string, name: keyof IUpdateBorrower) => {
    const payload: IUpdateBorrower = {
      application_id: application.id,
      [name]: value,
    };

    updateBorrowerMutation(payload);
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
                <DataTableHeadCell>
                  <DataTableHeadLabel label={t('Data Verified')} />
                </DataTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <ApplicationTableDataBorrowerRow
                isLoading={isLoading}
                readonly={readonly}
                verifiedData={application.secop_data_verification}
                updateValue={updateValue}
                missingData={borrower.missing_data}
                name="legal_name"
                label={t('Legal Name')}
                borrower={borrower}
              />
              <ApplicationTableDataBorrowerRow
                preWhitespace
                isLoading={isLoading}
                readonly={readonly}
                verifiedData={application.secop_data_verification}
                updateValue={updateValue}
                missingData={borrower.missing_data}
                name="address"
                label={t('Address')}
                borrower={borrower}
              />
              <ApplicationTableDataBorrowerRow
                isLoading={isLoading}
                readonly={readonly}
                verifiedData={application.secop_data_verification}
                updateValue={updateValue}
                missingData={borrower.missing_data}
                name="legal_identifier"
                label={t('National Tax ID')}
                borrower={borrower}
              />
              <ApplicationTableDataBorrowerRow
                isLoading={isLoading}
                readonly={readonly}
                verifiedData={application.secop_data_verification}
                updateValue={updateValue}
                missingData={borrower.missing_data}
                name="type"
                label={t('Registration Type')}
                borrower={borrower}
              />
              <ApplicationTableDataBorrowerRow
                isLoading={isLoading}
                readonly={readonly}
                verifiedData={application.secop_data_verification}
                updateValue={updateValue}
                missingData={borrower.missing_data}
                name="sector"
                label={t('Sector')}
                borrower={borrower}
              />
              <ApplicationTableDataBorrowerRow
                isLoading={isLoading}
                readonly={readonly}
                verifiedData={application.secop_data_verification}
                updateValue={updateValue}
                missingData={borrower.missing_data}
                name="email"
                label={t('Business Email')}
                borrower={borrower}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default ApplicationBorrowerTable;
