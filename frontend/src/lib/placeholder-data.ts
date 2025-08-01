
import type { LucideIcon } from 'lucide-react';

export interface OrderStatusEvent {
  name: string;
  time: Date | string;
  completed: boolean;
  current?: boolean;
}

export type OrderStatus = 
  | 'Pending Payment'
  | 'Processing'
  | 'Shipped'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned'
  | 'Backordered'; // Existing status

export interface Order {
  id: string;
  userId?: string; // Added for user-specific orders
  customerName: string;
  status: OrderStatus; 
  orderDate: string; // Format: 'May-10-2023' or ISO string for easier Date conversion
  eta: Date | string;
  items: string[];
  currentLocation: { lat: number; lng: number; address?: string };
  destinationAddress: string;
  statusHistory: OrderStatusEvent[];
  deliveryAgentId?: string;
  totalAmount?: number; // Optional: for user order view
}

export interface Agent {
  id: string;
  name: string;
  vehicle: string;
  vehicleId: string;
  currentLocation: { lat: number; lng: number; address?: string };
  currentOrderIds: string[];
  status: 'Online' | 'Offline' | 'On Delivery';
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string; // ISO string or formatted string
  totalOrders: number;
  avatarUrl?: string; // URL for avatar image
}

export interface InventoryItem {
  id: string;
  category: string;
  product: string;
  sku: string;
  inStock: number;
}

export interface InventoryCategorySummary {
  name: string; // e.g. 'Electronics'
  value: number; // e.g. 516
}

export interface FinancialDataPoint {
  region: string; // 'Asia', 'Africa', 'Europe', 'USA'
  cashToCashTime: number;
  accountRecDay: number;
  inventoryDays: number;
  accountsPayableDays: number;
}

export interface VolumeStat {
  id: string;
  label: string;
  value: number;
  Icon?: LucideIcon; 
  iconColor?: string; 
  valueColor?: string; 
}

export interface MonthlyKPI {
  id: string;
  metric: string;
  thisMonthValue: number;
  thisMonthDisplay: string; 
  pastMonthValue: number;
  pastMonthDisplay: string; 
  changeValue: number;
  changeDisplay: string; 
  past30DaysData: number[]; 
  Icon?: LucideIcon;
  iconColor?: string; 
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  imageUrl: string;
}

export interface ProductData {
  products: Product[];
}


export const sampleOrdersForDashboard: Order[] = [
  { 
    id: 'CUST001', 
    customerName: 'Customer 1', 
    status: 'Backordered', 
    orderDate: '2023-05-10', 
    eta: '', items:[], currentLocation: {lat:0,lng:0}, destinationAddress:'', statusHistory:[] 
  },
  { 
    id: 'CUST002', 
    customerName: 'Customer 2', 
    status: 'Backordered', 
    orderDate: '2023-05-09',
    eta: '', items:[], currentLocation: {lat:0,lng:0}, destinationAddress:'', statusHistory:[] 
  },
  // ... more dashboard-specific orders if needed
];

export const sampleInventory: InventoryItem[] = [
  { id: 'INV001', category: 'Electronics', product: 'Television', sku: '789452', inStock: 107 },
  { id: 'INV002', category: 'Electronics', product: 'Washing Machine', sku: '874843', inStock: 13 },
  { id: 'INV003', category: 'Electronics', product: 'Smartphone', sku: '874102', inStock: 9 },
  { id: 'INV004', category: 'Electronics', product: 'Air Conditioner', sku: '711239', inStock: 88 },
  { id: 'INV005', category: 'Appliances', product: 'Microwave Oven', sku: '611236', inStock: 45 },
  { id: 'INV006', category: 'Automotive', product: 'Tires (Set of 4)', sku: 'AUTO001', inStock: 50 },
  { id: 'INV007', category: 'Computers', product: 'Laptop Pro 15"', sku: 'COMP001', inStock: 75 },
];

export const sampleInventorySummary: InventoryCategorySummary[] = [
  { name: 'Electronics', value: 516 },
  { name: 'Appliances', value: 190 },
  { name: 'Automotive', value: 137 },
  { name: 'Computers', value: 402 },
];

export const sampleFinancialPerformanceData: FinancialDataPoint[] = [
  { region: 'Asia', cashToCashTime: -10, accountRecDay: 18, inventoryDays: 22, accountsPayableDays: 42 },
  { region: 'Africa', cashToCashTime: 5, accountRecDay: 20, inventoryDays: 25, accountsPayableDays: 38 },
  { region: 'Europe', cashToCashTime: 8, accountRecDay: 15, inventoryDays: 18, accountsPayableDays: 25 },
  { region: 'USA', cashToCashTime: 12, accountRecDay: 22, inventoryDays: 17, accountsPayableDays: 30 },
];

export const sampleVolumeToday: VolumeStat[] = [
  { id: 'vol1', label: 'Orders To Ship', value: 107, valueColor: 'text-yellow-500' },
  { id: 'vol2', label: 'Overdue Shipments', value: 21, valueColor: 'text-green-500' },
  { id: 'vol3', label: 'Open POs', value: 199, valueColor: 'text-yellow-500' },
  { id: 'vol4', label: 'Late Vendor Shipments', value: 13, valueColor: 'text-green-500' },
];

