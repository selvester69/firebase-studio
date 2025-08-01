"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPlaceholder } from "@/components/shared/map-placeholder";
import { StatusTimeline } from "@/components/tracking/status-timeline";
import { DetailPanel } from "@/components/shared/detail-panel";
import type { Order } from '@/lib/placeholder-data';
import { findOrderById, getAgentByOrderId, Agent } from '@/lib/placeholder-data';
import { Package, UserCircle, MapPin as MapPinIcon, Search, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/navbar";
import { format } from 'date-fns';

export default function OrderLookupPage() {
  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [deliveryAgent, setDeliveryAgent] = useState<Agent | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!orderId.trim()) {
      toast({ title: "Error", description: "Please enter an Order ID.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setSearchedOrder(null);
    setDeliveryAgent(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundOrder = findOrderById(orderId);
    if (foundOrder) {
      setSearchedOrder(foundOrder);
      const agent = getAgentByOrderId(foundOrder.id);
      setDeliveryAgent(agent || null);
      toast({ title: "Order Found", description: `Details for order ${foundOrder.id} loaded.` });
    } else {
      toast({ title: "Order Not Found", description: `No order found with ID ${orderId}.`, variant: "destructive" });
    }
    setIsLoading(false);
  };

  const orderDetails = searchedOrder ? [
    { label: "Order ID", value: searchedOrder.id },
    { label: "Customer", value: searchedOrder.customerName },
    { label: "Status", value: searchedOrder.status },
    { label: "Items", value: searchedOrder.items.join(', ') },
    { label: "Destination", value: searchedOrder.destinationAddress },
  ] : [];

  const agentDetails = deliveryAgent ? [
    { label: "Agent Name", value: deliveryAgent.name },
    { label: "Vehicle", value: `${deliveryAgent.vehicle} (${deliveryAgent.vehicleId})` },
    { label: "Agent Status", value: deliveryAgent.status },
  ] : [];

  // Effect to avoid hydration mismatch for date formatting
  const [formattedEta, setFormattedEta] = useState<string | null>(null);
  const [formattedStatusHistory, setFormattedStatusHistory] = useState<any[] | null>(null);

  useEffect(() => {
    if (searchedOrder?.eta) {
      setFormattedEta(searchedOrder.eta instanceof Date ? format(searchedOrder.eta, 'PPpp') : searchedOrder.eta.toString());
    } else {
      setFormattedEta(null);
    }
    if (searchedOrder?.statusHistory) {
      setFormattedStatusHistory(
        searchedOrder.statusHistory.map(event => ({
          ...event,
          time: event.time instanceof Date ? format(event.time, 'PPpp') : event.time.toString(),
        }))
      );
    } else {
      setFormattedStatusHistory(null);
    }
  }, [searchedOrder]);


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-2xl">
              <Search className="mr-2 h-6 w-6" /> Track Your Order
            </CardTitle>
            <CardDescription>Enter your order ID to see its current status and location.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter Order ID (e.g., ORD12345)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-grow"
                aria-label="Order ID"
              />
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Track'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="text-center p-8">
            <p className="text-lg animate-pulse">Loading order details...</p>
          </div>
        )}

        {searchedOrder && formattedEta && formattedStatusHistory && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <MapPlaceholder
                markers={[{ 
                  id: searchedOrder.id, 
                  lat: searchedOrder.currentLocation.lat, 
                  lng: searchedOrder.currentLocation.lng,
                  label: `Order ${searchedOrder.id}`
                }]}
                singlePinText={`Order ${searchedOrder.id} Location`}
                className="shadow-lg"
              />
              <StatusTimeline 
                statusEvents={formattedStatusHistory} 
                eta={formattedEta}
                currentStatusText={searchedOrder.status}
              />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <DetailPanel 
                title="Order Information" 
                icon={<Package className="h-5 w-5 text-primary" />} 
                details={orderDetails}
                className="shadow-lg"
              />
              {deliveryAgent && (
                 <DetailPanel 
                  title="Delivery Agent" 
                  icon={<UserCircle className="h-5 w-5 text-primary" />} 
                  details={agentDetails}
                  className="shadow-lg"
                />
              )}
              {!deliveryAgent && searchedOrder.deliveryAgentId && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-base">
                      <Info className="h-5 w-5 mr-2 text-primary" /> Agent Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Delivery agent details are not available at this moment.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
      <footer className="py-6 md:px-8 md:py-0 bg-background border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} TrackMaster Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
