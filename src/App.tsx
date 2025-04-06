
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
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
import CookieConsent from "./components/ui/CookieConsent";

// Installation subpage imports
import CCTVAccess from "./pages/installations/CCTVAccess";
import SpeechPrivacy from "./pages/installations/SpeechPrivacy";
import CounterSurveillance from "./pages/installations/CounterSurveillance";
import NetworkInfrastructure from "./pages/installations/NetworkInfrastructure";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
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
            
            {/* Service Detail Pages */}
            <Route path="/services/venue-security-audits" element={<VenueSecurityAudits />} />
            <Route path="/services/event-monitoring" element={<EventMonitoring />} />
            <Route path="/services/secure-technology" element={<SecureTechnology />} />
            <Route path="/services/close-protection" element={<CloseProtection />} />
            
            {/* Installation Subpages */}
            <Route path="/installations/cctv-access" element={<CCTVAccess />} />
            <Route path="/installations/speech-privacy" element={<SpeechPrivacy />} />
            <Route path="/installations/counter-surveillance" element={<CounterSurveillance />} />
            <Route path="/installations/network-infrastructure" element={<NetworkInfrastructure />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
