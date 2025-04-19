
import { 
  Personnel, 
  Equipment, 
  Vehicle, 
  Incident, 
  MaintenanceRecord,
  ShiftSchedule,
  TrainingRecord,
  DashboardSummary
} from '../types';

// Mock Personnel Data
export const personnelData: Personnel[] = [
  {
    id: "p001",
    name: "John Smith",
    position: "Fire Chief",
    badge: "FC-101",
    status: "on-duty",
    shift: "A",
    team: "Command",
    contact: {
      phone: "555-111-1000",
      email: "jsmith@firerescue.org"
    },
    certification: ["Fire Science", "EMT-P", "Incident Command"],
    startDate: "2010-03-15",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "p002",
    name: "Sarah Johnson",
    position: "Lieutenant",
    badge: "LT-202",
    status: "on-duty",
    shift: "A",
    team: "Engine 1",
    contact: {
      phone: "555-111-1001",
      email: "sjohnson@firerescue.org"
    },
    certification: ["Fire Science", "EMT-B", "Hazmat"],
    startDate: "2012-08-22",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "p003",
    name: "Mike Williams",
    position: "Firefighter",
    badge: "FF-303",
    status: "on-duty",
    shift: "A",
    team: "Engine 1",
    contact: {
      phone: "555-111-1002",
      email: "mwilliams@firerescue.org"
    },
    certification: ["Fire Science", "EMT-B"],
    startDate: "2015-06-10",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "p004",
    name: "Lisa Brown",
    position: "Paramedic",
    badge: "PM-404",
    status: "on-duty",
    shift: "A",
    team: "Medic 1",
    contact: {
      phone: "555-111-1003",
      email: "lbrown@firerescue.org"
    },
    certification: ["EMT-P", "Advanced Cardiac Life Support", "Pediatric Advanced Life Support"],
    startDate: "2013-11-05",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "p005",
    name: "Robert Chen",
    position: "Firefighter",
    badge: "FF-505",
    status: "off-duty",
    shift: "B",
    team: "Engine 2",
    contact: {
      phone: "555-111-1004",
      email: "rchen@firerescue.org"
    },
    certification: ["Fire Science", "EMT-B", "Rescue Technician"],
    startDate: "2014-02-20",
    nextShift: "2023-09-10",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "p006",
    name: "Maria Rodriguez",
    position: "Firefighter",
    badge: "FF-606",
    status: "off-duty",
    shift: "B",
    team: "Engine 2",
    contact: {
      phone: "555-111-1005",
      email: "mrodriguez@firerescue.org"
    },
    certification: ["Fire Science", "EMT-B", "Hazmat"],
    startDate: "2015-08-12",
    nextShift: "2023-09-10",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "p007",
    name: "David Kim",
    position: "Lieutenant",
    badge: "LT-707",
    status: "training",
    shift: "C",
    team: "Rescue 1",
    contact: {
      phone: "555-111-1006",
      email: "dkim@firerescue.org"
    },
    certification: ["Fire Science", "EMT-P", "Rescue Technician", "Dive Team"],
    startDate: "2011-04-18",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "p008",
    name: "Jennifer Martinez",
    position: "Firefighter",
    badge: "FF-808",
    status: "on-leave",
    shift: "C",
    team: "Engine 3",
    contact: {
      phone: "555-111-1007",
      email: "jmartinez@firerescue.org"
    },
    certification: ["Fire Science", "EMT-B"],
    startDate: "2016-10-30",
    imageUrl: "/placeholder.svg"
  }
];

