import type { Order } from '../lib/placeholder-data';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
} from "./ui/table"; // Assuming you have a Table component

interface RecentOrdersTableProps {
  orders: Order[];
}

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Order Date</TableHead>
            {/* Add more headers as needed */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
              {/* Add more cells as needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
