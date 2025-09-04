import { TableRow } from "@mui/material";
import { useTranslation as useT } from "react-i18next";

import type { IUpdateBorrower } from "../schemas/application";
import type { ApplicationTableBorrowerDataRowProps } from "./ApplicationTableDataRow";
import DataAvailability from "./DataAvailability";
import DataAvailabilityForm from "./DataAvailabilityForm";
import { DataTableCell } from "./DataTable";
import DataVerificationForm from "./DataVerificationForm";

const DATA_REQUESTED_FROM_MSME = ["size", "sector", "annual_revenue"];
export function ApplicationTableDataBorrowerRow({
  label,
  name,
  useTranslation,
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
  modifiedFields,
}: ApplicationTableBorrowerDataRowProps) {
  const { t } = useT();

  const value = borrower[name];
  const missing = missingData[name] === undefined ? true : missingData[name];

  const verified = verifiedData?.[name] || false;

  let formattedValue = formatter ? formatter(value) : value;
  if (useTranslation) {
    formattedValue = t(formattedValue);
  }

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
          name={name}
          label={label}
          readonly={readonly}
          modifiedFields={modifiedFields}
        />
      </DataTableCell>
      {(!missing || withoutVerify) && (
        <DataTableCell className={preWhitespace ? "whitespace-pre" : ""}>{formattedValue}</DataTableCell>
      )}
      {missing && updateValue && (
        <DataTableCell>
          <DataAvailabilityForm
            type={type}
            readonly={readonly}
            name={formLabel || label}
            value={value ? formattedValue : value}
            isLoading={isLoading}
            updateValue={(value: any) => updateValue(value, name as keyof IUpdateBorrower)}
          />
        </DataTableCell>
      )}
      <DataTableCell>
        <DataVerificationForm
          name={name}
          customLabel={withoutVerify ? t("Completed by business") : undefined}
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
  modifiedFields: undefined,
  useTranslation: false,
};

export default ApplicationTableDataBorrowerRow;
