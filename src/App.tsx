
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Dashboard from "./pages/Index";
import NotFound from "./pages/NotFound";
import Incidents from "./pages/Incidents";
import Personnel from "./pages/Personnel";
import Vehicles from "./pages/Vehicles";
import Equipment from "./pages/Equipment";
import Maintenance from "./pages/Maintenance";
import Schedule from "./pages/Schedule";
import Training from "./pages/Training";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { FireStationProvider } from "./context/FireStationContext";
import { ThemeProvider } from "./components/theme/theme-provider";
import IncidentDetails from "./pages/IncidentDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <FireStationProvider>
            <Toaster />
            <Sonner />
            <Helmet titleTemplate="%s | Fire Rescue Command Center" defaultTitle="Fire Rescue Command Center" />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/incidents" element={<Incidents />} />
                <Route path="/incidents/:id" element={<IncidentDetails/>} />
                <Route path="/personnel/*" element={<Personnel />} />
                <Route path="/vehicles/*" element={<Vehicles />} />
                <Route path="/equipment/*" element={<Equipment />} />
                <Route path="/maintenance/*" element={<Maintenance />} />
                <Route path="/schedule/*" element={<Schedule />} />
                <Route path="/training/*" element={<Training />} />
                <Route path="/reports/*" element={<Reports />} />
                <Route path="/settings/*" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </FireStationProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
