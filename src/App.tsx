
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import CustomCursor from "./components/ui/CustomCursor";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientArea from "./pages/VirtualOffice";
import EventSecurity from "./pages/EventSecurity";
import SecurityAudits from "./pages/SecurityAudits";
import Installations from "./pages/Installations";
import CyberSecurity from "./pages/CyberSecurity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <CustomCursor />
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
