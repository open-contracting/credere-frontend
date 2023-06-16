import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import useUser from '../hooks/useUser';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const user = useUser();

  if (!user) return <Navigate to="/login" replace />;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
