
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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
import { 
  personnelData, 
  equipmentData, 
  vehicleData, 
  incidentData, 
  maintenanceData,
  shiftScheduleData,
  trainingData,
  dashboardSummaryData
} from '../data/mockData';

interface FireStationContextType {
  personnel: Personnel[];
  equipment: Equipment[];
  vehicles: Vehicle[];
  incidents: Incident[];
  maintenance: MaintenanceRecord[];
  shifts: ShiftSchedule[];
  trainings: TrainingRecord[];
  dashboardSummary: DashboardSummary;
  updatePersonnel: (updatedPersonnel: Personnel) => void;
  updateEquipment: (updatedEquipment: Equipment) => void;
  updateVehicle: (updatedVehicle: Vehicle) => void;
  updateIncident: (updatedIncident: Incident) => void;
  updateMaintenance: (updatedMaintenance: MaintenanceRecord) => void;
  addIncident: (newIncident: Omit<Incident, 'id'>) => void;
  addPersonnel: (newPersonnel: Omit<Personnel, 'id'>) => void;
  addEquipment: (newEquipment: Omit<Equipment, 'id'>) => void;
  addVehicle: (newVehicle: Omit<Vehicle, 'id'>) => void;
  addMaintenance: (newMaintenance: Omit<MaintenanceRecord, 'id'>) => void;
  addShift: (newShift: Omit<ShiftSchedule, 'id'>) => void;
  addTraining: (newTraining: Omit<TrainingRecord, 'id'>) => void;
  refreshDashboard: () => void;
  getPersonnelById: (id: string) => Personnel | undefined;
  getEquipmentById: (id: string) => Equipment | undefined;
  getVehicleById: (id: string) => Vehicle | undefined;
  getIncidentById: (id: string) => Incident | undefined;
  loading: boolean;
}

const FireStationContext = createContext<FireStationContextType | undefined>(undefined);

