import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useT } from '@transifex/react';
import * as React from 'react';
import { useEffect, useMemo } from 'react';
import SorterDownIcon from 'src/assets/icons/sorter-down.svg';
import SorterUpIcon from 'src/assets/icons/sorter-up.svg';
import SorterIcon from 'src/assets/icons/sorter.svg';

import { PAGE_SIZES } from '../constants';
import { formatCurrency, formatDateFromString } from '../util';

function Sorter() {
  return <img className="pl-2" src={SorterIcon} alt="sorter-icon" />;
}

function SorterDirection({ className }: { className: string }) {
  let icon = SorterUpIcon;
  let alt = 'sorter-up-icon';
  if (className.includes('MuiTableSortLabel-iconDirectionDesc')) {
    alt = 'sorter-down-icon';
    icon = SorterDownIcon;
  }

  return <img className="pl-2 transition" src={icon} alt={alt} />;
}

function descendingComparator<T>(a: T, b: T, orderBy: Extract<keyof T, string>) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export type DataCellType = 'date' | 'currency' | undefined;

export interface HeadCell<T> {
  disablePadding: boolean;
  id: Extract<keyof T, string>;
  label: string;
  type?: DataCellType;
  render?: (row: T, headCell: HeadCell<T>) => JSX.Element;
  sortable?: boolean;
}

interface DataTableHeadProps<T> {
  onRequestSort: (event: React.MouseEvent<unknown>, property: Extract<keyof T, string>) => void;
  order: Order | undefined;
  orderBy: string | undefined;
  headCells: HeadCell<T>[];
  hasActions?: boolean;
}

function DataTableHead<T>({
  order = 'asc',
  orderBy,
  hasActions = false,
  onRequestSort,
  headCells,
}: DataTableHeadProps<T>) {
  const createSortHandler = (property: Extract<keyof T, string>) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={String(headCell.id)}
            className={`py-5 border-solid border-l border-r-0 border-t-0 border-background ${
              index !== 0 ? 'opacity-50' : ''
            }`}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.sortable && (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                className="flex flex-row justify-between text-moodyBlue text-sm font-medium"
                IconComponent={orderBy === headCell.id ? SorterDirection : Sorter}
                onClick={createSortHandler(headCell.id)}>
                {headCell.label}
              </TableSortLabel>
            )}
            {!headCell.sortable && (
              <span className="flex flex-row justify-between text-moodyBlue text-sm font-medium">{headCell.label}</span>
            )}
          </TableCell>
        ))}
        {hasActions && (
          <TableCell className="border-solid border-l border-r-0 border-t-0 border-background opacity-50">
            <span className="flex flex-row justify-between text-moodyBlue text-sm font-medium">Actions</span>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

DataTableHead.defaultProps = {
  hasActions: false,
};

export interface HandlePagination {
  totalCount: number;
  handleChangePage: (newPage: number, rowsPerPage: number) => void;
}

export interface DataTableProps<T> {
  rows: T[];
  headCells: HeadCell<T>[];
  useEmptyRows?: boolean;
  handleRequestSort?: (property: Extract<keyof T, string>, sortOrder: Order) => void;
  pagination?: HandlePagination;
  actions?: (row: T) => JSX.Element;
}

function renderValue<T>(row: T, headCell: HeadCell<T>) {
  if (headCell.render) {
    return headCell.render(row, headCell);
  }

  if (headCell.type === 'date') {
    return formatDateFromString(String(row[headCell.id]));
  }

  if (headCell.type === 'currency') {
    return formatCurrency(Number(row[headCell.id]));
  }
  return String(row[headCell.id]);
}

export function DataTable<T>({
  rows,
  headCells,
  useEmptyRows = true,
  handleRequestSort,
  pagination,
  actions,
}: DataTableProps<T>) {
  const t = useT();
  const [visibleRows, setVisibleRows] = React.useState<T[]>(rows);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<Extract<keyof T, string> | undefined>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(PAGE_SIZES[0]);

  useEffect(() => {
    if (!handleRequestSort && orderBy) {
      if (order === 'desc') {
        setVisibleRows(stableSort(rows, (a, b) => descendingComparator(a, b, orderBy)));
      } else {
        setVisibleRows(stableSort(rows, (a, b) => -descendingComparator(a, b, orderBy)));
      }
    } else {
      setVisibleRows(rows);
    }
  }, [order, orderBy, handleRequestSort, rows]);

  const onRequestSort = (_event: React.MouseEvent<unknown>, property: Extract<keyof T, string>) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
    if (handleRequestSort) {
      handleRequestSort(property, newOrder);
    }
  };

  const onChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
    pagination?.handleChangePage(newPage, rowsPerPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(`${event.target.value}`, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    pagination?.handleChangePage(0, newRowsPerPage);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = useMemo(
    () => (useEmptyRows ? Math.max(0, rowsPerPage - rows.length) : 0),
    [rows, rowsPerPage, useEmptyRows],
  );

  return (
    <Box>
      <Paper elevation={0} square>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <DataTableHead
              hasActions={Boolean(actions)}
              order={order}
              orderBy={orderBy}
              onRequestSort={onRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: T, index) => (
                <TableRow tabIndex={-1} key={`${String(index)}`}>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={`${String(`${row[headCell.id]}-${index}-${headCell.id}`)}`}
                      className="text-darkest text-sm font-thin border-solid border-l border-r-0 border-t-0 border-background">
                      {renderValue(row, headCell)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="text-darkest text-sm font-thin border-solid border-l border-r-0 border-t-0 border-background">
                      {actions(row)}
                    </TableCell>
                  )}
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}>
                  <TableCell
                    className="text-darkest text-sm font-thin border-solid border-l border-r-0 border-t-0 border-background"
                    colSpan={5}
                  />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination && (
          <TablePagination
            className="border-solid border-l border-r-0 border-t-0 border-background"
            classes={{
              selectLabel: 'text-darkest text-sm font-thin',
              select: 'text-darkest text-sm font-thin',
              menuItem: 'text-darkest text-sm font-thin',
              input: 'text-darkest text-sm font-thin',
              displayedRows: 'text-darkest text-sm font-thin',
            }}
            rowsPerPageOptions={PAGE_SIZES}
            labelRowsPerPage={t('Rows in page')}
            labelDisplayedRows={({ from, to, count }: { from: number; to: number; count: number }) =>
              `${from}–${to} ${t('of')} ${count !== -1 ? count : `${t('more than')} ${to}`}`
            }
            component="div"
            count={pagination.totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
}

DataTable.defaultProps = {
  handleRequestSort: undefined,
  pagination: undefined,
  useEmptyRows: true,
  actions: undefined,
};

export default DataTable;
