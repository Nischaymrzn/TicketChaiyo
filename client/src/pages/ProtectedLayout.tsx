import { useAuth } from '@/state-stores/Auth';
import { Navigate, Outlet } from 'react-router';

const ProtectedLayout = () => {
    const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedLayout
