import { Link, Outlet, useLocation } from "react-router"
import ClientNav from "./_components/ClientNav"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useGetMe } from "@/hooks/useAuth"


export const ProfileLayout = () => {

    const location = useLocation()
    const pathname = location.pathname

    const {data} = useGetMe()
    
    const userData = data?.userData

    const navItems = [
        { label: "My Bookings", href: "/profile/bookings" },
        { label: "Settings", href: "/profile/setting" },
      ]
  return (
    <div className='flex flex-col gap-4 min-h-[100vh] bg-[#13131A] overflow-hidden'>
       <ClientNav />
       <div className="w-[80vw] flex flex-col mt-10 mx-auto">
        <div className="w-full border border-gray-800 rounded-lg bg-[#1c1c24]">
            <div className="px-6 pt-6">
                <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                        <AvatarFallback>{userData?.name.split("")[0]}{userData?.name.split(" ")[1][0]}</AvatarFallback>
                    </Avatar>
                <div>
                <h2 className="text-xl font-semibold text-white">{userData?.name}</h2>
                <p className="text-gray-400">{userData?.email}</p>
            </div>
        </div>
        <nav className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm ${
                pathname === item.href ? "text-white border-b-2 border-[#E31D58] pb-4" : "text-gray-400 pb-4"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        </div>
        </div>
            <Outlet />
       </div>
    </div>
  )
}
