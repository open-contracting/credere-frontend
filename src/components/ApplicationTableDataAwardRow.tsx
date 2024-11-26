/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableRow } from "@mui/material";

import type { IUpdateAward } from "../schemas/application";
import type { ApplicationTableAwardDataRowProps } from "./ApplicationTableDataRow";
import DataAvailability from "./DataAvailability";
import DataAvailabilityForm from "./DataAvailabilityForm";
import { DataTableCell } from "./DataTable";

export function ApplicationTableDataAwardRow({
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
  readonly,
  modifiedFields,
}: ApplicationTableAwardDataRowProps) {
  const value = award[name];
  const missing = missingData[name];
  const formattedValue = formatter ? formatter(value) : value;

  return (
    <TableRow>
      <DataTableCell>{label}</DataTableCell>
      <DataTableCell>
        <DataAvailability
          available={!missing}
          name={name}
          label={label}
          readonly={readonly}
          modifiedFields={modifiedFields}
        />
      </DataTableCell>
      {!missing && <DataTableCell className={preWhitespace ? "whitespace-pre" : ""}>{formattedValue}</DataTableCell>}
      {missing && updateValue && (
        <DataTableCell>
          <DataAvailabilityForm
            type={type}
            readonly={readonly}
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

ApplicationTableDataAwardRow.defaultProps = {
  formatter: undefined,
  updateValue: undefined,
  preWhitespace: false,
  type: undefined,
  formLabel: undefined,
  modifiedFields: undefined,
};

export default ApplicationTableDataAwardRow;
