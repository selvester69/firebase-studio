
import type { 
  Order, 
  InventoryItem, 
  InventoryCategorySummary,
  FinancialDataPoint,
  VolumeStat,
  MonthlyKPI,
  User,
  Product
} from '@/lib/placeholder-data';

const API_BASE_URL = '/api/mock'; // Using relative URL for API routes

async function fetchData<T>(type: string, params?: Record<string, string>): Promise<T> {
  try {
    const url = new URL(API_BASE_URL, window.location.origin);
    url.searchParams.append('type', type);
    if (params) {
      for (const key in params) {
        url.searchParams.append(key, params[key]);
      }
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch ${type}: ${response.statusText}`);
    }
    return await response.json() as T;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    // For product fetching, an empty array is a valid empty state.
    // For other types, consider if a different default/error handling is needed.
    return [] as unknown as T; 
  }
}

export const fetchDashboardOrders = (): Promise<Order[]> => fetchData<Order[]>('orders');
// For admin pages that need all orders:
export const fetchAllSiteOrders = (): Promise<Order[]> => fetchData<Order[]>('allSiteOrders');
// For the new "My Orders" page:
export const fetchUserOrders = (userId: string): Promise<Order[]> => fetchData<Order[]>('orders', { userId });

export const fetchInventory = (): Promise<InventoryItem[]> => fetchData<InventoryItem[]>('inventory');
export const fetchInventorySummary = (): Promise<InventoryCategorySummary[]> => fetchData<InventoryCategorySummary[]>('inventorySummary');
export const fetchFinancialPerformance = (): Promise<FinancialDataPoint[]> => fetchData<FinancialDataPoint[]>('financialPerformance');
export const fetchVolumeTodayStats = (): Promise<VolumeStat[]> => fetchData<VolumeStat[]>('volumeToday');
export const fetchMonthlyKPIs = (): Promise<MonthlyKPI[]> => fetchData<MonthlyKPI[]>('monthlyKPIs');
export const fetchUsers = (): Promise<User[]> => fetchData<User[]>('users');
export const fetchProducts = (): Promise<Product[]> => fetchData<Product[]>('products');

    
