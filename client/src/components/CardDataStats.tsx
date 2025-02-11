import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CardDataStatsProps {
  title: string
  total: string
  trend?: "up" | "down"
  trendPercentage?: string
  icon: React.ReactNode
}

export const CardDataStats = ({ title, total, trend, trendPercentage, icon } : CardDataStatsProps) => {
  const isTrendUp = trend === "up"
  const trendColor = isTrendUp ? "text-green-400" : "text-red-400"
  const bgColor = isTrendUp ? "bg-green-400/10" : "bg-red-400/10"

  return (
    <Card className="bg-[#1C1C24] border-[#2E2E3A] text-gray-200 transition-all duration-300 ease-in-out hover:bg-[#24242C] hover:shadow-lg hover:shadow-black/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
        <div className={cn("rounded-full p-2", bgColor)}>{icon}</div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold text-white">{total}</div>

        {trend && trendPercentage && (
          <p className={cn("mt-1 text-xs", trendColor)}>
            {isTrendUp ? <ArrowUpIcon className="inline h-4 w-4" /> : <ArrowDownIcon className="inline h-4 w-4" />}

            <span className="ml-1">{trendPercentage}</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}

