
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { DebugProvider, DebugToggle } from "./utils/debugTools";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientArea from "./pages/VirtualOffice";
import EventSecurity from "./pages/EventSecurity";
import SecurityAudits from "./pages/SecurityAudits";
import Installations from "./pages/Installations";
import CyberSecurity from "./pages/CyberSecurity";
import About from "./pages/About";
import VenueSecurityAudits from "./pages/services/VenueSecurityAudits";
import EventMonitoring from "./pages/services/EventMonitoring";
import SecureTechnology from "./pages/services/SecureTechnology";
import CloseProtection from "./pages/services/CloseProtection";
import PhysicalSecurityAssessments from "./pages/services/PhysicalSecurityAssessments";
import TSCMInspections from "./pages/services/TSCMInspections";
import ComplianceAudits from "./pages/services/ComplianceAudits";
import TechnologySystemsTesting from "./pages/services/TechnologySystemsTesting";
import CookieConsent from "./components/ui/CookieConsent";
import VersionInfo from "./pages/VersionInfo";

// Installation subpage imports
import CCTVAccess from "./pages/installations/CCTVAccess";
import SpeechPrivacy from "./pages/installations/SpeechPrivacy";
import CounterSurveillance from "./pages/installations/CounterSurveillance";
import NetworkInfrastructure from "./pages/installations/NetworkInfrastructure";

// Cyber Security subpage imports
import IoTDeviceSecurity from "./pages/cyber-security/IoTDeviceSecurity";
import WiFiSecurity from "./pages/cyber-security/WiFiSecurity";
import BluetoothSecurity from "./pages/cyber-security/BluetoothSecurity";
import CellularSecurity from "./pages/cyber-security/CellularSecurity";

// Create a new React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log('App initializing with Supabase configuration');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <HelmetProvider>
              <DebugProvider options={{
                componentBoundaries: true,
                logPerformance: true,
                verboseLogging: false,
              }}>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/client-area" element={<ClientArea />} />
                    <Route path="/event-security" element={<EventSecurity />} />
                    <Route path="/security-audits" element={<SecurityAudits />} />
                    <Route path="/installations" element={<Installations />} />
                    <Route path="/cyber-security" element={<CyberSecurity />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/version-info" element={<VersionInfo />} />
                    
                    {/* Service Detail Pages */}
                    <Route path="/services/venue-security-audits" element={<VenueSecurityAudits />} />
                    <Route path="/services/event-monitoring" element={<EventMonitoring />} />
                    <Route path="/services/secure-technology" element={<SecureTechnology />} />
                    <Route path="/services/close-protection" element={<CloseProtection />} />
                    
                    {/* Security Audit Subpages */}
                    <Route path="/services/physical-security-assessments" element={<PhysicalSecurityAssessments />} />
                    <Route path="/services/tscm-inspections" element={<TSCMInspections />} />
                    <Route path="/services/compliance-audits" element={<ComplianceAudits />} />
                    <Route path="/services/technology-systems-testing" element={<TechnologySystemsTesting />} />
                    
                    {/* Installation Subpages */}
                    <Route path="/installations/cctv-access" element={<CCTVAccess />} />
                    <Route path="/installations/speech-privacy" element={<SpeechPrivacy />} />
                    <Route path="/installations/counter-surveillance" element={<CounterSurveillance />} />
                    <Route path="/installations/network-infrastructure" element={<NetworkInfrastructure />} />
                    
                    {/* Cyber Security Subpages */}
                    <Route path="/cyber-security/iot-device-security" element={<IoTDeviceSecurity />} />
                    <Route path="/cyber-security/wifi-security" element={<WiFiSecurity />} />
                    <Route path="/cyber-security/bluetooth-security" element={<BluetoothSecurity />} />
                    <Route path="/cyber-security/cellular-security" element={<CellularSecurity />} />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <CookieConsent />
                  {process.env.NODE_ENV === 'development' && <DebugToggle />}
                </BrowserRouter>
              </DebugProvider>
            </HelmetProvider>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
