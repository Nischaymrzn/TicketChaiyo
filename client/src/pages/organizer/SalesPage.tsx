import { CardDataStats } from "@/components/CardDataStats"
import { MonthlyEventBooking } from "./_components/charts/MonthlyEventBooking"
import { TotalTicketsSold } from "./_components/charts/TotalTicketsSold"
import { Calendar, DollarSign, Ticket, TicketCheck } from "lucide-react"
import { MonthlyRevenue } from "./_components/charts/MonthlyRevenue"
import { MostBookedEvents } from "./_components/charts/MostBookedEvents"

export const SalesPage = () => {
  return (
    <div className="text-gray-300 w-full flex flex-col">
      <div>
        <p className="text-2xl font-bold">Sales</p>

        <p className="text-sm md:text-base px-1">Monitor all your event sales here</p>
      </div>

      <div className="grid-cols-1 mb-8 grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-10 mt-6">
        <CardDataStats
            title="Total Tickets Sold"
            total="1,234"
            icon={<Ticket className="h-4 w-4 text-green-500" />}
          />
          <CardDataStats
            title="Total Bookings"
            total="5,678"
            icon={<TicketCheck className="h-4 w-4 text-blue-500" />}
          />
          <CardDataStats
            title="Total Revenue"
            total="Rs. 12,345"
            icon={<DollarSign className="h-4 w-4 text-yellow-500" />}
          />
          <CardDataStats
            title="Total Events"
            total="42"
            icon={<Calendar className="h-4 w-4 text-purple-500" />}
          />
        </div>

        <div className="2xl:grid xl:grid-cols-8 xl:gap-x-6 xl:grid">
          <div className="mb-6 xl:col-span-3">
            <TotalTicketsSold />
          </div>

          <div className="mb-6 xl:col-span-5">
            <MonthlyEventBooking />
          </div>

          <div className="mb-6 xl:col-span-4">
            <MonthlyRevenue />
          </div>

          <div className="mb-6 xl:col-span-4">
            <MostBookedEvents />
          </div>
          
        </div>
    </div>
  )
}
