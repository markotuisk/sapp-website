
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicProvider } from "@/contexts/AuthContext";
import { DisplayModeProvider } from "@/contexts/DisplayModeContext";
import Index from "./pages/Index";
import About from "./pages/About";
import News from "./pages/News";
import Contact from "./pages/Contact";
import EventSecurity from "./pages/EventSecurity";
import SecurityAudits from "./pages/SecurityAudits";
import Installations from "./pages/Installations";
import CyberSecurity from "./pages/CyberSecurity";
import NewsletterUnsubscribe from "./pages/NewsletterUnsubscribe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PublicProvider>
      <DisplayModeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/event-security" element={<EventSecurity />} />
              <Route path="/security-audits" element={<SecurityAudits />} />
              <Route path="/installations" element={<Installations />} />
              <Route path="/cyber-security" element={<CyberSecurity />} />
              <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DisplayModeProvider>
    </PublicProvider>
  </QueryClientProvider>
);

export default App;
