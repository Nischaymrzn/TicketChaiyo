import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const chartConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-7))",
  },
};

export function MonthlyRevenue({chartData} : {chartData:any}) {
  return (
    <Card className="flex flex-col bg-[#13131A] border-[#2E2E3A] text-white">
      <CardHeader>
        <CardTitle>Monthly Event Revenue</CardTitle>

        <CardDescription>Event Revenue Over the Last 6 Months (In Rupee)</CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="rounded-lg w-full whitespace-nowrap shrink-0">
          <ChartContainer config={chartConfig} className="h-[375px] w-full">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 5,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tickFormatter={(value) => value.slice(0, 3)}
              />

              <YAxis tickLine={false} axisLine={false} tickMargin={12} />

              <ChartTooltip content={<ChartTooltipContent />} />

              <Line
                dataKey="revenue"
                type="linear"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: "var(--color-revenue)",
                  strokeWidth: 2,
                  stroke: "var(--background)",
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  stroke: "var(--background)",
                }}
              />
            </LineChart>
          </ChartContainer>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
