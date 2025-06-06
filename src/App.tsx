
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import News from "./pages/News";
import Contact from "./pages/Contact";
import NewsletterUnsubscribe from "./pages/NewsletterUnsubscribe";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PublicProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PublicProvider>
  </QueryClientProvider>
);

export default App;