// Mock Equipment Data
export const equipmentData: Equipment[] = [
  {
    id: "e001",
    name: "Thermal Imaging Camera",
    type: "Detection",
    status: "available",
    location: "Engine 1",
    lastMaintenance: "2023-08-15",
    nextMaintenance: "2023-11-15"
  },
  {
    id: "e002",
    name: "Portable Fire Extinguisher",
    type: "Suppression",
    status: "available",
    location: "Engine 1",
    lastMaintenance: "2023-07-20",
    nextMaintenance: "2023-10-20"
  },
  {
    id: "e003",
    name: "Hydraulic Rescue Tool",
    type: "Rescue",
    status: "in-use",
    location: "Rescue 1",
    lastMaintenance: "2023-08-01",
    nextMaintenance: "2023-11-01",
    assignedTo: "p007"
  },
  {
    id: "e004",
    name: "Self-Contained Breathing Apparatus",
    type: "Protection",
    status: "available",
    location: "Engine 2",
    lastMaintenance: "2023-08-10",
    nextMaintenance: "2023-09-10",
    notes: "Needs pressure check"
  },
  {
    id: "e005",
    name: "Portable Water Pump",
    type: "Suppression",
    status: "maintenance",
    location: "Maintenance Bay",
    lastMaintenance: "2023-04-15",
    nextMaintenance: "2023-09-05",
    notes: "Replacing worn gasket"
  },
  {
    id: "e006",
    name: "Firefighting Hose (50ft)",
    type: "Suppression",
    status: "available",
    location: "Engine 3",
    lastMaintenance: "2023-07-01",
    nextMaintenance: "2023-10-01"
  },
  {
    id: "e007",
    name: "Hazmat Detection Kit",
    type: "Detection",
    status: "available",
    location: "Hazmat Unit",
    lastMaintenance: "2023-08-20",
    nextMaintenance: "2023-11-20"
  },
  {
    id: "e008",
    name: "Rescue Basket",
    type: "Rescue",
    status: "out-of-service",
    location: "Maintenance Bay",
    lastMaintenance: "2023-05-10",
    nextMaintenance: "2023-09-01",
    notes: "Needs replacement parts"
  }
];

// Mock Vehicle Data
export const vehicleData: Vehicle[] = [
  {
    id: "v001",
    name: "Engine 1",
    type: "Fire Engine",
    callSign: "E-1",
    status: "available",
    crew: ["p002", "p003"],
    lastMaintenance: "2023-07-15",
    nextMaintenance: "2023-10-15",
    fuelLevel: 0.9,
    location: {
      address: "Station 1"
    }
  },
  {
    id: "v002",
    name: "Medic 1",
    type: "Ambulance",
    callSign: "M-1",
    status: "responding",
    crew: ["p004"],
    lastMaintenance: "2023-08-01",
    nextMaintenance: "2023-11-01",
    fuelLevel: 0.75,
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: "123 Main St"
    }
  },
  {
    id: "v003",
    name: "Ladder 1",
    type: "Ladder Truck",
    callSign: "L-1",
    status: "available",
    lastMaintenance: "2023-06-20",
    nextMaintenance: "2023-09-20",
    fuelLevel: 0.8,
    location: {
      address: "Station 1"
    }
  },
  {
    id: "v004",
    name: "Rescue 1",
    type: "Heavy Rescue",
    callSign: "R-1",
    status: "maintenance",
    lastMaintenance: "2023-05-10",
    nextMaintenance: "2023-09-01",
    fuelLevel: 0.6,
    location: {
      address: "Maintenance Bay"
    },
    crew: []
  },
  {
    id: "v005",
    name: "Engine 2",
    type: "Fire Engine",
    callSign: "E-2",
    status: "available",
    lastMaintenance: "2023-08-05",
    nextMaintenance: "2023-11-05",
    fuelLevel: 0.95,
    location: {
      address: "Station 2"
    }
  },
  {
    id: "v006",
    name: "Hazmat Unit",
    type: "Specialized",
    callSign: "HM-1",
    status: "available",
    lastMaintenance: "2023-07-25",
    nextMaintenance: "2023-10-25",
    fuelLevel: 0.85,
    location: {
      address: "Station 1"
    }
  }
];

