/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableRow } from '@mui/material';
import { useT } from '@transifex/react';

import { IUpdateBorrower } from '../schemas/application';
import { ApplicationTableBorrowerDataRowProps } from './ApplicationTableDataRow';
import DataAvailability from './DataAvailability';
import DataAvailabilityForm from './DataAvailabilityForm';
import { DataTableCell } from './DataTable';
import DataVerificationForm from './DataVerificationForm';

const DATA_REQUESTED_FROM_MSME = ['size', 'sector'];
export function ApplicationTableDataBorrowerRow({
  label,
  name,
  borrower,
  formLabel,
  missingData,
  verifiedData,
  type,
  formatter,
  preWhitespace,
  updateValue,
  verifyData,
  withoutVerify,
  isLoading,
  readonly,
}: ApplicationTableBorrowerDataRowProps) {
  const t = useT();

  const value = borrower[name];
  const missing = missingData[name] === undefined ? true : missingData[name];

  const verified = (verifiedData && verifiedData[name]) || false;

  const formattedValue = formatter ? formatter(value) : value;
  const verifyDataValue = (verify: boolean) => {
    if (verifyData) {
      verifyData(verify, name as keyof IUpdateBorrower);
    }
  };

  return (
    <TableRow>
      <DataTableCell>{label}</DataTableCell>
      <DataTableCell>
        <DataAvailability
          available={DATA_REQUESTED_FROM_MSME.includes(name) || !missing}
          name={label}
          readonly={readonly}
        />
      </DataTableCell>
      {(!missing || withoutVerify) && (
        <DataTableCell className={preWhitespace ? 'whitespace-pre' : ''}>{formattedValue}</DataTableCell>
      )}
      {missing && updateValue && (
        <DataTableCell>
          <DataAvailabilityForm
            type={type}
            readonly={readonly}
            name={formLabel || label}
            value={value ? formattedValue : value}
            isLoading={isLoading}
            // eslint-disable-next-line no-shadow
            updateValue={(value: any) => updateValue(value, name as keyof IUpdateBorrower)}
          />
        </DataTableCell>
      )}
      <DataTableCell>
        <DataVerificationForm
          name={name}
          customLabel={withoutVerify ? t('Completed by MSME') : undefined}
          value={verified || Boolean(withoutVerify)}
          readonly={readonly || !verifyData}
          verifyData={verifyDataValue}
          isLoading={verifyData ? isLoading : true}
        />
      </DataTableCell>
    </TableRow>
  );
}

ApplicationTableDataBorrowerRow.defaultProps = {
  formatter: undefined,
  updateValue: undefined,
  preWhitespace: false,
  type: undefined,
  formLabel: undefined,
  withoutVerify: false,
};

export default ApplicationTableDataBorrowerRow;
