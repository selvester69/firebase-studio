import type { InventoryCategorySummary } from '../lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InventorySummaryChartProps {
  summary: InventoryCategorySummary[];
}

export default function InventorySummaryChart({ summary }: InventorySummaryChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Summary by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-4 space-y-2 hidden"> {/* Hide the list as chart is now shown */}
          {summary.map(item => (
            <li key={item.name} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
