/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable camelcase */
import { useQuery } from '@tanstack/react-query';
import { t } from '@transifex/native';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { renderUserType } from 'src/util';

import { getUsersFn } from '../api/private';
import { QUERY_KEYS } from '../constants';
import { IUser, IUsersListResponse } from '../schemas/auth';
import LinkButton from '../stories/link-button/LinkButton';
import { DataTable, HeadCell } from './DataTable';

const headCells: HeadCell<IUser>[] = [
  {
    id: 'email',
    disablePadding: false,
    label: t('user email'),
    sortable: false,
  },
  {
    id: 'name',
    type: 'date',
    disablePadding: false,
    label: t('User name'),
    sortable: false,
  },
  {
    id: 'type',
    disablePadding: false,
    label: t('Type'),
    sortable: false,
    render: (row: IUser) => <>{renderUserType(row.type)}</>,
  },
];

const UserDataTable = DataTable<IUser>;

const actions = (row: IUser) => (
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

  const [rows, setRows] = useState<IUser[]>([]);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.users],
    queryFn: async (): Promise<IUsersListResponse | null> => {
      const response = await getUsersFn();
      return response;
    },
    retry: 1,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.detail) {
        enqueueSnackbar(t('Error: {error}', { error: error.response.data.detail }), {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(t('Error loading lenders'), {
          variant: 'error',
        });
      }
    },
  });

  useEffect(() => {
    if (data) {
      setRows(data.items);
    }
  }, [data]);

  return <UserDataTable rows={rows} useEmptyRows={false} headCells={headCells} actions={actions} />;
}

export default UserList;
