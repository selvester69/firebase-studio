
"use client";

import type { InventoryCategorySummary } from '@/lib/placeholder-data';
import { PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardHeader, CardTitle
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from '@/components/ui/chart';

interface InventoryDonutChartProps {
  data: InventoryCategorySummary[];
}

const baseChartConfig = {
  electronics: { label: "Electronics", color: "var(--chart-1)" },
  appliances: { label: "Appliances", color: "var(--chart-2)" },
  automotive: { label: "Automotive", color: "var(--chart-3)" },
  computers: { label: "Computers", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" }, 
} satisfies ChartConfig;


export function InventoryDonutChart({ data }: InventoryDonutChartProps) {
   if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Inventory Distribution</CardTitle>
        </CardHeader>
        <CardContent className="pt-2 pb-4 px-2">
          <p>No inventory summary data available.</p>
        </CardContent>
      </Card>
    );
  }

  const chartConfig = data.reduce((acc, item) => {
    const key = item.name.toLowerCase().replace(/\s+/g, '');
    if (baseChartConfig[key as keyof typeof baseChartConfig]) {
      acc[key] = baseChartConfig[key as keyof typeof baseChartConfig];
    } else {
      acc[key] = { label: item.name, color: baseChartConfig.other.color };
    }
    return acc;
  }, {} as ChartConfig);


  return (
    <Card className="flex flex-col"> {/* Allow content or grid to define height */}
      <CardHeader>
        <CardTitle className="text-lg">Inventory Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pt-2 pb-4 px-2 flex-1 flex items-center justify-center"> {/* Added padding & flex centering */}
        <ChartContainer
          config={chartConfig}
          className="w-full aspect-square max-h-[200px]" /* Reduced max-h for header/padding */
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={40} // Adjusted radius
              outerRadius={70} // Adjusted radius
              strokeWidth={2}
            >
              {data.map((entry) => {
                const entryKey = entry.name.toLowerCase().replace(/\s+/g, '');
                // Ensure the color variable from chartConfig is used correctly
                const colorNameInConfig = chartConfig[entryKey] ? entryKey : 'other';
                // The ChartStyle component will create --color-electronics, --color-appliances, etc.
                // These are then referenced here.
                const colorVar = `var(--color-${colorNameInConfig})`;
                return (
                  <Cell
                    key={entry.name}
                    fill={colorVar}
                    className="stroke-background"
                  />
                );
              })}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" className="text-xs" layout="vertical" verticalAlign="middle" align="right" />}
              wrapperStyle={{ fontSize: '12px', paddingLeft: '10px' }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

