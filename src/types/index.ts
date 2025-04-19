
// Data types for the fire station management system

export type PersonnelStatus = 'on-duty' | 'off-duty' | 'on-leave' | 'training';
export type IncidentStatus = 'active' | 'en-route' | 'on-scene' | 'resolved' | 'closed';
export type EquipmentStatus = 'available' | 'in-use' | 'maintenance' | 'out-of-service';
export type VehicleStatus = 'available' | 'responding' | 'returning' | 'maintenance' | 'out-of-service';
export type EmergencyType = 'fire' | 'medical' | 'rescue' | 'hazmat' | 'natural-disaster' | 'other';
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'critical';

export interface Personnel {
  id: string;
  name: string;
  position: string;
  badge: string;
  status: PersonnelStatus;
  shift: string;
  team: string;
  contact: {
    phone: string;
    email: string;
  };
  certification: string[];
  startDate: string;
  lastShift?: string;
  nextShift?: string;
  imageUrl?: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  status: EquipmentStatus;
  location: string;
  lastMaintenance: string;
  nextMaintenance: string;
  assignedTo?: string;
  notes?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  callSign: string;
  status: VehicleStatus;
  crew?: string[];
  lastMaintenance: string;
  nextMaintenance: string;
  fuelLevel: number;
  location?: {
    lat?: number;
    lng?: number;
    address?: string;
  };
}

export interface Incident {
  id: string;
  type: EmergencyType;
  priority: number;
  status: IncidentStatus;
  location: {
    address: string;
    lat?: number;
    lng?: number;
  };
  description: string;
  reportedAt: string;
  dispatchedAt?: string;
  arrivedAt?: string;
  resolvedAt?: string;
  assignedUnits: {
    personnel: string[];
    vehicles: string[];
    equipment: string[];
  };
  reporter?: {
    name: string;
    phone: string;
  };
  notes?: string[];
}

export interface MaintenanceRecord {
  id: string;
  itemId: string;
  itemType: 'vehicle' | 'equipment';
  description: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  priority: MaintenancePriority;
  scheduledDate: string;
  completedDate?: string;
  assignedTo?: string;
  cost?: number;
  notes?: string;
}

export interface ShiftSchedule {
  id: string;
  date: string;
  shift: string;
  personnel: string[];
}

export interface TrainingRecord {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: number; // in hours
  instructor: string;
  attendees: string[];
  status: 'scheduled' | 'completed' | 'canceled';
  location: string;
  notes?: string;
}

export interface DashboardSummary {
  activeIncidents: number;
  availablePersonnel: number;
  onDutyPersonnel: number;
  availableVehicles: number;
  upcomingMaintenance: number;
  resolvedIncidentsToday: number;
  dailyStats: {
    date: string;
    incidents: number;
  }[];
}
