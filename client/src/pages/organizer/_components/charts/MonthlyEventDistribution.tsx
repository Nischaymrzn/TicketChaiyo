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

const chartData = [
    { month: "January", eventCount: 20 },
    { month: "February", eventCount: 35 },
    { month: "March", eventCount: 30 },
    { month: "April", eventCount: 45 },
    { month: "May", eventCount: 30 },
    { month: "June", eventCount: 45 },
  ]
  

const chartConfig: ChartConfig = {
  eventCount: {
    label: "Event Count",
    color: "hsl(var(--chart-1))",
  },
};

export function MonthlyEventDistribution() {
  return (
    <Card className="flex flex-col bg-[#13131A] border-[#2E2E3A] text-white">
      <CardHeader>
        <CardTitle>Monthly Event Distribution</CardTitle>

        <CardDescription>Event Count Over the Last 6 Months</CardDescription>
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
                dataKey="eventCount"
                type="linear"
                stroke="var(--color-eventCount)"
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: "var(--color-eventCount)",
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
