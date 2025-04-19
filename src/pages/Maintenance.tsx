import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useFireStation } from "@/context/FireStationContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Helmet } from "react-helmet-async";

export default function Maintenance() {
  const { maintenance } = useFireStation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = maintenance.filter((record) =>
    record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.itemType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <Helmet>
        <title>Maintenance | Fire Rescue Command Center</title>
      </Helmet>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Maintenance Records</h1>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search maintenance records..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Assigned To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.itemId}</TableCell>
                  <TableCell className="capitalize">{record.itemType}</TableCell>
                  <TableCell>{record.description}</TableCell>
                  <TableCell>
                    <StatusBadge status={record.status} />
                  </TableCell>
                  <TableCell className="capitalize">{record.priority}</TableCell>
                  <TableCell>{new Date(record.scheduledDate).toLocaleDateString()}</TableCell>
                  <TableCell>{record.assignedTo || "Unassigned"}</TableCell>
                </TableRow>
              ))}
              {filteredRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    No maintenance records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
