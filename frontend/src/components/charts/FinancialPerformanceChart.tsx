
"use client";

import type { FinancialDataPoint } from '@/lib/placeholder-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from '@/components/ui/chart';

interface FinancialPerformanceChartProps {
  data: FinancialDataPoint[];
}

const chartConfig = {
  cashToCashTime: { label: "Cash-to-Cash Time", color: "var(--chart-1)" },
  accountRecDay: { label: "Account Rec Day", color: "var(--chart-2)" },
  inventoryDays: { label: "Inventory Days", color: "var(--chart-3)" },
  accountsPayableDays: { label: "Accounts Payable Days", color: "var(--chart-4)" },
} satisfies ChartConfig;

export function FinancialPerformanceChart({ data }: FinancialPerformanceChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Global Financial Performance</CardTitle>
          <CardDescription>Days</CardDescription>
        </CardHeader>
        <CardContent>
          <p>No financial performance data available.</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Global Financial Performance</CardTitle>
        <CardDescription>Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart 
            accessibilityLayer 
            data={data} 
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis 
              dataKey="region" 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8} 
              fontSize={12} 
            />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <ChartTooltip 
              cursor={false} 
              content={<ChartTooltipContent indicator="dot" />} 
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="cashToCashTime" fill="var(--color-cashToCashTime)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="accountRecDay" fill="var(--color-accountRecDay)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="inventoryDays" fill="var(--color-inventoryDays)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="accountsPayableDays" fill="var(--color-accountsPayableDays)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
