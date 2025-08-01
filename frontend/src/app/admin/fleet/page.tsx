"use client";

import { useState, useMemo, useEffect } from 'react';
import { MapPlaceholder } from "@/components/shared/map-placeholder";
import { DetailPanel } from "@/components/shared/detail-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Agent } from '@/lib/placeholder-data';
import { sampleAgents } from '@/lib/placeholder-data';
import { Truck, UserCircle, MapPin as MapPinIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LiveFleetPage() {
  const [agentsData, setAgentsData] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    // In a real app, this data would be fetched or come from a real-time source
    setAgentsData(sampleAgents);
    // Optionally select the first agent by default
    // if (sampleAgents.length > 0) {
    //   setSelectedAgent(sampleAgents[0]);
    // }
  }, []);

  const mapMarkers = useMemo(() => {
    return agentsData.map(agent => ({
      id: agent.id,
      lat: agent.currentLocation.lat,
      lng: agent.currentLocation.lng,
      label: agent.name,
      color: agent.status === 'Online' ? 'green' : agent.status === 'On Delivery' ? 'blue' : 'grey',
    }));
  }, [agentsData]);

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const agentDetails = selectedAgent ? [
    { label: "Agent ID", value: selectedAgent.id },
    { label: "Name", value: selectedAgent.name },
    { label: "Vehicle", value: `${selectedAgent.vehicle} (${selectedAgent.vehicleId})` },
    { label: "Status", value: selectedAgent.status },
    { label: "Current Location", value: selectedAgent.currentLocation.address || `${selectedAgent.currentLocation.lat}, ${selectedAgent.currentLocation.lng}` },
    { label: "Assigned Orders", value: selectedAgent.currentOrderIds.length > 0 ? selectedAgent.currentOrderIds.join(', ') : "None" },
  ] : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center font-headline text-2xl">
            <Truck className="mr-2 h-6 w-6" /> Live Fleet View
          </CardTitle>
          <CardDescription>Monitor all active delivery agents in real-time.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapPlaceholder markers={mapMarkers} className="h-full min-h-[400px]" />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <UserCircle className="mr-2 h-5 w-5" /> Active Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]"> {/* Adjust height as needed */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agentsData.map((agent) => (
                      <TableRow 
                        key={agent.id} 
                        onClick={() => handleSelectAgent(agent)}
                        className={`cursor-pointer hover:bg-muted/50 ${selectedAgent?.id === agent.id ? 'bg-muted' : ''}`}
                      >
                        <TableCell className="font-medium">{agent.name}</TableCell>
                        <TableCell>{agent.status}</TableCell>
                      </TableRow>
                    ))}
                    {agentsData.length === 0 && (
                       <TableRow>
                        <TableCell colSpan={2} className="text-center text-muted-foreground">
                          No active agents.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
          
          {selectedAgent && (
            <DetailPanel 
              title="Agent Details" 
              icon={<MapPinIcon className="h-5 w-5 text-primary" />} 
              details={agentDetails}
              maxHeight="calc(100vh - 30rem - 150px)" // Adjust based on other elements
            />
          )}
          {!selectedAgent && agentsData.length > 0 && (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>Select an agent from the list to view details.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
