import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { useT } from '@transifex/react';

import { CREDIT_PRODUCT_TYPE } from '../constants';
import useLocalizedDateFormatter from '../hooks/useLocalizedDateFormatter';
import { IApplication, ICreditProduct } from '../schemas/application';
import Title from '../stories/title/Title';
import { formatCurrency } from '../util';
import { DataTableCell, DataTableHeadCell, DataTableHeadLabel } from './DataTable';

export interface CreditProductConfirmationProps {
  creditProduct: ICreditProduct;
  application: IApplication;
}

export function CreditProductConfirmation({ creditProduct, application }: CreditProductConfirmationProps) {
  const t = useT();
  const { formatDateFromString } = useLocalizedDateFormatter();

  const isLoan = creditProduct.type === CREDIT_PRODUCT_TYPE.LOAN;

  return (
    <>
      <Title type="subsection" className="mb-2" label={isLoan ? t('Loan') : t('Credit Line')} />

      <Paper elevation={0} square className="bg-background">
        <TableContainer>
          <Table aria-labelledby="credit-product-confirmation-table" size="medium">
            <TableHead>
              <TableRow>
                <DataTableHeadCell>
                  <DataTableHeadLabel label={t('Lender')} />
                </DataTableHeadCell>

                <DataTableHeadCell>
                  <DataTableHeadLabel label={isLoan ? t('Amount') : t('Max amount')} />
                </DataTableHeadCell>

                {isLoan && (
                  <DataTableHeadCell>
                    <DataTableHeadLabel label={t('Repayment')} />
                  </DataTableHeadCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <DataTableCell>{creditProduct.lender.name}</DataTableCell>
                <DataTableCell>
                  {isLoan
                    ? `${application.currency} ${formatCurrency(
                        application.calculator_data.amount_requested,
                        application.currency,
                      )}`
                    : `${application.currency} ${formatCurrency(creditProduct.upper_limit, application.currency)}`}
                </DataTableCell>

                {isLoan && (
                  <DataTableCell>
                    {t('{repayment_years} year(s), {repayment_months} month(s)', {
                      repayment_years: application.calculator_data.repayment_years,
                      repayment_months: application.calculator_data.repayment_months,
                    })}
                  </DataTableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={0} square className="bg-background mt-4">
        <TableContainer>
          <Table aria-labelledby="credit-product-confirmation-table" size="medium">
            <TableHead>
              <TableRow>
                {isLoan && (
                  <DataTableHeadCell>
                    <DataTableHeadLabel label={t('Payment start date')} />
                  </DataTableHeadCell>
                )}

                <DataTableHeadCell>
                  <DataTableHeadLabel label={t('Interest rate')} />
                </DataTableHeadCell>

                <DataTableHeadCell>
                  <DataTableHeadLabel label={t('Other fees')} />
                </DataTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {isLoan && (
                  <DataTableCell>{formatDateFromString(application.calculator_data.payment_start_date)}</DataTableCell>
                )}
                <DataTableCell>{`${creditProduct.interest_rate}%`}</DataTableCell>
                <DataTableCell>
                  {`${application.currency} ${formatCurrency(
                    creditProduct.other_fees_total_amount,
                    application.currency,
                  )}`}
                </DataTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default CreditProductConfirmation;
