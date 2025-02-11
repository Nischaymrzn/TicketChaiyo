import {CardDataStats} from "@/components/CardDataStats"
import { Calendar, DollarSign, Ticket, Users } from "lucide-react"

const Dashboard = () => {
  return (
    <div className="text-gray-300 w-full flex flex-col">
      <div>
        <p className="text-2xl font-bold">Dashboard</p>
        <p className="text-sm md:text-base px-1">Monitor all your activities here</p>
      </div>

      <div className="grid-cols-1 mb-8 grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-10 mt-6">
      <CardDataStats
          title="Total Tickets Sold"
          total="1,234"
          trend="up"
          trendPercentage="12%"
          icon={<Ticket className="h-4 w-4 text-green-500" />}
        />
        <CardDataStats
          title="Total Customers"
          total="5,678"
          trend="up"
          trendPercentage="8%"
          icon={<Users className="h-4 w-4 text-blue-500" />}
        />
        <CardDataStats
          title="Revenue"
          total="$12,345"
          trend="up"
          trendPercentage="15%"
          icon={<DollarSign className="h-4 w-4 text-yellow-500" />}
        />
        <CardDataStats
          title="Total Events"
          total="42"
          trend="down"
          trendPercentage="3%"
          icon={<Calendar className="h-4 w-4 text-purple-500" />}
        />
        </div>
    </div>
  )
}

export default Dashboard