// Mock Incident Data
export const incidentData: Incident[] = [
  {
    id: "i001",
    type: "fire",
    priority: 1,
    status: "active",
    location: {
      address: "123 Main Street",
      lat: 40.7128,
      lng: -74.0060
    },
    description: "Commercial building fire, 3-story structure",
    reportedAt: "2023-09-05T08:30:00Z",
    dispatchedAt: "2023-09-05T08:32:00Z",
    assignedUnits: {
      personnel: ["p001", "p002", "p003"],
      vehicles: ["v001", "v003"],
      equipment: ["e001", "e002"]
    },
    reporter: {
      name: "Building Security",
      phone: "555-123-4567"
    },
    notes: ["Smoke visible from 2nd floor", "Building evacuated"]
  },
  {
    id: "i002",
    type: "medical",
    priority: 2,
    status: "en-route",
    location: {
      address: "456 Oak Avenue",
      lat: 40.7200,
      lng: -74.0100
    },
    description: "Elderly patient experiencing chest pain",
    reportedAt: "2023-09-05T09:15:00Z",
    dispatchedAt: "2023-09-05T09:17:00Z",
    assignedUnits: {
      personnel: ["p004"],
      vehicles: ["v002"],
      equipment: []
    },
    reporter: {
      name: "Family Member",
      phone: "555-987-6543"
    }
  },
  {
    id: "i003",
    type: "rescue",
    priority: 2,
    status: "on-scene",
    location: {
      address: "789 Pine Road",
      lat: 40.7150,
      lng: -74.0080
    },
    description: "Vehicle accident with entrapment",
    reportedAt: "2023-09-05T07:45:00Z",
    dispatchedAt: "2023-09-05T07:47:00Z",
    arrivedAt: "2023-09-05T07:55:00Z",
    assignedUnits: {
      personnel: ["p007"],
      vehicles: ["v004", "v002"],
      equipment: ["e003"]
    },
    notes: ["Two vehicles involved", "One person trapped"]
  },
  {
    id: "i004",
    type: "hazmat",
    priority: 3,
    status: "resolved",
    location: {
      address: "101 Industrial Parkway",
      lat: 40.7300,
      lng: -74.0150
    },
    description: "Chemical spill in warehouse",
    reportedAt: "2023-09-04T14:20:00Z",
    dispatchedAt: "2023-09-04T14:22:00Z",
    arrivedAt: "2023-09-04T14:35:00Z",
    resolvedAt: "2023-09-04T16:45:00Z",
    assignedUnits: {
      personnel: ["p002", "p005", "p006"],
      vehicles: ["v006"],
      equipment: ["e007"]
    },
    notes: ["Small spill contained", "No injuries reported", "Environmental team notified"]
  },
  {
    id: "i005",
    type: "fire",
    priority: 4,
    status: "closed",
    location: {
      address: "202 Maple Street",
      lat: 40.7180,
      lng: -74.0090
    },
    description: "Small kitchen fire",
    reportedAt: "2023-09-04T18:10:00Z",
    dispatchedAt: "2023-09-04T18:12:00Z",
    arrivedAt: "2023-09-04T18:20:00Z",
    resolvedAt: "2023-09-04T18:45:00Z",
    assignedUnits: {
      personnel: ["p003", "p008"],
      vehicles: ["v005"],
      equipment: ["e002"]
    },
    notes: ["Fire contained to stove", "Smoke damage minimal", "Resident advised on safety"]
  }
];

