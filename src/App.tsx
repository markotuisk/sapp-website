
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { DebugProvider } from "./utils/debugTools";
import { DebugToggle } from "./components/debug/DebugToggle";
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
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <CookieConsent />
                  <DebugToggle />
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
