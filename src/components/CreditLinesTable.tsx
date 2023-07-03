import { Box, Link as MUILink, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { useT } from '@transifex/react';
import Text from 'src/stories/text/Text';

import { ICreditProduct } from '../schemas/application';
import Button from '../stories/button/Button';
import { formatCurrency } from '../util';
import { DataTableCell, DataTableHeadCell, DataTableHeadLabel, TransparentDataTableCell } from './DataTable';
import DataWithDetail from './DataWithDetail';

export interface CreditLinesTableProps {
  rows: ICreditProduct[];
  currency: string;
  isLoading?: boolean;
  selectOption: (value: ICreditProduct) => void;
}

export function CreditLinesTable({ rows, currency, isLoading, selectOption }: CreditLinesTableProps) {
  const t = useT();

  if (!rows.length && !isLoading) {
    return <Text>{t('No credit line options available')}</Text>;
  }

  return (
    <Box>
      <Paper elevation={0} square className="bg-background">
        <TableContainer>
          <Table aria-labelledby="credit-lines-table" size="medium">
            <TableHead>
              <TableRow>
                <DataTableHeadCell width={240}>
                  <span style={{ width: '240px' }} />
                </DataTableHeadCell>
                {rows.map((row) => (
                  <DataTableHeadCell key={`header-${row.id}`}>
                    <DataTableHeadLabel label={row.lender.name} />
                  </DataTableHeadCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <DataTableCell width={240}>{t('Max amount')}</DataTableCell>
                {rows.map((row) => (
                  <DataTableCell key={`amount-${row.id}`}>
                    {`${currency} ${formatCurrency(row.upper_limit, currency)}`}
                  </DataTableCell>
                ))}
              </TableRow>
              <TableRow>
                <DataTableCell>{t('Interest rate')}</DataTableCell>
                {rows.map((row) => (
                  <DataTableCell key={`interest-rate-${row.id}`}>{`${row.interest_rate}%`}</DataTableCell>
                ))}
              </TableRow>
              <TableRow>
                <DataTableCell>{t('Other fees')}</DataTableCell>
                {rows.map((row) => (
                  <DataTableCell key={`other-fees-${row.id}`}>
                    <DataWithDetail
                      name={`${currency} ${formatCurrency(row.other_fees_total_amount, currency)}`}
                      detail={row.other_fees_description}
                    />
                  </DataTableCell>
                ))}
              </TableRow>
              <TableRow>
                <DataTableCell>{t('More information')}</DataTableCell>
                {rows.map((row) => (
                  <DataTableCell key={`more-info-${row.id}`}>
                    <MUILink color="inherit" target="_blank" rel="noreferrer" href={row.more_info_url}>
                      {t('View details')}
                    </MUILink>
                  </DataTableCell>
                ))}
              </TableRow>
              <TableRow className="border-0">
                <TransparentDataTableCell />
                {rows.map((row) => (
                  <TransparentDataTableCell key={`pick-${row.id}`}>
                    <Button disabled={isLoading} label={t('Select')} onClick={() => selectOption(row)} />
                  </TransparentDataTableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

CreditLinesTable.defaultProps = {
  isLoading: false,
};

export default CreditLinesTable;
