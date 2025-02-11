import { useAuth } from '@/state-stores/Auth';
import { Outlet } from 'react-router';
import Unauthorized from './client/_components/Unauthorized';
import SideNav from './organizer/_components/SideNav';

const OrganizerLayout = () => {
    const { user } = useAuth();

    // @ts-ignore
    if (user?.userRole != "organizer"){
        return <Unauthorized />
    }

  return(
    <div className="bg-[#13131A] h-[100vh] w-full flex flex-row">
        <div>
          <SideNav />
        </div>
        <div className="p-6 w-full mt-12 md:mt-0">
          <Outlet />
        </div>
    </div>
  )
}

export default OrganizerLayout
