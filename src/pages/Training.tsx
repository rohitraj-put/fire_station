import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useFireStation } from "@/context/FireStationContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Helmet } from "react-helmet-async";

export default function Training() {
  const { trainings } = useFireStation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrainings = trainings.filter((training) =>
    training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    training.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <Helmet>
        <title>Training | Fire Rescue Command Center</title>
      </Helmet>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Training Programs</h1>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search training programs..."
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
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration (hours)</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attendees</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell>{training.title}</TableCell>
                  <TableCell>{training.description}</TableCell>
                  <TableCell>{new Date(training.date).toLocaleDateString()}</TableCell>
                  <TableCell>{training.duration}</TableCell>
                  <TableCell>{training.location}</TableCell>
                  <TableCell>
                    <StatusBadge status={training.status} />
                  </TableCell>
                  <TableCell>{training.attendees.length} attendees</TableCell>
                </TableRow>
              ))}
              {filteredTrainings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    No training programs found
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