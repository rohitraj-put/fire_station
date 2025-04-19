
import { useFireStation } from "@/context/FireStationContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Truck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function VehicleStatusCard() {
  const { vehicles, getPersonnelById } = useFireStation();

  const availableVehicles = vehicles.filter(v => v.status === 'available').length;
  const respondingVehicles = vehicles.filter(v => v.status === 'responding').length;
  const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance').length;
  const outOfServiceVehicles = vehicles.filter(v => v.status === 'out-of-service').length;
  
  // Get status percentages for the progress bars
  const total = vehicles.length;
  const availablePercent = Math.round((availableVehicles / total) * 100);
  const respondingPercent = Math.round((respondingVehicles / total) * 100);
  const maintenancePercent = Math.round((maintenanceVehicles / total) * 100);
  const outOfServicePercent = Math.round((outOfServiceVehicles / total) * 100);

  const respondingVehiclesList = vehicles.filter(v => v.status === 'responding');

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Vehicle Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Status Bars */}
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>Available</span>
                <span className="font-medium">{availableVehicles} / {total}</span>
              </div>
              <Progress value={availablePercent} className={cn("h-2", "bg-green-500")} />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>Responding</span>
                <span className="font-medium">{respondingVehicles} / {total}</span>
              </div>
              <Progress value={respondingPercent} className={cn("h-2", "bg-firebrick-500")} />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>Maintenance</span>
                <span className="font-medium">{maintenanceVehicles} / {total}</span>
              </div>
              <Progress value={maintenancePercent} className={cn("h-2", "bg-amber-400")} />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>Out of Service</span>
                <span className="font-medium">{outOfServiceVehicles} / {total}</span>
              </div>
              <Progress value={outOfServicePercent} className={cn("h-2", "bg-gray-500")} />
            </div>
          </div>

          {/* Responding Vehicles List */}
          {respondingVehicles > 0 ? (
            <div>
              <h4 className="text-sm font-medium mb-2">Responding Units</h4>
              <div className="space-y-2">
                {respondingVehiclesList.map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between bg-muted/50 rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                      <div className="bg-firebrick-100 p-1 rounded">
                        <Truck className="h-4 w-4 text-firebrick-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{vehicle.name}</div>
                        <div className="text-xs text-muted-foreground">{vehicle.callSign}</div>
                      </div>
                    </div>
                    <StatusBadge status={vehicle.status} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
              <div className="text-sm font-medium">All units available</div>
              <div className="text-xs text-muted-foreground">No active dispatches</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