export const sampleMonthlyKPIs: MonthlyKPI[] = [
  { 
    id: 'kpi1', 
    metric: 'Inventory', 
    thisMonthValue: 827000, thisMonthDisplay: '$827,000', 
    pastMonthValue: 755000, pastMonthDisplay: '$755,000',
    changeValue: 0.0953, changeDisplay: '+10%', 
    past30DaysData: [6, 5, 8, 7, 9, 10, 8, 9, 7, 10, 11, 12, 10],
    iconColor: 'text-yellow-500'
  },
  // ... other KPIs
];


// Existing data and functions
export const sampleOrders: Order[] = [
  {
    id: 'ORD12345',
    userId: 'USER123',
    customerName: 'Alice Wonderland',
    status: 'In Transit',
    orderDate: '2024-07-15T10:30:00Z',
    eta: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), 
    items: ['Mad Hatter Tea Set', 'Cheshire Cat Plush'],
    currentLocation: { lat: 34.0522, lng: -118.2437, address: '123 Main St, Los Angeles, CA' },
    destinationAddress: '456 Wonderland Ave, Fantasyland, FL',
    statusHistory: [
      { name: 'Order Placed', time: new Date(new Date().getTime() - 4 * 60 * 60 * 1000), completed: true },
      { name: 'Processing', time: new Date(new Date().getTime() - 3 * 60 * 60 * 1000), completed: true },
      { name: 'Shipped', time: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), completed: true },
      { name: 'In Transit', time: new Date(), completed: false, current: true },
      { name: 'Out for Delivery', time: 'Pending', completed: false },
      { name: 'Delivered', time: 'Pending', completed: false },
    ],
    deliveryAgentId: 'AGENT001',
    totalAmount: 75.50,
  },
  {
    id: 'ORD67890',
    userId: 'USER456',
    customerName: 'Bob The Builder',
    status: 'Processing',
    orderDate: '2024-07-20T14:00:00Z',
    eta: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), 
    items: ['Toolkit Deluxe', 'Hard Hat'],
    currentLocation: { lat: 34.0522, lng: -118.2437, address: 'Warehouse A, Long Beach, CA' },
    destinationAddress: '789 Construction Rd, Builderville, TX',
    statusHistory: [
      { name: 'Order Placed', time: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), completed: true },
      { name: 'Processing', time: new Date(), completed: false, current: true },
      { name: 'Shipped', time: 'Pending', completed: false },
      { name: 'In Transit', time: 'Pending', completed: false },
      { name: 'Out for Delivery', time: 'Pending', completed: false },
      { name: 'Delivered', time: 'Pending', completed: false },
    ],
    totalAmount: 120.00,
  },
  {
    id: 'ORD24680',
    userId: 'USER123',
    customerName: 'Charlie Brown', // Should be Alice for USER123, but keeping for variety
    status: 'Delivered',
    orderDate: '2024-07-01T09:15:00Z',
    eta: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), 
    items: ['Kite', 'Football (for Lucy)'],
    currentLocation: { lat: 37.7749, lng: -122.4194, address: '999 Happiness St, San Francisco, CA' },
    destinationAddress: '999 Happiness St, San Francisco, CA',
    statusHistory: [
      { name: 'Order Placed', time: new Date(new Date('2024-07-01T09:15:00Z').getTime() - 48 * 60 * 60 * 1000), completed: true },
      { name: 'Processing', time: new Date(new Date('2024-07-01T09:15:00Z').getTime() - 47 * 60 * 60 * 1000), completed: true },
      { name: 'Shipped', time: new Date(new Date('2024-07-01T09:15:00Z').getTime() - 30 * 60 * 60 * 1000), completed: true },
      { name: 'In Transit', time: new Date(new Date('2024-07-01T09:15:00Z').getTime() - 28 * 60 * 60 * 1000), completed: true },
      { name: 'Out for Delivery', time: new Date(new Date('2024-07-01T09:15:00Z').getTime() - 25 * 60 * 60 * 1000), completed: true },
      { name: 'Delivered', time: new Date(new Date('2024-07-01T09:15:00Z').getTime() - 24 * 60 * 60 * 1000), completed: true, current: true },
    ],
    deliveryAgentId: 'AGENT002',
    totalAmount: 25.99,
  },
  {
    id: 'ORD11223',
    userId: 'USER123',
    customerName: 'Alice Wonderland',
    status: 'Cancelled',
    orderDate: '2024-06-25T11:00:00Z',
    eta: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    items: ['Playing Cards', 'White Rabbit Pocket Watch'],
    currentLocation: { lat: 51.5074, lng: 0.1278 }, // London
    destinationAddress: 'Mad Tea Party Lane, Wonderland',
    statusHistory: [
      { name: 'Order Placed', time: new Date('2024-06-25T11:00:00Z'), completed: true },
      { name: 'Processing', time: new Date('2024-06-25T12:00:00Z'), completed: true },
      { name: 'Cancelled', time: new Date('2024-06-26T09:00:00Z'), completed: true, current: true },
    ],
    totalAmount: 42.00,
  },
  {
    id: 'ORD33445',
    userId: 'USER789',
    customerName: 'Diana Prince',
    status: 'Pending Payment',
    orderDate: '2024-07-21T08:00:00Z',
    eta: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
    items: ['Lasso of Truth Replica', 'Invisible Jet Model'],
    currentLocation: { lat: 38.9072, lng: -77.0369 }, // Washington D.C.
    destinationAddress: 'Themyscira Outpost, Gateway City',
    statusHistory: [
      { name: 'Order Placed', time: new Date('2024-07-21T08:00:00Z'), completed: true },
      { name: 'Pending Payment', time: new Date('2024-07-21T08:05:00Z'), completed: false, current: true },
    ],
    totalAmount: 199.50,
  },
    {
    id: 'ORD55667',
    userId: 'USER123',
    customerName: 'Alice Wonderland',
    status: 'Shipped',
    orderDate: '2024-07-18T16:30:00Z',
    eta: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    items: ['Down the Rabbit Hole Book Set', 'Queen of Hearts Croquet Set'],
    currentLocation: { lat: 48.8566, lng: 2.3522, address: 'Paris Sorting Facility' }, // Paris
    destinationAddress: '456 Wonderland Ave, Fantasyland, FL',
    statusHistory: [
      { name: 'Order Placed', time: new Date('2024-07-18T16:30:00Z'), completed: true },
      { name: 'Processing', time: new Date('2024-07-19T10:00:00Z'), completed: true },
      { name: 'Shipped', time: new Date('2024-07-20T15:00:00Z'), completed: true, current: true },
      { name: 'In Transit', time: 'Pending', completed: false },
      { name: 'Out for Delivery', time: 'Pending', completed: false },
      { name: 'Delivered', time: 'Pending', completed: false },
    ],
    deliveryAgentId: 'AGENT003',
    totalAmount: 88.20,
  },
];

