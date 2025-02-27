import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const chartConfig = {
  totalBookings: {
    label: "Total Booking",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

export function MostBookedEvents({chartData} : {chartData : any}) {
  return (
    <Card className="flex flex-col bg-[#13131A] border-[#2E2E3A] text-white">
      <CardHeader className="mb-4 md:mb-0">
        <CardTitle>Top 4 Most Booked Events</CardTitle>
        <CardDescription>Based on total bookings</CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="rounded-lg w-full whitespace-nowrap shrink-0">
          <ChartContainer config={chartConfig} className="h-[375px] w-full mb-5S">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="horizontal"
              margin={{ top: 20, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid vertical={false} />
              <YAxis type="number" axisLine={false} tickLine={false} tickMargin={10} />
              <XAxis dataKey="event" type="category" axisLine={false} tickLine={false} tickMargin={10} width={100} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="totalBookings" fill="var(--color-totalBookings)" radius={[0, 4, 4, 0]} barSize={50} />
            </BarChart>
          </ChartContainer>
          <ScrollBar orientation="horizontal" className="flex bg-[#2E2E3A] rounded-full ml-2" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

