import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Helmet } from "react-helmet-async";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewIncidentForm } from "@/components/incidents/new-incident-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFireStation } from "@/context/FireStationContext";
import { Search, Plus, Filter } from "lucide-react";
import { IncidentList } from "@/components/dashboard/incident-list";

export default function Incidents() {
  const { incidents } = useFireStation();
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredIncidents = incidents.filter((incident) =>
    incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <Helmet>
        <title>Incidents | Fire Rescue Command Center</title>
      </Helmet>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Incidents</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Incident</DialogTitle>
              </DialogHeader>
              <NewIncidentForm onSuccess={() => setDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search incidents..."
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
          <IncidentList/>
        </div>
       
      </div>
    </MainLayout>
  );
}
