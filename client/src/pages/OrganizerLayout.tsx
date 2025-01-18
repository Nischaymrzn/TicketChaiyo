import { useAuth } from '@/state-stores/Auth';
import { Outlet } from 'react-router';
import Unauthorized from './client/_components/Unauthorized';

const OrganizerLayout = () => {
    const { user } = useAuth();

    // @ts-ignore
    if (user?.userRole != "organizer"){
        return <Unauthorized />
    }

  return <Outlet />;
}

export default OrganizerLayout
