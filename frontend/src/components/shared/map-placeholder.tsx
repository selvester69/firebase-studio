import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label?: string;
  color?: string;
}

interface MapPlaceholderProps {
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  singlePinText?: string;
}

export function MapPlaceholder({
  markers,
  className,
  singlePinText = "Location",
}: MapPlaceholderProps) {
  const hasMarkers = markers && markers.length > 0;
  const hint = hasMarkers ? (markers.length > 1 ? "city aerial" : "street map") : "world map";
  
  return (
    <Card className={className}>
      <CardContent className="p-0 relative aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src={`https://placehold.co/800x450.png`}
          alt="Map placeholder"
          layout="fill"
          objectFit="cover"
          data-ai-hint={hint}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          {hasMarkers ? (
            markers.length === 1 ? (
              <div className="flex flex-col items-center text-white bg-black/50 p-3 rounded-md">
                <MapPin className="h-12 w-12 mb-2 text-primary-foreground" />
                <span className="font-semibold">{markers[0].label || singlePinText}</span>
              </div>
            ) : (
              <div className="text-center text-white bg-black/50 p-3 rounded-md">
                <MapPin className="h-12 w-12 mx-auto mb-2 text-primary-foreground" />
                <p className="font-semibold">{markers.length} locations shown</p>
              </div>
            )
          ) : (
            <div className="text-center text-white bg-black/50 p-3 rounded-md">
              <MapPin className="h-12 w-12 mx-auto mb-2 text-primary-foreground" />
              <p className="font-semibold">Map View</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
