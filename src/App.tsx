import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FireStationProvider } from "./context/FireStationContext";
import { UserContextProvider } from "./context/UserContext";
import { ThemeProvider } from "./components/theme/theme-provider";
import { ProtectedRoute } from "@/components/auth/protected-route";
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
              <UserContextProvider>
              <Toaster />
              <Sonner />
              <Helmet titleTemplate="%s | Fire Rescue Command Center" defaultTitle="Fire Rescue Command Center" />
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Protected routes */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/incidents"
                    element={
                      <ProtectedRoute>
                        <Incidents />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/incidents/:id"
                    element={
                      <ProtectedRoute>
                        <IncidentDetails />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/personnel/*"
                    element={
                      <ProtectedRoute>
                        <Personnel />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/vehicles/*"
                    element={
                      <ProtectedRoute>
                        <Vehicles />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/equipment/*"
                    element={
                      <ProtectedRoute>
                        <Equipment />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/maintenance/*"
                    element={
                      <ProtectedRoute>
                        <Maintenance />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/schedule/*"
                    element={
                      <ProtectedRoute>
                        <Schedule />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/training/*"
                    element={
                      <ProtectedRoute>
                        <Training />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/*"
                    element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings/*"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              </UserContextProvider>
            </FireStationProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
