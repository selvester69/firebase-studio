"use client";

import { useState, useMemo, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { DetailPanel } from "@/components/shared/detail-panel";
import type { Order, Agent } from '@/lib/placeholder-data';
import { sampleOrders, findAgentById, getAgentByOrderId } from '@/lib/placeholder-data';
import { Eye, Search, Package as PackageIcon, UserCircle, Truck } from 'lucide-react';
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Effect to set initial data and avoid hydration issues with dates
  useEffect(() => {
    const formattedOrders = sampleOrders.map(order => ({
      ...order,
      eta: order.eta instanceof Date ? format(order.eta, 'PPpp') : order.eta,
      statusHistory: order.statusHistory.map(sh => ({
        ...sh,
        time: sh.time instanceof Date ? format(sh.time, 'PPpp') : sh.time,
      })),
    }));
    setOrdersData(formattedOrders);
  }, []);

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return ordersData;
    return ordersData.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, ordersData]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    if (order.deliveryAgentId) {
      const agent = findAgentById(order.deliveryAgentId);
      setSelectedAgent(agent || null);
    } else {
      setSelectedAgent(null);
    }
    setIsDialogOpen(true);
  };

  const orderDetails = selectedOrder ? [
    { label: "Order ID", value: selectedOrder.id },
    { label: "Customer", value: selectedOrder.customerName },
    { label: "Status", value: selectedOrder.status },
    { label: "ETA", value: selectedOrder.eta.toString() },
    { label: "Items", value: selectedOrder.items.join(', ') },
    { label: "Destination", value: selectedOrder.destinationAddress },
    { label: "Current Location", value: selectedOrder.currentLocation.address || `${selectedOrder.currentLocation.lat}, ${selectedOrder.currentLocation.lng}` },
  ] : [];

  const agentDetails = selectedAgent ? [
    { label: "Agent Name", value: selectedAgent.name },
    { label: "Vehicle", value: `${selectedAgent.vehicle} (${selectedAgent.vehicleId})` },
    { label: "Agent Status", value: selectedAgent.status },
    { label: "Agent Location", value: selectedAgent.currentLocation.address || `${selectedAgent.currentLocation.lat}, ${selectedAgent.currentLocation.lng}` },
  ] : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center font-headline text-2xl">
            <PackageIcon className="mr-2 h-6 w-6" /> Admin Order List
          </CardTitle>
          <CardDescription>View and manage all active and past orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search orders by ID, customer, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <ScrollArea className="h-[calc(100vh-18rem)] md:h-[calc(100vh-20rem)]"> {/* Adjust height as needed */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.eta.toString()}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="font-headline">Order Details: {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Detailed information for the selected order.</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <ScrollArea className="max-h-[calc(90vh-10rem)] pr-6">
              <div className="space-y-6 py-4">
                <DetailPanel 
                  title="Order Information" 
                  icon={<PackageIcon className="h-5 w-5 text-primary" />} 
                  details={orderDetails}
                />
                {selectedAgent && (
                  <DetailPanel 
                    title="Delivery Agent" 
                    icon={<UserCircle className="h-5 w-5 text-primary" />} 
                    details={agentDetails}
                  />
                )}
                {selectedOrder.deliveryAgentId && !selectedAgent && (
                   <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-base">
                        <Truck className="h-5 w-5 mr-2 text-primary" /> Agent Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Delivery agent (ID: {selectedOrder.deliveryAgentId}) details not found or not assigned.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
