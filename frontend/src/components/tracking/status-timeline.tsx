import type { OrderStatusEvent } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, CircleDot, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface StatusTimelineProps {
  statusEvents: OrderStatusEvent[];
  eta: Date | string;
  currentStatusText: string;
}

function formatStatusTime(time: Date | string): string {
  if (time instanceof Date) {
    return format(time, 'MMM d, yyyy HH:mm');
  }
  return time.toString();
}

export function StatusTimeline({ statusEvents, eta, currentStatusText }: StatusTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-6 w-6 text-primary" />
          Status & ETA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-lg font-semibold text-primary">Estimated Delivery: {formatStatusTime(eta)}</p>
          <p className="text-sm text-muted-foreground">Current Status: {currentStatusText}</p>
        </div>
        <div className="relative pl-6">
          {statusEvents.map((event, index) => (
            <div key={index} className="relative flex items-start pb-8">
              {index !== statusEvents.length - 1 && (
                <div className="absolute left-[calc(0.75rem-1px)] top-[calc(0.75rem+2px)] h-full w-0.5 bg-border" />
              )}
              <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background">
                {event.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : event.current ? (
                  <CircleDot className="h-5 w-5 text-primary animate-pulse" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="ml-4">
                <p className={cn("font-medium", event.current && "text-primary")}>{event.name}</p>
                <p className="text-sm text-muted-foreground">{formatStatusTime(event.time)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
