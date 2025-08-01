
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchUserOrders } from '@/services/dashboardService';
import type { Order, OrderStatus } from '@/lib/placeholder-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Package, ShoppingCart, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Navbar } from "@/components/layout/navbar"; // Assuming this is a general navbar

const MOCK_USER_ID = "USER123"; // Simulate a logged-in user

const getStatusVariant = (status: OrderStatus) => {
  switch (status) {
    case 'Delivered': return 'default'; // Greenish in default theme
    case 'Shipped':
    case 'In Transit':
    case 'Out for Delivery': return 'secondary'; // Bluish
    case 'Processing':
    case 'Pending Payment': return 'outline'; // Yellowish/Orange - outline often default
    case 'Cancelled':
    case 'Returned': return 'destructive'; // Reddish
    default: return 'default';
  }
};

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case 'Pending Payment': return <Clock className="mr-2 h-4 w-4" />;
    case 'Processing': return <ShoppingCart className="mr-2 h-4 w-4" />;
    case 'Shipped':
    case 'In Transit':
    case 'Out for Delivery': return <Package className="mr-2 h-4 w-4" />;
    case 'Delivered': return <CheckCircle className="mr-2 h-4 w-4" />;
    case 'Cancelled':
    case 'Returned': return <XCircle className="mr-2 h-4 w-4" />;
    default: return <AlertCircle className="mr-2 h-4 w-4" />;
  }
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<OrderStatus | "All">("All");

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true);
      try {
        const userOrders = await fetchUserOrders(MOCK_USER_ID);
        setOrders(userOrders);
      } catch (error) {
        console.error("Failed to load user orders", error);
        // Handle error state in UI if necessary
      } finally {
        setIsLoading(false);
      }
    }
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    if (activeTab === "All") return orders;
    return orders.filter(order => order.status === activeTab);
  }, [orders, activeTab]);

  const orderStatuses: (OrderStatus | "All")[] = [
    "All", 
    "Pending Payment", 
    "Processing", 
    "Shipped", 
    "In Transit", 
    "Out for Delivery", 
    "Delivered", 
    "Cancelled", 
    "Returned"
  ];

  const formatDate = (dateInput: Date | string | undefined) => {
    if (!dateInput) return 'N/A';
    try {
      const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      return format(date, 'MMM d, yyyy');
    } catch (e) {
      return String(dateInput); // Fallback if date is not parsable by date-fns
    }
  };
  
  const formatDateTime = (dateInput: Date | string | undefined) => {
    if (!dateInput) return 'N/A';
     try {
      const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      return format(date, 'MMM d, yyyy, h:mm a');
    } catch (e) {
      return String(dateInput); 
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center">
              <ShoppingCart className="mr-3 h-7 w-7" /> My Orders
            </CardTitle>
            <CardDescription>View and track your recent and past orders.</CardDescription>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OrderStatus | "All")}>
          <ScrollArea className="whitespace-nowrap">
            <TabsList className="mb-6">
              {orderStatuses.map(status => (
                <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          {isLoading && (
            <div className="text-center p-8 text-lg animate-pulse">Loading your orders...</div>
          )}

          {!isLoading && filteredOrders.length === 0 && (
            <Card>
              <CardContent className="p-10 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl font-semibold">No orders found</p>
                <p className="text-muted-foreground">You don't have any orders with this status yet.</p>
              </CardContent>
            </Card>
          )}

          {!isLoading && filteredOrders.length > 0 && (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {filteredOrders.map(order => (
                <Card key={order.id} className="flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-1">Order ID: {order.id}</CardTitle>
                        <CardDescription>Placed on: {formatDate(order.orderDate)}</CardDescription>
                      </div>
                       <Badge variant={getStatusVariant(order.status)} className="whitespace-nowrap">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Items:</h4>
                      <ul className="list-disc list-inside text-sm">
                        {order.items.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                    </div>
                    {order.totalAmount && (
                       <p className="text-sm">
                        <span className="font-medium text-muted-foreground">Total:</span> ${order.totalAmount.toFixed(2)}
                       </p>
                    )}
                    <p className="text-sm">
                      <span className="font-medium text-muted-foreground">ETA:</span> {formatDateTime(order.eta)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-muted-foreground">Destination:</span> {order.destinationAddress}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => alert(`Viewing details for ${order.id}`)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </Tabs>
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

    