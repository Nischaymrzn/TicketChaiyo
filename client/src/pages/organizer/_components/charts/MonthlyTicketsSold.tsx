import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { format } from "date-fns"

const chartConfig = {
  movie: {
    label: "movie",
    color: "hsl(var(--chart-1))",
  },
  concert: {
    label: "concert",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function MonthlyTicketsSold({chartData} : {chartData:any}) {
  return (
    <Card className="flex flex-col bg-[#13131A] border-[#2E2E3A] text-white">
      <CardHeader className="mb-4 md:mb-0">
        <CardTitle>Monthly Tickets Sold</CardTitle>
        <CardDescription>On the basis of last 4 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="rounded-lg w-full whitespace-nowrap shrink-0">
          <ChartContainer config={chartConfig} className="h-[355px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value + '-01'); 
                  return format(date, "MMMM").slice(0,3);
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                label={{
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "white" },
                }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="ticketsSold" fill="var(--color-movie)" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar dataKey="concert" fill="var(--color-concert)" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ChartContainer>
          <ScrollBar orientation="horizontal" className="flex h-2 bg-[#2E2E3A] rounded-full mt-2"/> 
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

