import { CardDataStats } from "@/components/CardDataStats"
import { MonthlyEventBooking } from "./_components/charts/MonthlyEventBooking"
import { TotalTicketsSold } from "./_components/charts/TotalTicketsSold"
import { Calendar, DollarSign, Ticket, TicketCheck } from "lucide-react"
import { MonthlyRevenue } from "./_components/charts/MonthlyRevenue"
import { MostBookedEvents } from "./_components/charts/MostBookedEvents"
import { useGetMe } from "@/hooks/useAuth"
import { useGetOrganizerSalesAnalytics } from "@/hooks/useAnalytics"

export const SalesPage = () => {
    const {data : user } = useGetMe()
    const userId = user?.userData
    const {data:analytics} = useGetOrganizerSalesAnalytics(userId)

  return (
    <div className="text-gray-300 w-full flex flex-col">
      <div>
        <p className="text-2xl font-bold">Sales</p>

        <p className="text-sm md:text-base px-1">Monitor all your event sales here</p>
      </div>

      <div className="grid-cols-1 mb-8 grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-10 mt-6">
        <CardDataStats
            title="Total Tickets Sold"
            total={analytics?.dataCards?.totalTicketsSold}
            icon={<Ticket className="h-4 w-4 text-green-500" />}
          />
          <CardDataStats
            title="Total Bookings"
            total={analytics?.dataCards?.totalBookings}
            icon={<TicketCheck className="h-4 w-4 text-blue-500" />}
          />
          <CardDataStats
            title="Total Revenue"
            total={analytics?.dataCards?.totalRevenue}
            icon={<DollarSign className="h-4 w-4 text-yellow-500" />}
          />
          <CardDataStats
            title="Total Events"
            total={analytics?.dataCards?.totalEvents}
            icon={<Calendar className="h-4 w-4 text-purple-500" />}
          />
        </div>

        <div className="2xl:grid xl:grid-cols-8 xl:gap-x-6 xl:grid">
          <div className="mb-6 xl:col-span-3">
            <TotalTicketsSold />
          </div>

          <div className="mb-6 xl:col-span-5">
            <MonthlyEventBooking chartData={analytics?.analytics?.monthlyEventBookings}/>
          </div>

          <div className="mb-6 xl:col-span-4">
            <MonthlyRevenue chartData={analytics?.analytics?.monthlyEventRevenue}/>
          </div>

          <div className="mb-6 xl:col-span-4">
            <MostBookedEvents chartData={analytics?.analytics?.topBookedEvents}/>
          </div>
          
        </div>
    </div>
  )
}
