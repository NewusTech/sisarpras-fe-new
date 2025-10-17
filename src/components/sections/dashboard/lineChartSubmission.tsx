"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple line chart";

const chartData = [
  { month: "January", facility: 186, infrastructure: 80 },
  { month: "February", facility: 305, infrastructure: 200 },
  { month: "March", facility: 237, infrastructure: 120 },
  { month: "April", facility: 73, infrastructure: 190 },
  { month: "May", facility: 209, infrastructure: 130 },
  { month: "June", facility: 214, infrastructure: 140 },
];

const chartConfig = {
  facility: {
    label: "Sarana",
    color: "#4FB053",
  },
  infrastructure: {
    label: "Prasarana",
    color: "#F54444",
  },
} satisfies ChartConfig;

export function LineChartSubmission() {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle className="text-lg mb-3">Pengajuan</CardTitle>
        <CardDescription className="text-black">
          January - Juni 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-96 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis tickMargin={8} tickLine={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="facility"
              type="monotone"
              stroke="var(--color-facility)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="infrastructure"
              type="monotone"
              stroke="var(--color-infrastructure)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend
              content={<ChartLegendContent />}
              className="-translate-y-2 gap-10 text-nowrap w-fit mt-6"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
