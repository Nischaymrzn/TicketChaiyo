import { useAuth } from '@/state-stores/Auth';
import { Outlet } from 'react-router';
import Unauthorized from './client/_components/Unauthorized';

const ClientLayout = () => {
    const { user } = useAuth();

    // @ts-ignore
    if (user?.data.userRole != "client"){
        return <Unauthorized />
    }

  return <Outlet />;
}

export default ClientLayout