export const sampleAgents: Agent[] = [
  {
    id: 'AGENT001',
    name: 'Driver Dave',
    vehicle: 'Van',
    vehicleId: 'VAN-XYZ',
    currentLocation: { lat: 34.0522, lng: -118.2437, address: '123 Main St, Los Angeles, CA' },
    currentOrderIds: ['ORD12345'],
    status: 'On Delivery',
  },
  {
    id: 'AGENT002',
    name: 'Rider Rita',
    vehicle: 'Motorcycle',
    vehicleId: 'MOTO-ABC',
    currentLocation: { lat: 40.7128, lng: -74.0060, address: '50 Broadway, New York, NY' },
    currentOrderIds: [],
    status: 'Online',
  },
  {
    id: 'AGENT003',
    name: 'Pilot Pete',
    vehicle: 'Drone',
    vehicleId: 'DRONE-777',
    currentLocation: { lat: 37.7749, lng: -122.4194, address: 'Pier 39, San Francisco, CA' },
    currentOrderIds: ['ORD55667'], 
    status: 'On Delivery',
  },
];

export const sampleUsers: User[] = [
  { id: 'USER123', name: 'Alice Wonderland', email: 'alice@example.com', joinDate: '2023-01-15', totalOrders: 3, avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 'USER456', name: 'Bob The Builder', email: 'bob@example.com', joinDate: '2022-11-20', totalOrders: 1, avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 'USER789', name: 'Diana Prince', email: 'diana@example.com', joinDate: '2023-03-10', totalOrders: 1, avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 'USER101', name: 'Clark Kent', email: 'clark@example.com', joinDate: '2021-07-04', totalOrders: 15, avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 'USER112', name: 'Bruce Wayne', email: 'bruce@example.com', joinDate: '2020-05-26', totalOrders: 25, avatarUrl: 'https://placehold.co/100x100.png' },
];


export const findOrderById = (id: string): Order | undefined => {
  return sampleOrders.find(order => order.id.toLowerCase() === id.toLowerCase());
};

export const getOrdersByUserId = (userId: string): Order[] => {
  return sampleOrders.filter(order => order.userId === userId);
};

export const findAgentById = (id: string): Agent | undefined => {
  return sampleAgents.find(agent => agent.id.toLowerCase() === id.toLowerCase());
};

export const getAgentByOrderId = (orderId: string): Agent | undefined => {
  const order = findOrderById(orderId);
  if (order && order.deliveryAgentId) {
    return findAgentById(order.deliveryAgentId);
  }
  return undefined;
};

// Data for the new dashboard
export const dashboardData = {
  orders: sampleOrdersForDashboard, // These are more summary/backordered style for dashboard
  allSiteOrders: sampleOrders, // All orders for other views if needed
  inventory: sampleInventory,
  inventorySummary: sampleInventorySummary,
  financialPerformance: sampleFinancialPerformanceData,
  volumeToday: sampleVolumeToday,
  monthlyKPIs: sampleMonthlyKPIs,
  users: sampleUsers,
  // products will be fetched from the JSON file directly via the service
};

    
