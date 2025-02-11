import { useAuth } from '@/state-stores/Auth';
import { Navigate, Outlet, useLocation } from 'react-router';

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  console.log(location.pathname)
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout
