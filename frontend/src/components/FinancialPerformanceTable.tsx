import type { FinancialDataPoint } from '../lib/placeholder-data';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
} from "./ui/table"; // Assuming you have a Table component

interface FinancialPerformanceTableProps {
  data: FinancialDataPoint[];
}

export default function FinancialPerformanceTable({ data }: FinancialPerformanceTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Region</TableHead>
            <TableHead>Cash to Cash Time (Days)</TableHead>
            <TableHead>Account Receivable (Days)</TableHead>
            <TableHead>Inventory (Days)</TableHead>
            <TableHead>Accounts Payable (Days)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.region}>
              <TableCell className="font-medium">{item.region}</TableCell>
              <TableCell>{item.cashToCashTime}</TableCell>
              <TableCell>{item.accountRecDay}</TableCell>
              <TableCell>{item.inventoryDays}</TableCell>
              <TableCell>{item.accountsPayableDays}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
