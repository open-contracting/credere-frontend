import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { useT } from '@transifex/react';

import useUpdateBorrower from '../hooks/useUpdateBorrower';
import useVerifyDataField from '../hooks/useVerifyDataField';
import { IApplication, IUpdateBorrower } from '../schemas/application';
import { renderSector, renderSize } from '../util';
import ApplicationTableDataBorrowerRow from './ApplicationTableDataBorrowerRow';
import { DataTableHeadCell, DataTableHeadLabel } from './DataTable';

export interface ApplicationBorrowerTableProps {
  application: IApplication;
  readonly?: boolean;
  allowDataVerification?: boolean;
  className?: string;
}

export function ApplicationBorrowerTable({
  application,
  readonly = false,
  allowDataVerification = false,
  className,
}: ApplicationBorrowerTableProps) {
  const t = useT();
  const { updateBorrowerMutation, isLoading } = useUpdateBorrower();
  const { verifyDataFieldMutation, isLoading: isLoadingVerifyDataField } = useVerifyDataField();

  const { borrower } = application;

  const updateValue = (value: string, name: keyof IUpdateBorrower) => {
    const payload: IUpdateBorrower = {
      application_id: application.id,
      [name]: value,
    };

    updateBorrowerMutation(payload);
  };

  const verifyDataField = (value: boolean, name: keyof IUpdateBorrower) => {
    const payload: IUpdateBorrower = {
      application_id: application.id,
      [name]: value,
    };

    verifyDataFieldMutation(payload);
  };

  return (
    <Paper elevation={0} square className={className}>
      <TableContainer>
        <Table aria-labelledby="borrower-table" size="medium">
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
              isLoading={isLoading || isLoadingVerifyDataField}
              readonly={readonly}
              verifiedData={application.secop_data_verification}
              updateValue={updateValue}
              verifyData={allowDataVerification ? verifyDataField : undefined}
              missingData={borrower.missing_data}
              name="legal_name"
              label={t('Legal Name')}
              borrower={borrower}
            />
            <ApplicationTableDataBorrowerRow
              preWhitespace
              isLoading={isLoading || isLoadingVerifyDataField}
              readonly={readonly}
              verifiedData={application.secop_data_verification}
              updateValue={updateValue}
              verifyData={allowDataVerification ? verifyDataField : undefined}
              missingData={borrower.missing_data}
              name="address"
              label={t('Address')}
              borrower={borrower}
            />
            <ApplicationTableDataBorrowerRow
              isLoading={isLoading || isLoadingVerifyDataField}
              readonly={readonly}
              verifiedData={application.secop_data_verification}
              updateValue={updateValue}
              verifyData={allowDataVerification ? verifyDataField : undefined}
              missingData={borrower.missing_data}
              name="legal_identifier"
              label={t('National Tax ID')}
              borrower={borrower}
            />
            <ApplicationTableDataBorrowerRow
              isLoading={isLoading || isLoadingVerifyDataField}
              readonly={readonly}
              verifiedData={application.secop_data_verification}
              updateValue={updateValue}
              verifyData={allowDataVerification ? verifyDataField : undefined}
              missingData={borrower.missing_data}
              name="type"
              label={t('Registration Type')}
              borrower={borrower}
            />
            <ApplicationTableDataBorrowerRow
              isLoading={isLoading || isLoadingVerifyDataField}
              readonly
              withoutVerify
              name="size"
              label={t('Size')}
              missingData={borrower.missing_data}
              verifiedData={application.secop_data_verification}
              borrower={borrower}
              formatter={renderSize}
            />
            <ApplicationTableDataBorrowerRow
              isLoading={isLoading || isLoadingVerifyDataField}
              readonly
              withoutVerify
              name="sector"
              label={t('Sector')}
              missingData={borrower.missing_data}
              verifiedData={application.secop_data_verification}
              borrower={borrower}
              formatter={renderSector}
            />
            <ApplicationTableDataBorrowerRow
              isLoading={isLoading || isLoadingVerifyDataField}
              readonly={readonly}
              verifiedData={application.secop_data_verification}
              updateValue={updateValue}
              verifyData={allowDataVerification ? verifyDataField : undefined}
              missingData={borrower.missing_data}
              name="email"
              label={t('Business Email')}
              borrower={borrower}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

ApplicationBorrowerTable.defaultProps = {
  readonly: false,
  className: '',
  allowDataVerification: false,
};

export default ApplicationBorrowerTable;
