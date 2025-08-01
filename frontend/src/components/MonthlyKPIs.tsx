import type { MonthlyKPI } from '../lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { SparklineChart, SparklineCurve } from 'react-sparklines'; // Assuming react-sparklines for sparklines

interface MonthlyKPIsProps {
  kpis: MonthlyKPI[];
}

export default function MonthlyKPIs({ kpis }: MonthlyKPIsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {kpis.map(kpi => (
        <Card key={kpi.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {kpi.metric}
            </CardTitle>
            {kpi.changeValue > 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.thisMonthDisplay}</div>
            <p className="text-xs text-muted-foreground">
              {kpi.changeDisplay} from last month
            </p>
            {/* Sparkline Chart */}
            <div className="h-10 mt-2">
               {/* Check if past30DaysData exists and has data before rendering Sparkline */}
              {kpi.past30DaysData && kpi.past30DaysData.length > 0 && (
                 // react-sparklines does not require ResponsiveContainer
                <SparklineChart data={kpi.past30DaysData} height={40}>
                  <SparklineCurve color="blue" />
                </SparklineChart>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
