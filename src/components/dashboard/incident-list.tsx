import { useState } from "react";
import { useFireStation } from "@/context/FireStationContext";
import { formatDistanceToNow } from "date-fns";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EmergencyType } from "@/types";
import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";

const emergencyTypeIcons: Record<EmergencyType, React.ReactNode> = {
  fire: <span className="text-firebrick-500">🔥</span>,
  medical: <span>🚑</span>,
  rescue: <span className="text-amber-500">🔍</span>,
  hazmat: <span className="text-green-500">☣️</span>,
  "natural-disaster": <span>🌪️</span>,
  other: <span>❓</span>,
};

type ViewType = "active" | "all";

export function IncidentList() {
  const { incidents } = useFireStation();
  const [view, setView] = useState<ViewType>("active");
  const path=useLocation()


  const filteredIncidents = view === "active"
    ? incidents.filter((incident) => incident.status !== "resolved" && incident.status !== "closed")
    : incidents;

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority; // Lower number is higher priority
    }
    return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
  });

  if (filteredIncidents.length === 0 && view === "active") {
    return (
      <Card className="col-span-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Incidents</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={view === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("active")}
              >
                Active
              </Button>
              <Button
                variant={view === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("all")}
              >
                All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-medium mb-1">No Active Incidents</h3>
            <p className="text-sm text-muted-foreground">
              There are currently no active incidents to respond to.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{path.pathname==="/incidents"?"":"Incidents"}</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={view === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("active")}
            >
              Active
            </Button>
            <Button
              variant={view === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("all")}
            >
              All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">{incident.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {emergencyTypeIcons[incident.type]}
                      <span className="capitalize">{incident.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {Array.from({ length: 5 - incident.priority + 1 }, (_, i) => (
                        <span
                          key={i}
                          className={`h-2 w-2 rounded-full mx-0.5 ${
                            incident.priority === 1
                              ? "bg-firebrick-500"
                              : incident.priority === 2
                              ? "bg-orange-500"
                              : incident.priority === 3
                              ? "bg-amber-400"
                              : "bg-blue-500"
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{incident.location.address}</TableCell>
                  <TableCell>
                    <StatusBadge status={incident.status} />
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(incident.reportedAt), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="ghost">
                      <Link to={`/incidents/${incident.id}`}>
                        <span className="sr-only">View details</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
