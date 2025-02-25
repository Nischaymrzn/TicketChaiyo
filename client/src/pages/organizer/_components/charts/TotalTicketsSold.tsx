import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    ticketsSold: {
    label: "Ticket Sold",
  },
  MOVIE: {
    label: "Movie",
    color: "hsl(var(--chart-6))",
  },
  CONCERT: {
    label: "Concert",
    color: "hsl(var(--chart-9))",
  },
} satisfies ChartConfig

export function TotalTicketsSold({data}:{data :any}) {
  console.log(data)
  const chartData = data?.map((item : any)=>{
    return {...item, fill:`var(--color-${item?.event})`}
  })
  console.log(chartData)
  const totalTicketsCount = chartData?.reduce((acc : any, curr : any) => acc + curr.eventCount, 0)

  return (
    <Card className="flex flex-col bg-[#13131A] border-[#2E2E3A] text-white xl:pb-5">
      <CardHeader className="pb-0">
        <CardTitle>Total Tickets Sold</CardTitle>
        <CardDescription>On the Basis of Events Type</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[315px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="eventCount"
              nameKey="event"
              innerRadius={80}
              outerRadius={130}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-bold fill-white"
                        >
                          {totalTicketsCount?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tickets
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
      <div className="mt-6 flex items-center gap-y-3">
          <div className="w-full px-8">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-6 max-w-3 rounded-full bg-[hsl(var(--chart-2))]"></span>

              <p className="flex w-full justify-between text-sm font-medium truncate">
                <span>Movie</span>
              </p>
            </div>
          </div>

          <div className="w-full px-8">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-6 max-w-3 rounded-full bg-[hsl(var(--chart-5))]"></span>

              <p className="flex w-full justify-between text-sm font-medium">
                <span>Concert</span>
              </p>
            </div>
          </div> 
        </div>

      </CardFooter>
    </Card>
  )
}
