
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  fetchDashboardOrders, 
  fetchInventory, 
  fetchInventorySummary, 
  fetchFinancialPerformance, 
  fetchVolumeTodayStats, 
  fetchMonthlyKPIs,
  fetchUsers // Added user fetch
} from '@/services/dashboardService';
import type { 
  Order, 
  InventoryItem, 
  InventoryCategorySummary,
  FinancialDataPoint,
  VolumeStat,
  MonthlyKPI,
  User // Added User type
} from '@/lib/placeholder-data';

import { FinancialPerformanceChart } from '@/components/charts/FinancialPerformanceChart';
import { InventoryDonutChart } from '@/components/charts/InventoryDonutChart';
import { SparklineChart } from '@/components/charts/SparklineChart';
import { AlertTriangle, TrendingDown, Minus, Package, AlertCircle, FileText, Diamond, Users } from 'lucide-react';
import { format } from 'date-fns';

// Helper to get icon for KPIs
const getKpiIcon = (metricName: string) => {
  if (metricName.toLowerCase().includes('inventory')) return AlertTriangle;
  if (metricName.toLowerCase().includes('shipping cost')) return TrendingDown;
  return Minus;
};

// Helper to get icon for Volume Stats
const getVolumeIcon = (label: string) => {
  if (label.toLowerCase().includes('orders to ship')) return Diamond; 
  if (label.toLowerCase().includes('overdue shipments')) return AlertCircle; 
  if (label.toLowerCase().includes('open pos')) return FileText;
  if (label.toLowerCase().includes('late vendor shipments')) return AlertCircle; 
  return Diamond;
}

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'MMM d, yyyy');
  } catch (e) {
    return dateString; // Fallback for invalid dates
  }
};


export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [inventorySummary, setInventorySummary] = useState<InventoryCategorySummary[]>([]);
  const [financialData, setFinancialData] = useState<FinancialDataPoint[]>([]);
  const [volumeStats, setVolumeStats] = useState<VolumeStat[]>([]);
  const [kpis, setKpis] = useState<MonthlyKPI[]>([]);
  const [users, setUsers] = useState<User[]>([]); // State for users
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [
          ordersData, 
          inventoryData, 
          inventorySummaryData, 
          financialPerformanceData, 
          volumeTodayData, 
          monthlyKPIsData,
          usersData // Fetch users
        ] = await Promise.all([
          fetchDashboardOrders(),
          fetchInventory(),
          fetchInventorySummary(),
          fetchFinancialPerformance(),
          fetchVolumeTodayStats(),
          fetchMonthlyKPIs(),
          fetchUsers() // Call fetchUsers
        ]);
        setOrders(ordersData);
        setInventory(inventoryData);
        setInventorySummary(inventorySummaryData);
        setFinancialData(financialPerformanceData);
        setVolumeStats(volumeTodayData);
        setKpis(monthlyKPIsData);
        setUsers(usersData); // Set users state
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading dashboard...</p></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">
        Shipping Status Dashboard
      </h1>
      <p className="text-muted-foreground">
        Overview of shipping operations, key performance indicators, and user activity.
      </p>

      {/* Row 1: Orders & Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Summary of recent backorders or critical orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-primary">Customer</TableHead>
                    <TableHead className="text-accent">Order Status</TableHead>
                    <TableHead className="text-accent">Order Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>{formatDate(order.orderDate)}</TableCell>
                    </TableRow>
                  ))}
                   {orders.length === 0 && <TableRow><TableCell colSpan={3} className="text-center">No orders to display.</TableCell></TableRow>}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
              <CardDescription>Current stock levels by product.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[180px]"> 
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-primary">Category</TableHead>
                      <TableHead className="text-accent">Product</TableHead>
                      <TableHead className="text-accent">SKU</TableHead>
                      <TableHead className="text-right text-accent">In Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.product}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell className="text-right">{item.inStock}</TableCell>
                      </TableRow>
                    ))}
                    {inventory.length === 0 && <TableRow><TableCell colSpan={4} className="text-center">No inventory items.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
          {inventorySummary.length > 0 && <InventoryDonutChart data={inventorySummary} />}
        </div>
      </div>

      {/* Row 2: Financial Performance & KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialPerformanceChart data={financialData} />
        <Card>
          <CardHeader>
            <CardTitle>KPIs - Monthly</CardTitle>
            <CardDescription>Key performance indicators compared to last month.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-primary w-[150px]">Metric</TableHead>
                    <TableHead>This Month</TableHead>
                    <TableHead>Past Month</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead className="w-[120px]">Past 30 Days</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kpis.map(kpi => {
                    const KpiIcon = getKpiIcon(kpi.metric);
                    return (
                    <TableRow key={kpi.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {KpiIcon && <KpiIcon className={`h-4 w-4 ${kpi.iconColor || 'text-muted-foreground'}`} />}
                          {kpi.metric}
                        </div>
                      </TableCell>
                      <TableCell>{kpi.thisMonthDisplay}</TableCell>
                      <TableCell>{kpi.pastMonthDisplay}</TableCell>
                      <TableCell className={kpi.changeValue > 0 ? 'text-green-600' : kpi.changeValue < 0 ? 'text-red-600' : ''}>
                        {kpi.changeDisplay}
                      </TableCell>
                      <TableCell>
                        <SparklineChart 
                          data={kpi.past30DaysData.map((val, idx) => ({ value: val, index: idx }))} 
                          strokeColor={kpi.changeValue >=0 ? "hsl(var(--chart-2))" : "hsl(var(--chart-4))" }
                        />
                      </TableCell>
                    </TableRow>
                  )})}
                  {kpis.length === 0 && <TableRow><TableCell colSpan={5} className="text-center">No KPIs to display.</TableCell></TableRow>}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      {/* Row 3: Volume Today & User Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Volume Today</CardTitle>
            <CardDescription>Snapshot of current operational volumes.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {volumeStats.map(stat => {
              const VolumeIcon = getVolumeIcon(stat.label);
              return (
              <div key={stat.id} className="p-4 bg-card border rounded-lg shadow-sm text-center">
                <dt className="text-sm font-medium text-muted-foreground truncate">{stat.label}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                  <div className="flex items-center justify-center gap-2">
                    {VolumeIcon && <VolumeIcon className={`h-6 w-6 ${stat.iconColor || stat.valueColor || 'text-primary'}`} />}
                    <span className={stat.valueColor}>{stat.value}</span>
                  </div>
                </dd>
              </div>
            )})}
            {volumeStats.length === 0 && <p className="col-span-full text-center">No volume stats for today.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5" /> User Overview</CardTitle>
            <CardDescription>Summary of registered users.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{formatDate(user.joinDate)}</TableCell>
                      <TableCell className="text-right">{user.totalOrders}</TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No users to display.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

    