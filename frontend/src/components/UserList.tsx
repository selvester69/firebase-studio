import type { User } from '../lib/placeholder-data';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
} from "./ui/table"; // Assuming you have a Table component

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Total Orders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
              <TableCell>{user.totalOrders}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
