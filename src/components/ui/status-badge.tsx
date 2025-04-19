
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = (status: string): string => {
    const statusMap: Record<string, string> = {
      // Personnel status
      'on-duty': 'bg-green-500 text-white',
      'off-duty': 'bg-gray-400 text-white',
      'on-leave': 'bg-amber-400 text-black',
      'training': 'bg-blue-400 text-white',
      
      // Incident status
      'active': 'bg-firebrick-600 text-white',
      'en-route': 'bg-amber-500 text-black',
      'on-scene': 'bg-orange-500 text-white',
      'resolved': 'bg-green-500 text-white',
      'closed': 'bg-gray-500 text-white',
      
      // Equipment/Vehicle status
      'available': 'bg-green-500 text-white',
      'in-use': 'bg-blue-500 text-white',
      'maintenance': 'bg-amber-400 text-black',
      'out-of-service': 'bg-firebrick-600 text-white',
      'responding': 'bg-orange-500 text-white',
      'returning': 'bg-navy-300 text-navy-900',
      
      // Maintenance status
      'scheduled': 'bg-navy-300 text-navy-900',
      'in-progress': 'bg-amber-400 text-black',
      'completed': 'bg-green-500 text-white',
      
      // Default
      'default': 'bg-gray-500 text-white',
    };

    return statusMap[status.toLowerCase()] || statusMap['default'];
  };

  return (
    <span className={cn("px-2.5 py-0.5 text-xs font-medium rounded-full whitespace-nowrap", 
      getStatusColor(status), 
      className)}
    >
      {status}
    </span>
  );
}
