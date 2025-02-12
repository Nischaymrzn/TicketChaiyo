"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const chartData = [
  { month: "January", movie: 186, concert: 80, all: 266 },
  { month: "February", movie: 305, concert: 200, all: 505 },
  { month: "March", movie: 237, concert: 120, all: 357 },
  { month: "April", movie: 73, concert: 190, all: 263 },
]

const chartConfig = {
  all: {
    label: "All",
    color: "hsl(var(--chart-8))",
  },
  movie: {
    label: "Movie",
    color: "hsl(var(--chart-8))",
  },
  concert: {
    label: "Concert",
    color: "hsl(var(--chart-8))",
  },
} satisfies ChartConfig

export function MonthlyEventBooking() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "movie" | "concert">("all")

  return (
    <Card className="flex flex-col bg-[#13131A] border-[#2E2E3A] text-white">
    <div className="flex justify-between">
      <CardHeader className="mb-4 md:mb-0">
        <CardTitle>Monthly Event Booking</CardTitle>
        <CardDescription>On the basis of last 4 months</CardDescription>
      </CardHeader>

      <div className="p-4">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as "all" | "movie" | "concert")}
          >
            <SelectTrigger className="w-[180px] bg-[#2E2E3A] border-[#2E2E3A] text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-[#2E2E3A] border-[#2E2E3A] text-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="concert">Concert</SelectItem>
            </SelectContent>
          </Select>
        </div>
    </div>
    
      <CardContent>
    
       
        <ScrollArea className="rounded-lg w-full whitespace-nowrap shrink-0">
          <ChartContainer config={chartConfig} className="h-[355px] w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 20, bottom: 20, left: 60 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} tickMargin={10} />
              <YAxis dataKey="month" type="category" axisLine={false} tickLine={false} tickMargin={10} width={60} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey={selectedCategory} fill="var(--color-all)" radius={[0, 4, 4, 0]} barSize={50} />
            </BarChart>
          </ChartContainer>
          <ScrollBar orientation="vertical" className="flex w-2 bg-[#2E2E3A] rounded-full ml-2" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

