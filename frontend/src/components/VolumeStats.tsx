import type { VolumeStat } from '../lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Assuming you have a Card component

interface VolumeStatsProps {
  stats: VolumeStat[];
}

export default function VolumeStats({ stats }: VolumeStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <Card key={stat.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.label}
            </CardTitle>
            {/* Add icon here if available */}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.valueColor}`}>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
