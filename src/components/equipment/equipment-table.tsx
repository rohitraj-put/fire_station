import { Equipment } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface EquipmentTableProps {
  equipment: Equipment[];
}

export function EquipmentTable({ equipment }: EquipmentTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Last Maintenance</TableHead>
            <TableHead>Next Maintenance</TableHead>
            <TableHead>Assigned To</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {item.status.replace("-", " ")}
                </Badge>
              </TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{new Date(item.lastMaintenance).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(item.nextMaintenance).toLocaleDateString()}</TableCell>
              <TableCell>{item.assignedTo || "N/A"}</TableCell>
            </TableRow>
          ))}
          {equipment.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No equipment found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
