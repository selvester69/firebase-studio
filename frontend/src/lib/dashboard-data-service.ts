import { Order, InventoryItem, InventoryCategorySummary, FinancialDataPoint, VolumeStat, MonthlyKPI, User } from './placeholder-data'; // Keep imports for types

const API_BASE_URL = '/api/mock';

export const fetchDashboardData = async () => {
  try {
    const [volumeStatsRes, backorderedOrdersRes, inventorySummaryRes, monthlyKPIsRes, financialPerformanceRes, usersRes, allOrdersRes] = await Promise.all([
      fetch(`${API_BASE_URL}/dashboard/volume-stats`),
      fetch(`${API_BASE_URL}/orders/backordered`),
      fetch(`${API_BASE_URL}/inventory/summary`),
      fetch(`${API_BASE_URL}/dashboard/monthly-kpis`),
      fetch(`${API_BASE_URL}/financial/performance`),
      fetch(`${API_BASE_URL}/users`),
      fetch(`${API_BASE_URL}/orders/all`),
    ]);

    const volumeToday: VolumeStat[] = await volumeStatsRes.json();
    const orders: Order[] = await backorderedOrdersRes.json();
    const inventorySummary: InventoryCategorySummary[] = await inventorySummaryRes.json();
    const monthlyKPIs: MonthlyKPI[] = await monthlyKPIsRes.json();
    const financialPerformance: FinancialDataPoint[] = await financialPerformanceRes.json();
    const users: User[] = await usersRes.json();
    const allSiteOrders: Order[] = await allOrdersRes.json();

    return {
      orders,
      allSiteOrders,
      inventory: [], // Assuming inventory items are not needed on dashboard summary
      inventorySummary,
      financialPerformance,
      volumeToday,
      monthlyKPIs,
      users,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Depending on requirements, you might want to throw the error or return a default state
    throw error;
  }
};
