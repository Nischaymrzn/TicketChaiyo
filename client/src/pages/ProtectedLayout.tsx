import { useAuth } from '@/state-stores/Auth';
import { Navigate, Outlet } from 'react-router';

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  console.log("protected" , isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedLayout
