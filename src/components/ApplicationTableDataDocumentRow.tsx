import { TableRow } from '@mui/material';
import DocumentIcon from 'src/assets/icons/document.svg';

import { DOCUMENT_TYPES_NAMES } from '../constants';
import LinkButton from '../stories/link-button/LinkButton';
import { ApplicationTableDocumentDataRowProps } from './ApplicationTableDataRow';
import DataAvailability from './DataAvailability';
import { DataTableCell } from './DataTable';
import DataVerificationForm from './DataVerificationForm';

export function ApplicationTableDataDocumentRow({
  document,
  formatter,
  preWhitespace,
  downloadDocument,
  verifyData,
  isLoading = false,
  readonly = false,
}: ApplicationTableDocumentDataRowProps) {
  const value = document.name;
  const missing = false;

  const formattedValue = formatter ? formatter(value) : value;
  const verifyDataValue = (verify: boolean) => {
    if (verifyData) {
      verifyData(verify, document.id);
    }
  };

  return (
    <TableRow>
      <DataTableCell>{DOCUMENT_TYPES_NAMES[document.type]}</DataTableCell>
      <DataTableCell>
        <DataAvailability available={!missing} label={document.type} readonly={readonly} />
      </DataTableCell>
      {!downloadDocument && (
        <DataTableCell className={preWhitespace ? 'whitespace-pre' : ''}>{formattedValue}</DataTableCell>
      )}
      {downloadDocument && (
        <DataTableCell>
          <LinkButton
            className="p-1 justify-start"
            onClick={() => downloadDocument(document.id, document.name)}
            label={value}
            size="small"
            icon={DocumentIcon}
          />
        </DataTableCell>
      )}
      <DataTableCell>
        <DataVerificationForm
          name={document.type}
          value={document.verified}
          readonly={readonly}
          verifyData={verifyDataValue}
          isLoading={verifyData ? isLoading : true}
        />
      </DataTableCell>
    </TableRow>
  );
}

ApplicationTableDataDocumentRow.defaultProps = {
  formatter: undefined,
  downloadDocument: undefined,
  preWhitespace: false,
  type: undefined,
  formLabel: undefined,
};

export default ApplicationTableDataDocumentRow;
