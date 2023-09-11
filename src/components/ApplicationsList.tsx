/* eslint-disable camelcase */
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { t } from '@transifex/native';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { getApplicationsFI, getApplicationsOCP } from '../api/private';
import {
  APPLICATION_STATUS,
  COMPLETED_STATUS,
  NOT_STARTED_STATUS,
  PAGE_SIZES,
  QUERY_KEYS,
  STARTED_STATUS,
  USER_TYPES,
} from '../constants';
import useDownloadApplication from '../hooks/useDownloadApplication';
import useStartApplication from '../hooks/useStartApplication';
import {
  EXTENDED_APPLICATION_FROM,
  IApplication,
  IApplicationsListResponse,
  IExtendedApplication,
  PaginationInput,
} from '../schemas/application';
import LinkButton from '../stories/link-button/LinkButton';
import { renderApplicationStatus } from '../util';
import { DataTable, HeadCell, Order } from './DataTable';

const headCellsBase: HeadCell<IApplication & IExtendedApplication>[] = [
  {
    id: 'borrower_name',
    disablePadding: false,
    label: t('Name of Company'),
    sortable: true,
  },
  {
    id: 'buyer_name',
    disablePadding: false,
    label: t('Buyer'),
    sortable: true,
  },
  {
    id: 'borrower_submitted_at',
    type: 'date',
    disablePadding: false,
    label: t('Submission Date'),
    sortable: false,
    width: 155,
  },
  {
    id: 'status',
    disablePadding: false,
    label: t('Stage'),
    sortable: true,
    render: (row: IApplication & IExtendedApplication, headCell: HeadCell<IApplication & IExtendedApplication>) =>
      renderApplicationStatus(String(row[headCell.id])),
  },
];

const headCellsOCP: HeadCell<IApplication & IExtendedApplication>[] = [
  {
    id: 'lender_name',
    disablePadding: false,
    label: t('Credit Provider'),
    sortable: true,
    width: 174,
  },
];

type ExtendendApplication = IApplication & IExtendedApplication;
const ApplicationDataTable = DataTable<ExtendendApplication>;

const actionsFIBase = (
  row: ExtendendApplication,
  isLoading: boolean,
  onStartApplicationHandler: (id: number) => void,
  onDownloadApplicationHandler: (id: number) => void,
) => (
  <Box className="flex flex-row">
    {STARTED_STATUS.includes(row.status) && (
      <LinkButton
        className="p-1 justify-start"
        component={Link}
        disabled={isLoading}
        to={`/applications/${row.id}/stage-one`}
        label={t('Continue')}
        size="small"
        noIcon
      />
    )}
    {NOT_STARTED_STATUS.includes(row.status) && (
      <LinkButton
        className="p-1 justify-start"
        onClick={() => onStartApplicationHandler(row.id)}
        label={t('Start')}
        disabled={isLoading}
        size="small"
        noIcon
      />
    )}
    {APPLICATION_STATUS.CONTRACT_UPLOADED === row.status && (
      <LinkButton
        className="p-1 justify-start"
        component={Link}
        to={`/applications/${row.id}/complete-application`}
        label={t('Review')}
        disabled={isLoading}
        size="small"
        noIcon
      />
    )}
    {COMPLETED_STATUS.includes(row.status) && (
      <LinkButton
        className="p-1 justify-start"
        component={Link}
        to={`/applications/${row.id}/view`}
        label={t('View')}
        disabled={isLoading}
        size="small"
        noIcon
      />
    )}
    <LinkButton
      className="p-1 justify-start"
      onClick={() => onDownloadApplicationHandler(row.id)}
      label={t('Download')}
      disabled={isLoading}
      size="small"
      noIcon
    />
  </Box>
);

