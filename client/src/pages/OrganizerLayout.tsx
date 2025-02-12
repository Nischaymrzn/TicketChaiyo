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
    <div className="bg-[#13131A] h-full w-full flex flex-row">
        <div className='fixed z-10'>
          <SideNav />
        </div>
        <div className="z-0 p-6 w-full min-h-[100vh] mt-12 lg:mt-0 lg:pl-[19.5rem]">
          <Outlet />
        </div>
    </div>
  )
}

export default OrganizerLayout
