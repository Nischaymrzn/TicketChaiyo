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
    userCount: {
    label: "Total User",
  },
  customer: {
    label: "customer",
    color: "hsl(var(--chart-7))",
  },
  organizer: {
    label: "organizer",
    color: "hsl(var(--chart-9))",
  },
} satisfies ChartConfig

export function TotalUsers({data} : {data:any}) {
  
  const chartData = data?.map((item : any)=>{
    return {...item, fill:`var(--color-${item?.event})`}
  })

  const totalUserCount = chartData?.reduce((acc : any, curr : any) => acc + curr.userCount, 0)

  return (
    <Card className="flex flex-col bg-[#13131A] border-[#2E2E3A] text-white xl:pb-5">
      <CardHeader className="pb-5">
        <CardTitle>Total Users Distribution</CardTitle>
        <CardDescription>On the Basis of User Type</CardDescription>
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
              dataKey="userCount"
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
                          {totalUserCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Users
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
              <span className="mr-2 block h-3 w-6 max-w-3 rounded-full bg-[hsl(var(--chart-7))]"></span>

              <p className="flex w-full justify-between text-sm font-medium truncate">
                <span>Customer</span>
              </p>
            </div>
          </div>

          <div className="w-full px-8">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-6 max-w-3 rounded-full bg-[hsl(var(--chart-9))]"></span>

              <p className="flex w-full justify-between text-sm font-medium">
                <span>Organizer</span>
              </p>
            </div>
          </div> 
        </div>

      </CardFooter>
    </Card>
  )
}
