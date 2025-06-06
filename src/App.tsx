import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderClient,
} from "@tanstack/react-query";
import { DisplayModeProvider } from "./contexts/DisplayModeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { DebugProvider } from "./contexts/DebugContext";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Index } from "./pages/Index";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Contact } from "./pages/Contact";
import { ClientArea } from "./pages/client-area/ClientArea";
import { ServiceDetails } from "./pages/ServiceDetails";
import { Legal } from "./pages/Legal";
import { News } from "./pages/News";
import { NewsDetails } from "./pages/NewsDetails";
import { Installations } from "./pages/Installations";
import { InstallationDetails } from "./pages/InstallationDetails";
import { ConsentBanner } from "./components/ConsentBanner";
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
      <QueryClientProviderClient client={queryClient}>
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
                      <Route path="/services" element={
                        <PageTransition>
                          <Services />
                        </PageTransition>
                      } />
                      <Route path="/services/:slug" element={
                        <PageTransition>
                          <ServiceDetails />
                        </PageTransition>
                      } />
                      <Route path="/installations" element={
                        <PageTransition>
                          <Installations />
                        </PageTransition>
                      } />
                      <Route path="/installations/:slug" element={
                        <PageTransition>
                          <InstallationDetails />
                        </PageTransition>
                      } />
                      <Route path="/contact" element={
                        <PageTransition>
                          <Contact />
                        </PageTransition>
                      } />
                      <Route path="/legal" element={
                        <PageTransition>
                          <Legal />
                        </PageTransition>
                      } />
                      <Route path="/news" element={
                        <PageTransition>
                          <News />
                        </PageTransition>
                      } />
                      <Route path="/news/:slug" element={
                        <PageTransition>
                          <NewsDetails />
                        </PageTransition>
                      } />
                      <Route path="/client-area" element={
                        <PageTransition>
                          <ClientArea />
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
      </QueryClientProviderClient>
    </Router>
  );
}

export default App;
