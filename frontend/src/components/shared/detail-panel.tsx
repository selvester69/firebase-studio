import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DetailItem {
  label: string;
  value: React.ReactNode;
}

interface DetailPanelProps {
  title: string;
  icon?: React.ReactNode;
  details: DetailItem[];
  className?: string;
  maxHeight?: string;
}

export function DetailPanel({ title, icon, details, className, maxHeight = "none" }: DetailPanelProps) {
  const content = (
    <dl className="space-y-2">
      {details.map((item, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <dt className="font-medium text-muted-foreground md:col-span-1">{item.label}:</dt>
          <dd className="text-foreground md:col-span-2">{item.value}</dd>
        </div>
      ))}
    </dl>
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {maxHeight !== "none" ? (
          <ScrollArea style={{ maxHeight }} className="pr-4">
            {content}
          </ScrollArea>
        ) : (
          content
        )}
      </CardContent>
    </Card>
  );
}
