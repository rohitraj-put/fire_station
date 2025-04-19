
import { useFireStation } from "@/context/FireStationContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDistanceToNow, isBefore, parseISO, addDays } from "date-fns";
import { AlertCircle, Check, Clock } from "lucide-react";

export function MaintenanceAlertsCard() {
  const { maintenance, equipment, vehicles } = useFireStation();

  // Get upcoming and overdue maintenance
  const today = new Date();
  const upcomingMaintenance = maintenance
    .filter(item => item.status === 'scheduled')
    .filter(item => {
      const scheduledDate = parseISO(item.scheduledDate);
      return !isBefore(scheduledDate, today) && isBefore(scheduledDate, addDays(today, 7));
    })
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 3);
  
  const overdueMaintenance = maintenance
    .filter(item => item.status === 'scheduled')
    .filter(item => {
      const scheduledDate = parseISO(item.scheduledDate);
      return isBefore(scheduledDate, today);
    })
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 3);

  // Get item details
  const getItemDetails = (item: (typeof maintenance)[0]) => {
    if (item.itemType === 'vehicle') {
      const vehicle = vehicles.find(v => v.id === item.itemId);
      return vehicle ? { name: vehicle.name, type: vehicle.type } : { name: 'Unknown Vehicle', type: '' };
    } else {
      const equipmentItem = equipment.find(e => e.id === item.itemId);
      return equipmentItem ? { name: equipmentItem.name, type: equipmentItem.type } : { name: 'Unknown Equipment', type: '' };
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Maintenance Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        {overdueMaintenance.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center text-sm font-medium text-red-500 mb-2">
              <AlertCircle className="w-4 h-4 mr-1" />
              Overdue
            </div>
            <div className="space-y-2">
              {overdueMaintenance.map(item => {
                const itemDetails = getItemDetails(item);
                return (
                  <div key={item.id} className="bg-red-50 border-l-4 border-red-500 p-2 rounded">
                    <div className="text-sm font-medium">{itemDetails.name}</div>
                    <div className="text-xs text-muted-foreground flex justify-between">
                      <span>{item.description}</span>
                      <span className="font-medium text-red-600">
                        {formatDistanceToNow(parseISO(item.scheduledDate))} overdue
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center text-sm font-medium text-amber-500 mb-2">
            <Clock className="w-4 h-4 mr-1" />
            Upcoming
          </div>
          {upcomingMaintenance.length > 0 ? (
            <div className="space-y-2">
              {upcomingMaintenance.map(item => {
                const itemDetails = getItemDetails(item);
                return (
                  <div key={item.id} className="bg-muted/50 p-2 rounded">
                    <div className="text-sm font-medium">{itemDetails.name}</div>
                    <div className="text-xs text-muted-foreground flex justify-between">
                      <span>{item.description}</span>
                      <span>Due {formatDistanceToNow(parseISO(item.scheduledDate), { addSuffix: true })}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <Check className="h-8 w-8 text-green-500 mb-2" />
              <div className="text-sm">No upcoming maintenance</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
