
import { NextResponse } from 'next/server';
import { dashboardData } from '@/lib/placeholder-data';
import type { ProductData } from '@/lib/placeholder-data';
// We need to import the 'fs' module to read the local JSON file for products
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const userId = searchParams.get('userId');

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 300));

  switch (type) {
    case 'orders':
      if (userId) {
        const userOrders = dashboardData.allSiteOrders.filter(order => order.userId === userId);
        return NextResponse.json(userOrders);
      }
      return NextResponse.json(dashboardData.orders); // For admin dashboard overview
    case 'allSiteOrders': // specific request for all orders for admin views
        return NextResponse.json(dashboardData.allSiteOrders);
    case 'inventory':
      return NextResponse.json(dashboardData.inventory);
    case 'inventorySummary':
      return NextResponse.json(dashboardData.inventorySummary);
    case 'financialPerformance':
      return NextResponse.json(dashboardData.financialPerformance);
    case 'volumeToday':
      return NextResponse.json(dashboardData.volumeToday);
    case 'monthlyKPIs':
      return NextResponse.json(dashboardData.monthlyKPIs);
    case 'users':
      return NextResponse.json(dashboardData.users);
    case 'products':
      try {
        // Construct the path to the JSON file within the `public` directory
        const filePath = path.join(process.cwd(), 'public', 'regenerated_combined_products_mock.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const productData: ProductData = JSON.parse(jsonData);
        return NextResponse.json(productData.products);
      } catch (error) {
        console.error("Failed to read or parse product data:", error);
        return NextResponse.json({ error: 'Failed to load product data' }, { status: 500 });
      }
    default:
      return NextResponse.json({ error: 'Invalid data type requested' }, { status: 400 });
  }
}

    
