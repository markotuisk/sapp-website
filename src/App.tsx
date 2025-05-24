import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { DebugProvider } from "./utils/debugTools";
import { DebugToggle } from "./components/debug/DebugToggle";
import { DisplayModeProvider } from "./contexts/DisplayModeContext";
import ConsentBanner from "./components/ui/ConsentBanner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientArea from "./pages/VirtualOffice";
import EventSecurity from "./pages/EventSecurity";
import SecurityAudits from "./pages/SecurityAudits";
import Installations from "./pages/Installations";
import CyberSecurity from "./pages/CyberSecurity";
import About from "./pages/About";
import CookieConsent from "./components/ui/CookieConsent";
import VersionInfo from "./pages/VersionInfo";
import ServiceNavigator from "./pages/ServiceNavigator";
import TSCM from "./pages/TSCM";
import AcronymDetail from "./pages/AcronymDetail";
import CloseProtection from "./pages/services/CloseProtection";
import SpeechPrivacy from "./pages/services/SpeechPrivacy";
import PhysicalSecurityAssessments from "./pages/services/PhysicalSecurityAssessments";
import VenueSecurityAudits from "./pages/services/VenueSecurityAudits";
import PenetrationTesting from "./pages/services/PenetrationTesting";
import ComplianceAudits from "./pages/services/ComplianceAudits";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import NewsAdmin from "./pages/admin/NewsAdmin";
import EventMonitoring from "./pages/services/EventMonitoring";
import SecureTechnology from "./pages/services/SecureTechnology";
import CCTVAccess from "./pages/installations/CCTVAccess";

// Create a wrapper component for handling legacy redirects
const LegacyAcronymRedirect = () => {
  const location = useLocation();
  
  // Get the full slug from the URL - this preserves descriptive parts like "bs-bespoke-sweep"
  const fullPathSlug = location.pathname.split('/').pop() || "";
  
  // Remove any existing "what-is-" prefixes but preserve the rest of the slug
  const cleanSlug = fullPathSlug.replace(/^(what-is-)+/i, "");
  
  console.log("Legacy redirect: from", fullPathSlug, "to", cleanSlug);
  
  // Return the canonical URL format with a single "what-is-" prefix
  return <Navigate to={`/acronyms/what-is-${cleanSlug}`} replace />;
};

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
                <DisplayModeProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/client-area" element={<ClientArea />} />
                      <Route path="/event-security" element={<EventSecurity />} />
                      <Route path="/security-audits" element={<SecurityAudits />} />
                      <Route path="/installations" element={<Installations />} />
                      <Route path="/installations/cctv-access" element={<CCTVAccess />} />
                      <Route path="/cyber-security" element={<CyberSecurity />} />
                      <Route path="/news" element={<News />} />
                      <Route path="/news/:slug" element={<NewsDetail />} />
                      <Route path="/admin/news" element={<NewsAdmin />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/version-info" element={<VersionInfo />} />
                      
                      {/* Service Navigator routes - dedicated pages for SEO */}
                      <Route path="/service-navigator" element={<ServiceNavigator />} />
                      <Route path="/service-navigator/services" element={<ServiceNavigator defaultTab="services" />} />
                      <Route path="/service-navigator/resources" element={<ServiceNavigator defaultTab="resources" />} />
                      <Route path="/service-navigator/acronyms" element={<ServiceNavigator defaultTab="acronyms" />} />
                      
                      {/* Service detail pages */}
                      <Route path="/services/close-protection" element={<CloseProtection />} />
                      <Route path="/services/speech-privacy" element={<SpeechPrivacy />} />
                      <Route path="/services/physical-security-assessments" element={<PhysicalSecurityAssessments />} />
                      <Route path="/services/venue-security-audits" element={<VenueSecurityAudits />} />
                      <Route path="/services/penetration-testing" element={<PenetrationTesting />} />
                      <Route path="/services/compliance-audits" element={<ComplianceAudits />} />
                      <Route path="/services/event-monitoring" element={<EventMonitoring />} />
                      <Route path="/services/secure-technology" element={<SecureTechnology />} />
                      
                      <Route path="/tscm" element={<TSCM />} />
                      <Route path="/acronyms/what-is-:slug" element={<AcronymDetail />} />
                      {/* Legacy route - redirect to new format */}
                      <Route path="/acronyms/:slug" element={<LegacyAcronymRedirect />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <ConsentBanner />
                    <DebugToggle />
                  </BrowserRouter>
                </DisplayModeProvider>
              </DebugProvider>
            </HelmetProvider>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
