"use client";

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface SparklineChartProps {
  data: { value: number }[];
  strokeColor?: string; // HSL or hex color string
  height?: number;
  width?: number;
}

export function SparklineChart({ data, strokeColor = "hsl(var(--primary))", height = 40, width = 100 }: SparklineChartProps) {
  if (!data || data.length === 0) {
    return <div style={{height, width}} className="flex items-center justify-center text-xs text-muted-foreground">No data</div>;
  }
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data}>
        <XAxis type="number" dataKey="index" hide />
        <YAxis type="number" dataKey="value" hide domain={['dataMin -1', 'dataMax + 1']} />
        <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