const actionsOCP = (row: ExtendendApplication) => (
  <Box className="flex flex-row">
    <LinkButton
      className="p-1 justify-start"
      component={Link}
      to={`/admin/applications/${row.id}/view`}
      label={t('View')}
      size="small"
      noIcon
    />
    {!COMPLETED_STATUS.includes(row.status) && (
      <LinkButton
        className="p-1 justify-start"
        component={Link}
        to={`/admin/applications/${row.id}/update`}
        label={t('Update')}
        size="small"
        noIcon
      />
    )}
  </Box>
);

interface ApplicationListProps {
  type: USER_TYPES;
}

export function ApplicationList({ type }: ApplicationListProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { startApplicationMutation } = useStartApplication();
  const [idToDownload, setIdToDownload] = useState<number | undefined>();

  const { downloadedApplication, isLoading } = useDownloadApplication(idToDownload);

  const [payload, setPayload] = useState<PaginationInput>({
    page: 0,
    page_size: PAGE_SIZES[0],
    sort_field: 'application.created_at',
    sort_order: 'desc',
  });

  const [rows, setRows] = useState<ExtendendApplication[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const handleChangePage = (newPage: number, rowsPerPage: number) => {
    setPayload((prev) => ({
      ...prev,
      page: newPage,
      page_size: rowsPerPage,
    }));
  };

  const handleRequestSort = (property: Extract<keyof ExtendendApplication, string>, sortOrder: Order) => {
    let sort_field: string = property;
    if (Object.keys(EXTENDED_APPLICATION_FROM).includes(property)) {
      sort_field = EXTENDED_APPLICATION_FROM[property as keyof IExtendedApplication];
    }
    setPayload((prev) => ({
      ...prev,
      sort_field,
      sort_order: sortOrder,
    }));
  };

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.applications, payload],
    queryFn: async (): Promise<IApplicationsListResponse | null> => {
      if (type === USER_TYPES.OCP) {
        const response = await getApplicationsOCP(payload);
        return response;
      }
      const response = await getApplicationsFI(payload);
      return response;
    },
    retry: 1,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.detail) {
        enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(t('Error loading applications'), {
          variant: 'error',
        });
      }
    },
  });

  useEffect(() => {
    if (data) {
      const newRows = data.items.map((item) => ({
        ...item,
        borrower_name: item.borrower.legal_name,
        buyer_name: item.award.buyer_name,
        lender_name: item.lender?.name || t('Not Assigned'),
      }));
      setRows(newRows);
      setTotalCount(data.count);
    }
  }, [data]);

  const headCells = useMemo(
    () => (type === USER_TYPES.OCP ? [...headCellsBase, ...headCellsOCP] : headCellsBase),
    [type],
  );

  const onStartApplicationHandler = useCallback(
    (id: number) => {
      startApplicationMutation(id);
    },
    [startApplicationMutation],
  );

  useEffect(() => {
    if (downloadedApplication) {
      const href = window.URL.createObjectURL(downloadedApplication);

      const anchorElement = document.createElement('a');

      anchorElement.href = href;
      const filename = `${t('application')}-${idToDownload}.zip`;
      anchorElement.download = filename;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
      setIdToDownload(undefined);
    }
  }, [downloadedApplication, idToDownload]);

  const onDownloadApplicationHandler = useCallback(
    (id: number) => {
      setIdToDownload(id);
    },
    [setIdToDownload],
  );

  // eslint-disable-next-line no-shadow
  const actionsFI = (row: ExtendendApplication, isLoading?: boolean) =>
    actionsFIBase(
      row,
      isLoading !== undefined ? isLoading : false,
      onStartApplicationHandler,
      onDownloadApplicationHandler,
    );

  return (
    <ApplicationDataTable
      rows={rows}
      useEmptyRows
      handleRequestSort={handleRequestSort}
      headCells={headCells}
      pagination={{
        totalCount,
        handleChangePage,
      }}
      isLoading={isLoading}
      actions={type === USER_TYPES.OCP ? actionsOCP : actionsFI}
    />
  );
}

export default ApplicationList;
