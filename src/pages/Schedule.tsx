import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useFireStation } from "@/context/FireStationContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";

export default function Schedule() {
  const { shifts } = useFireStation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShifts = shifts.filter((shift) =>
    shift.shift.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <Helmet>
        <title>Schedule | Fire Rescue Command Center</title>
      </Helmet>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Shift Schedule</h1>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search schedules..."
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
                <TableHead>Date</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Personnel Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>{new Date(shift.date).toLocaleDateString()}</TableCell>
                  <TableCell>Shift {shift.shift}</TableCell>
                  <TableCell>{shift.personnel.length} personnel</TableCell>
                </TableRow>
              ))}
              {filteredShifts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                    No shifts found
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
