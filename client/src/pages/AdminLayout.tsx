import { useAuth } from '@/state-stores/Auth';
import { Outlet } from 'react-router';
import Unauthorized from './client/_components/Unauthorized';

const AdminLayout = () => {
    const { user } = useAuth();

    // @ts-ignore
    if (user?.userRole != "admin"){
        return <Unauthorized />
    }

  return <Outlet />;
}

export default AdminLayout
