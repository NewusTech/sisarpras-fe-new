"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
import { FilterSelect } from "@/components/filters";
import { useConditionOptions } from "@/hooks/useSelect";

export const description = "A pie chart with a legend";

const chartData = [
  { condition: "GOOD", value: 200, fill: "#297BBF" },
  { condition: "MAJOR_DAMAGE", value: 275, fill: "#D32F2F" },
  { condition: "MINOR_DAMAGE", value: 187, fill: "#FFA000" },
  { condition: "MODERATE_DAMAGE", value: 173, fill: "#E7B173" },
];

const chartConfig = {
  MAJOR_DAMAGE: {
    label: "Rusak Berat",
    color: "var(--chart-1)",
  },
  GOOD: {
    label: "Baik",
    color: "var(--chart-2)",
  },
  MINOR_DAMAGE: {
    label: "Rusak Sedang",
    color: "var(--chart-3)",
  },
  MODERATE_DAMAGE: {
    label: "Rusak Ringan",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function PieChartFacility() {
  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-start pb-0 flex justify-between flex-row gap-5 space-y-0">
        <div>
          <CardTitle className="text-lg leading-3 mb-3">Total Sarana</CardTitle>
          <CardDescription className="text-nowrap text-black">
            Januari - Juni 2024
          </CardDescription>
        </div>
        <FilterSelect
          options={useConditionOptions}
          label="Kategori"
          name="category"
        />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-[30rem] max-h-[300px] "
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie data={chartData} dataKey="value" stroke="0" />
            <ChartLegend
              content={<ChartLegendContent nameKey="condition" />}
              className="-translate-y-2  gap-2 *:basis-1/4 *:justify-center text-nowrap"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
