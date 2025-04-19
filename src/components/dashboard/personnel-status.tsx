
import { useFireStation } from "@/context/FireStationContext";
import { PersonnelStatus } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PersonnelStatusCard() {
  const { personnel } = useFireStation();

  // Group personnel by status
  const personnelByStatus: Record<PersonnelStatus, number> = {
    "on-duty": 0,
    "off-duty": 0,
    "on-leave": 0,
    "training": 0,
  };

  personnel.forEach((person) => {
    personnelByStatus[person.status]++;
  });

  // Get on-duty personnel for the list
  const onDutyPersonnel = personnel.filter((person) => person.status === "on-duty");

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Personnel Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">{personnelByStatus["on-duty"]}</div>
            <div className="text-xs text-muted-foreground">ON-DUTY</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">{personnelByStatus["off-duty"]}</div>
            <div className="text-xs text-muted-foreground">OFF-DUTY</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">{personnelByStatus["training"]}</div>
            <div className="text-xs text-muted-foreground">TRAINING</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">{personnelByStatus["on-leave"]}</div>
            <div className="text-xs text-muted-foreground">ON-LEAVE</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">On-Duty Personnel</h4>
          <div className="space-y-2">
            {onDutyPersonnel.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-2">
                No personnel on duty
              </div>
            ) : (
              onDutyPersonnel.map((person) => (
                <div key={person.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={person.imageUrl} alt={person.name} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium leading-none">
                        {person.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {person.position}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Team: {person.team}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