export const FireStationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>([]);
  const [shifts, setShifts] = useState<ShiftSchedule[]>([]);
  const [trainings, setTrainings] = useState<TrainingRecord[]>([]);
  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary>({
    activeIncidents: 0,
    availablePersonnel: 0,
    onDutyPersonnel: 0,
    availableVehicles: 0,
    upcomingMaintenance: 0,
    resolvedIncidentsToday: 0,
    dailyStats: []
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize data
  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setPersonnel(personnelData);
      setEquipment(equipmentData);
      setVehicles(vehicleData);
      setIncidents(incidentData);
      setMaintenance(maintenanceData);
      setShifts(shiftScheduleData);
      setTrainings(trainingData);
      setDashboardSummary(dashboardSummaryData);
      setLoading(false);
    }, 1000);
  }, []);

  // Update functions
  const updatePersonnel = (updatedPersonnel: Personnel) => {
    setPersonnel(current => 
      current.map(person => 
        person.id === updatedPersonnel.id ? updatedPersonnel : person
      )
    );
    refreshDashboard();
  };

  const updateEquipment = (updatedEquipment: Equipment) => {
    setEquipment(current => 
      current.map(item => 
        item.id === updatedEquipment.id ? updatedEquipment : item
      )
    );
    refreshDashboard();
  };

  const updateVehicle = (updatedVehicle: Vehicle) => {
    setVehicles(current => 
      current.map(vehicle => 
        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
      )
    );
    refreshDashboard();
  };

  const updateIncident = (updatedIncident: Incident) => {
    setIncidents(current => 
      current.map(incident => 
        incident.id === updatedIncident.id ? updatedIncident : incident
      )
    );
    refreshDashboard();
  };

  const updateMaintenance = (updatedMaintenance: MaintenanceRecord) => {
    setMaintenance(current => 
      current.map(item => 
        item.id === updatedMaintenance.id ? updatedMaintenance : item
      )
    );
    refreshDashboard();
  };

  // Add functions
  const addIncident = (newIncident: Omit<Incident, 'id'>) => {
    const id = `i${String(incidents.length + 1).padStart(3, '0')}`;
    setIncidents(current => [...current, { ...newIncident, id }]);
    refreshDashboard();
  };

  const addPersonnel = (newPersonnel: Omit<Personnel, 'id'>) => {
    const id = `p${String(personnel.length + 1).padStart(3, '0')}`;
    setPersonnel(current => [...current, { ...newPersonnel, id }]);
    refreshDashboard();
  };

  const addEquipment = (newEquipment: Omit<Equipment, 'id'>) => {
    const id = `e${String(equipment.length + 1).padStart(3, '0')}`;
    setEquipment(current => [...current, { ...newEquipment, id }]);
    refreshDashboard();
  };

  const addVehicle = (newVehicle: Omit<Vehicle, 'id'>) => {
    const id = `v${String(vehicles.length + 1).padStart(3, '0')}`;
    setVehicles(current => [...current, { ...newVehicle, id }]);
    refreshDashboard();
  };

  const addMaintenance = (newMaintenance: Omit<MaintenanceRecord, 'id'>) => {
    const id = `m${String(maintenance.length + 1).padStart(3, '0')}`;
    setMaintenance(current => [...current, { ...newMaintenance, id }]);
    refreshDashboard();
  };

  const addShift = (newShift: Omit<ShiftSchedule, 'id'>) => {
    const id = `s${String(shifts.length + 1).padStart(3, '0')}`;
    setShifts(current => [...current, { ...newShift, id }]);
  };

  const addTraining = (newTraining: Omit<TrainingRecord, 'id'>) => {
    const id = `t${String(trainings.length + 1).padStart(3, '0')}`;
    setTrainings(current => [...current, { ...newTraining, id }]);
  };

  // Get by ID functions
  const getPersonnelById = (id: string) => personnel.find(p => p.id === id);
  const getEquipmentById = (id: string) => equipment.find(e => e.id === id);
  const getVehicleById = (id: string) => vehicles.find(v => v.id === id);
  const getIncidentById = (id: string) => incidents.find(i => i.id === id);

  // Refresh dashboard
  const refreshDashboard = () => {
    // In a real application, this would calculate fresh statistics
    // For now, we'll just update a few key metrics based on our current state
    setDashboardSummary(current => ({
      ...current,
      activeIncidents: incidents.filter(i => i.status === 'active' || i.status === 'en-route' || i.status === 'on-scene').length,
      availablePersonnel: personnel.filter(p => p.status === 'on-duty').length,
      onDutyPersonnel: personnel.filter(p => p.status === 'on-duty').length,
      availableVehicles: vehicles.filter(v => v.status === 'available').length,
      upcomingMaintenance: maintenance.filter(m => m.status === 'scheduled').length,
      resolvedIncidentsToday: incidents.filter(i => 
        i.status === 'resolved' && 
        new Date(i.resolvedAt || '').toDateString() === new Date().toDateString()
      ).length,
    }));
  };

  const value = {
    personnel,
    equipment,
    vehicles,
    incidents,
    maintenance,
    shifts,
    trainings,
    dashboardSummary,
    updatePersonnel,
    updateEquipment,
    updateVehicle,
    updateIncident,
    updateMaintenance,
    addIncident,
    addPersonnel,
    addEquipment,
    addVehicle,
    addMaintenance,
    addShift,
    addTraining,
    refreshDashboard,
    getPersonnelById,
    getEquipmentById,
    getVehicleById,
    getIncidentById,
    loading
  };

  return (
    <FireStationContext.Provider value={value}>
      {children}
    </FireStationContext.Provider>
  );
};

export const useFireStation = (): FireStationContextType => {
  const context = useContext(FireStationContext);
  if (context === undefined) {
    throw new Error('useFireStation must be used within a FireStationProvider');
  }
  return context;
};
