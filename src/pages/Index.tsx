
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout/main-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { IncidentList } from "@/components/dashboard/incident-list";
import { PersonnelStatusCard } from "@/components/dashboard/personnel-status";
import { VehicleStatusCard } from "@/components/dashboard/vehicle-status";
import { MaintenanceAlertsCard } from "@/components/dashboard/maintenance-alerts";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { useFireStation } from "@/context/FireStationContext";
import { AlertCircle, Users, Truck, CheckSquare, Flame, Wrench } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { WeatherDisplay } from "@/components/weather/Weather";

export default function Dashboard() {
  const { dashboardSummary, loading } = useFireStation();

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-full w-full items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
          <span className="sr-only">Loading...</span>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>Dashboard | Fire Rescue Command Center</title>
      </Helmet>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

        {/* Stats overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Incidents"
            value={dashboardSummary.activeIncidents}
            icon={<Flame size={24} className="text-firebrick-500" />}
            description="Currently ongoing emergencies"
          />
          <StatCard
            title="On-Duty Personnel"
            value={dashboardSummary.onDutyPersonnel}
            icon={<Users size={24} className="text-navy-500" />}
            description="Personnel ready to respond"
          />
          <StatCard
            title="Available Vehicles"
            value={dashboardSummary.availableVehicles}
            icon={<Truck size={24} className="text-navy-500" />}
            description="Ready response vehicles"
          />
          <StatCard
            title="Resolved Today"
            value={dashboardSummary.resolvedIncidentsToday}
            icon={<CheckSquare size={24} className="text-green-500" />}
            trend={{
              value: 10,
              label: "vs. yesterday",
              positive: true,
            }}
          />
        </div>

        {/* Activity chart */}
       <div className="flex justify-between gap-4 max-md:flex-col">
       <ActivityChart />
        <WeatherDisplay/>

       </div>
        {/* Incident list */}
        <IncidentList />

        {/* Status cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <PersonnelStatusCard />
          <VehicleStatusCard />
          <MaintenanceAlertsCard />
        </div>
      </div>
    </MainLayout>
  );
}
