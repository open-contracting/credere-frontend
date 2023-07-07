/* eslint-disable camelcase */
import { useQuery } from '@tanstack/react-query';
import { t } from '@transifex/native';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { renderUserType } from 'src/util';

import { getUsersFn } from '../api/private';
import { PAGE_SIZES, QUERY_KEYS } from '../constants';
import { EXTENDED_USER_FROM, IExtendedUser, PaginationInput } from '../schemas/application';
import { IUser, IUsersListResponse } from '../schemas/auth';
import LinkButton from '../stories/link-button/LinkButton';
import { DataTable, HeadCell, Order } from './DataTable';

type ExtendendUser = IUser & IExtendedUser;
const UserDataTable = DataTable<ExtendendUser>;

const headCells: HeadCell<ExtendendUser>[] = [
  {
    id: 'user_name',
    disablePadding: false,
    label: t('Full Name'),
    sortable: true,
  },
  {
    id: 'email',
    disablePadding: false,
    label: t('Email'),
    sortable: true,
  },
  {
    id: 'type',
    disablePadding: false,
    label: t('Type'),
    sortable: true,
    render: (row: ExtendendUser) => <>{renderUserType(row.type)}</>,
  },
  {
    id: 'lender_name',
    disablePadding: false,
    label: t('Lender'),
    sortable: true,
  },
  {
    id: 'created_at',
    type: 'date',
    disablePadding: false,
    label: t('Created At'),
    sortable: true,
  },
];

const actions = (row: ExtendendUser) => (
  <LinkButton
    className="p-1 justify-start"
    component={Link}
    to={`/settings/user/${row.id}/edit`}
    label={t('Edit')}
    size="small"
    noIcon
  />
);

export function UserList() {
  const { enqueueSnackbar } = useSnackbar();
  const [payload, setPayload] = useState<PaginationInput>({
    page: 0,
    page_size: PAGE_SIZES[0],
    sort_field: 'user_created_at',
    sort_order: 'desc',
  });

  const [rows, setRows] = useState<ExtendendUser[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const handleChangePage = (newPage: number, rowsPerPage: number) => {
    setPayload((prev) => ({
      ...prev,
      page: newPage,
      page_size: rowsPerPage,
    }));
  };

  const handleRequestSort = (property: Extract<keyof ExtendendUser, string>, sortOrder: Order) => {
    let sort_field: string = property;
    if (Object.keys(EXTENDED_USER_FROM).includes(property)) {
      sort_field = EXTENDED_USER_FROM[property as keyof IExtendedUser];
    }
    setPayload((prev) => ({
      ...prev,
      sort_field,
      sort_order: sortOrder,
    }));
  };

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.users, payload],
    queryFn: async (): Promise<IUsersListResponse | null> => {
      const response = await getUsersFn(payload);
      return response;
    },
    retry: 1,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.detail) {
        enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(t('Error loading users'), {
          variant: 'error',
        });
      }
    },
  });

  useEffect(() => {
    if (data) {
      const newRows = data.items.map((item) => ({
        ...item,
        lender_name: item.lender?.name || '-',
        user_name: item.name,
      }));
      setRows(newRows);
      setTotalCount(data.count);
    }
  }, [data]);

  return (
    <UserDataTable
      rows={rows}
      useEmptyRows={false}
      handleRequestSort={handleRequestSort}
      pagination={{
        totalCount,
        handleChangePage,
      }}
      headCells={headCells}
      actions={actions}
    />
  );
}

export default UserList;
