import {CardDataStats} from "@/components/CardDataStats"
import { Calendar, Ticket, User, Users } from "lucide-react"
import { TotalUsers } from "./_components/charts/TotalUsers"
import { MostBookedEvents } from "../organizer/_components/charts/MostBookedEvents"
import { useGetMe } from "@/hooks/useAuth"
import { useGetAdminDashboardAnalytics } from "@/hooks/useAnalytics"

const Dashboard = () => {
    const {data : user } = useGetMe()
    const adminId = user?.userData?.id
    const {data:analytics} = useGetAdminDashboardAnalytics(adminId)
    
  return (
    <div className="text-gray-300 w-full flex flex-col">
      <div>
        <p className="text-2xl font-bold">Dashboard</p>

        <p className="text-sm md:text-base px-1">Monitor all your activities here</p>
      </div>

      <div className="grid-cols-1 mb-8 grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-10 mt-6">
      <CardDataStats
            title="Total Events"
            total={analytics?.totalEvents ?? 0}
            icon={<Calendar className="h-4 w-4 text-purple-500" />}
          />
          <CardDataStats
            title="Total Customers"
            total={analytics?.totalCustomers ?? 0}
            icon={<Users className="h-4 w-4 text-blue-500" />}
          />
          <CardDataStats
            title="Total Organizers"
            total={analytics?.totalOrganizers ?? 0}
            icon={<User className="h-4 w-4 text-yellow-500" />}
          />
          <CardDataStats
            title="Total Bookings"
            total={analytics?.totalBookings ?? 0}
            icon={<Ticket className="h-4 w-4 text-green-500" />}
          />
      </div>

        <div className="2xl:grid xl:grid-cols-8 xl:gap-x-6 xl:grid">
          <div className="mb-6 xl:col-span-3">
            <TotalUsers data={analytics?.totalUserDistribution}/>
          </div>

          <div className="mb-6 xl:col-span-5">
            <MostBookedEvents chartData={analytics?.topBookedEvents}/>
          </div>
        </div>

        
    </div>
  )
}

export default Dashboard
