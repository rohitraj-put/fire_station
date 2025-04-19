import { Vehicle } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface VehiclesTableProps {
  vehicles: Vehicle[];
}

export function VehiclesTable({ vehicles }: VehiclesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Call Sign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Fuel Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell className="font-medium">{vehicle.name}</TableCell>
              <TableCell>{vehicle.type}</TableCell>
              <TableCell>{vehicle.callSign}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {vehicle.status.replace("-", " ")}
                </Badge>
              </TableCell>
              <TableCell>{vehicle.location?.address || "N/A"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${vehicle.fuelLevel}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{vehicle.fuelLevel}%</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {vehicles.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                No vehicles found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
