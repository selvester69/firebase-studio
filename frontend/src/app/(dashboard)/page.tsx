'use client';

import { useState, useEffect } from 'react';
import { fetchDashboardData } from '../../lib/dashboard-data-service';
import type { Order, InventoryItem, InventoryCategorySummary, FinancialDataPoint, VolumeStat, MonthlyKPI, User } from '../../lib/placeholder-data';
import VolumeStats from '../../components/VolumeStats';
import RecentOrdersTable from '../../components/RecentOrdersTable';
import InventorySummaryChart from '../../components/InventorySummaryChart';
import MonthlyKPIs from '../../components/MonthlyKPIs';
import FinancialPerformanceTable from '../../components/FinancialPerformanceTable';
import UserList from '../../components/UserList';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<{ orders: Order[]; allSiteOrders: Order[]; inventory: InventoryItem[]; inventorySummary: InventoryCategorySummary[]; financialPerformance: FinancialDataPoint[]; volumeToday: VolumeStat[]; monthlyKPIs: MonthlyKPI[]; users: User[]; } | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchDashboardData();
      setDashboardData(data);
    };
    getData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Logistics Dashboard</h1>
      
      <VolumeStats stats={dashboardData.volumeToday} />

      <div className="grid gap-4 md:grid-cols-2 mt-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Orders (Backordered)</h2>
          <RecentOrdersTable orders={dashboardData.orders} />
        </div>
        <div>
          <InventorySummaryChart summary={dashboardData.inventorySummary} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Monthly Key Performance Indicators</h2>
        <MonthlyKPIs kpis={dashboardData.monthlyKPIs} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Financial Performance by Region</h2>
        <FinancialPerformanceTable data={dashboardData.financialPerformance} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <UserList users={dashboardData.users} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Site Orders</h2>
        <RecentOrdersTable orders={dashboardData.allSiteOrders} />
      </div>

    </div>
  );
}