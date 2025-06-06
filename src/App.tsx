
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { DisplayModeProvider } from "./contexts/DisplayModeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { DebugProvider } from "./contexts/DebugContext";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import EventSecurity from "./pages/EventSecurity";
import VirtualOffice from "./pages/VirtualOffice";
import SecurityAudits from "./pages/SecurityAudits";
import CyberSecurity from "./pages/CyberSecurity";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Installations from "./pages/Installations";
import ConsentBanner from "./components/ui/ConsentBanner";
import VersionInfo from "./pages/VersionInfo";
import AcronymDetail from "./pages/AcronymDetail";
import { addSmoothScrollToAnchors } from '@/utils/smoothScroll';
import { PageTransition } from '@/components/ui/PageTransition';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Add smooth scrolling to anchor links
    addSmoothScrollToAnchors();
  }, []);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <DebugProvider>
              <DisplayModeProvider>
                <div className="min-h-screen bg-background">
                  <Toaster />
                  <ConsentBanner />
                  <Navbar />
                  
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={
                        <PageTransition>
                          <Index />
                        </PageTransition>
                      } />
                      <Route path="/about" element={
                        <PageTransition>
                          <About />
                        </PageTransition>
                      } />
                      <Route path="/event-security" element={
                        <PageTransition>
                          <EventSecurity />
                        </PageTransition>
                      } />
                      <Route path="/security-audits" element={
                        <PageTransition>
                          <SecurityAudits />
                        </PageTransition>
                      } />
                      <Route path="/cyber-security" element={
                        <PageTransition>
                          <CyberSecurity />
                        </PageTransition>
                      } />
                      <Route path="/installations" element={
                        <PageTransition>
                          <Installations />
                        </PageTransition>
                      } />
                      <Route path="/news" element={
                        <PageTransition>
                          <News />
                        </PageTransition>
                      } />
                      <Route path="/news/:slug" element={
                        <PageTransition>
                          <NewsDetail />
                        </PageTransition>
                      } />
                      <Route path="/acronyms/:slug" element={
                        <PageTransition>
                          <AcronymDetail />
                        </PageTransition>
                      } />
                      <Route path="/client-area" element={
                        <PageTransition>
                          <VirtualOffice />
                        </PageTransition>
                      } />
                      <Route path="/version-info" element={
                        <PageTransition>
                          <VersionInfo />
                        </PageTransition>
                      } />
                    </Routes>
                  </main>
                  
                  <Footer />
                </div>
              </DisplayModeProvider>
            </DebugProvider>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