// Mock Maintenance Records
export const maintenanceData: MaintenanceRecord[] = [
  {
    id: "m001",
    itemId: "v004",
    itemType: "vehicle",
    description: "Annual pump test and certification",
    status: "in-progress",
    priority: "high",
    scheduledDate: "2023-09-01",
    assignedTo: "p005",
    notes: "Pressure test showing inconsistent results"
  },
  {
    id: "m002",
    itemId: "e005",
    itemType: "equipment",
    description: "Replace worn gasket on portable pump",
    status: "in-progress",
    priority: "medium",
    scheduledDate: "2023-09-05",
    assignedTo: "p003"
  },
  {
    id: "m003",
    itemId: "e008",
    itemType: "equipment",
    description: "Repair damaged rescue basket",
    status: "scheduled",
    priority: "high",
    scheduledDate: "2023-09-10",
    notes: "Waiting for parts arrival"
  },
  {
    id: "m004",
    itemId: "v003",
    itemType: "vehicle",
    description: "Routine oil change and inspection",
    status: "scheduled",
    priority: "low",
    scheduledDate: "2023-09-20"
  },
  {
    id: "m005",
    itemId: "e004",
    itemType: "equipment",
    description: "SCBA pressure check and certification",
    status: "scheduled",
    priority: "medium",
    scheduledDate: "2023-09-10"
  },
  {
    id: "m006",
    itemId: "v002",
    itemType: "vehicle",
    description: "Replace worn brake pads",
    status: "completed",
    priority: "high",
    scheduledDate: "2023-08-25",
    completedDate: "2023-08-27",
    assignedTo: "p005",
    cost: 450
  }
];

// Mock Shift Schedule
export const shiftScheduleData: ShiftSchedule[] = [
  {
    id: "s001",
    date: "2023-09-05",
    shift: "A",
    personnel: ["p001", "p002", "p003", "p004"]
  },
  {
    id: "s002",
    date: "2023-09-06",
    shift: "A",
    personnel: ["p001", "p002", "p003", "p004"]
  },
  {
    id: "s003",
    date: "2023-09-07",
    shift: "B",
    personnel: ["p005", "p006"]
  },
  {
    id: "s004",
    date: "2023-09-08",
    shift: "B",
    personnel: ["p005", "p006"]
  },
  {
    id: "s005",
    date: "2023-09-09",
    shift: "C",
    personnel: ["p007", "p008"]
  },
  {
    id: "s006",
    date: "2023-09-10",
    shift: "C",
    personnel: ["p007", "p008"]
  }
];

// Mock Training Records
export const trainingData: TrainingRecord[] = [
  {
    id: "t001",
    title: "Advanced Firefighting Techniques",
    description: "Hands-on training for structural firefighting",
    date: "2023-09-15",
    duration: 8,
    instructor: "John Smith",
    attendees: ["p002", "p003", "p005", "p006", "p008"],
    status: "scheduled",
    location: "Training Center"
  },
  {
    id: "t002",
    title: "Hazmat Response Protocol",
    description: "Procedures for handling hazardous materials incidents",
    date: "2023-09-07",
    duration: 4,
    instructor: "David Kim",
    attendees: ["p007", "p002", "p005"],
    status: "scheduled",
    location: "Station 1 Conference Room"
  },
  {
    id: "t003",
    title: "CPR Recertification",
    description: "Annual CPR and basic life support recertification",
    date: "2023-08-20",
    duration: 4,
    instructor: "Lisa Brown",
    attendees: ["p001", "p002", "p003", "p005", "p006", "p007", "p008"],
    status: "completed",
    location: "Station 1 Conference Room"
  },
  {
    id: "t004",
    title: "Incident Command System",
    description: "Training on ICS protocols and implementation",
    date: "2023-10-05",
    duration: 6,
    instructor: "John Smith",
    attendees: ["p001", "p002", "p007"],
    status: "scheduled",
    location: "County Emergency Management Center"
  }
];

// Mock Dashboard Summary
export const dashboardSummaryData: DashboardSummary = {
  activeIncidents: 3,
  availablePersonnel: 5,
  onDutyPersonnel: 4,
  availableVehicles: 4,
  upcomingMaintenance: 3,
  resolvedIncidentsToday: 2,
  dailyStats: [
    { date: "2023-09-01", incidents: 7 },
    { date: "2023-09-02", incidents: 5 },
    { date: "2023-09-03", incidents: 3 },
    { date: "2023-09-04", incidents: 6 },
    { date: "2023-09-05", incidents: 3 }
  ]
};
