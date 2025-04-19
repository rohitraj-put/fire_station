import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { PersonnelTable } from "@/components/personnel/personnel-table";
import { PersonnelDialog } from "@/components/personnel/personnel-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Search, Plus, Filter } from "lucide-react";
import { useFireStation } from "@/context/FireStationContext";

export default function Personnel() {
  const { personnel } = useFireStation();
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredPersonnel = personnel.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <Helmet>
        <title>Personnel | Fire Rescue Command Center</title>
      </Helmet>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Personnel</h1>
          <PersonnelDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Personnel
            </Button>
          </PersonnelDialog>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search personnel..."
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

        <PersonnelTable personnel={filteredPersonnel} />
      </div>
    </MainLayout>
  );
}
