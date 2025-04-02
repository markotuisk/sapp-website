
import { MonitorCheck, Wifi, Users, FileText } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Installations = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section - Updated to match Events Security page */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center justify-center text-center">
              <h1 
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100 leading-tight",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                ref={ref}
              >
                From <span className="text-sapp-blue">cloud</span> to <span className="text-sapp-blue">cable</span> - make<br/>
                <span className="text-sapp-blue">security</span> an integral part<br/>
                of your system <span className="text-sapp-blue">installation</span>
              </h1>
              <p 
                className={cn(
                  "text-sapp-gray text-lg md:text-xl mb-8 transition-all duration-500 delay-200 max-w-3xl mx-auto",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                We install surveillance, access control, and privacy systems that are easy to maintain, discreet in operation, and designed to meet real-world usage — from high-traffic areas to high-risk rooms.
              </p>
              
              <div 
                className={cn(
                  "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 delay-300",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 w-full sm:w-auto transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    <TranslatedText textKey="exploreServices" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-sapp-dark text-sapp-dark hover:bg-sapp-dark/10 w-full sm:w-auto transition-all duration-300 group relative overflow-hidden"
                  asChild
                >
                  <Link to="/#contact">
                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
                      <TranslatedText textKey="contactUs" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-6">
                  Specialist installations for complex security needs
                </h2>
                <p className="text-sapp-gray mb-6">
                  We provide end-to-end installation services for a wide range of security technologies. Our experienced team ensures that your security systems are properly installed, configured, and integrated with your existing infrastructure.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <MonitorCheck className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>CCTV, Access & Visitor</span>
                  </li>
                  <li className="flex items-start">
                    <Wifi className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Speech Privacy & Sound Masking</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Countering Surveillance & RF Monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Network Infrastructure & Communication</span>
                  </li>
                </ul>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
                >
                  Request a Consultation
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
                <img 
                  src="/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png"
                  alt="Security Installation Services" 
                  className="relative z-10 rounded-xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section - Redesigned Installation Capabilities with Tabs */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-8 text-center">
              Our Installation Capabilities
            </h2>
            
            <Tabs defaultValue="cctv" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
                <TabsTrigger value="cctv" className="text-sm md:text-base">
                  <MonitorCheck className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">CCTV & Access</span>
                  <span className="md:hidden">CCTV</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="text-sm md:text-base">
                  <Wifi className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Speech Privacy</span>
                  <span className="md:hidden">Privacy</span>
                </TabsTrigger>
                <TabsTrigger value="counter" className="text-sm md:text-base">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Counter-Surveillance</span>
                  <span className="md:hidden">Counter</span>
                </TabsTrigger>
                <TabsTrigger value="network" className="text-sm md:text-base">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Network Infrastructure</span>
                  <span className="md:hidden">Network</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <TabsContent value="cctv" className="mt-0">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-display font-bold text-sapp-dark mb-4">CCTV, Access & Visitor Systems</h3>
                      <p className="text-sapp-gray mb-4">
                        Control visibility, movement, and presence — with systems that scale from single sites to global estates.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-sapp-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>CCTV systems — from AI-powered cloud surveillance to modest, localised deployments</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-sapp-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>Access control solutions — encrypted, skimmer-resistant, and deployable via cloud or local infrastructure</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-sapp-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>Visitor management systems — standalone or integrated with physical access layers</span>
                        </li>
                      </ul>
                      <Button 
                        className="mt-6 bg-sapp-blue/10 hover:bg-sapp-blue/20 text-sapp-blue"
                        asChild
                      >
                        <Link to="/installations/cctv-access">
                          Learn more about CCTV & Access Solutions
                        </Link>
                      </Button>
                    </div>
                    <div className="md:w-1/2">
                      <div className="rounded-lg overflow-hidden h-full bg-slate-100 flex items-center justify-center min-h-[200px]">
                        <MonitorCheck className="h-16 w-16 text-sapp-blue/30" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="privacy" className="mt-0">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-display font-bold text-sapp-dark mb-4">Speech Privacy & Sound Masking</h3>
                      <p className="text-sapp-gray mb-4">
                        Protect conversations and reduce acoustic exposure in sensitive or shared environments.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-sapp-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>Speech privacy and sound masking systems — for confidential environments and operational discretion</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-sapp-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>Smart privacy film — for glass partitions, windows, and high-sensitivity meeting spaces</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-sapp-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>Microphone nullification technology — for rooms, venues, and secure vehicles</span>
                        </li>
                      </ul>
                      <Button 
                        className="mt-6 bg-sapp-blue/10 hover:bg-sapp-blue/20 text-sapp-blue"
                        asChild
                      >
                        <Link to="/installations/speech-privacy">
                          Learn more about Privacy Solutions
                        </Link>
                      </Button>
                    </div>
                    <div className="md:w-1/2">
                      <div className="rounded-lg overflow-hidden h-full bg-slate-100 flex items-center justify-center min-h-[200px]">
                        <Wifi className="h-16 w-16 text-sapp-blue/30" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="counter" className="mt-0">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-display font-bold text-sapp-dark mb-4">Countering Surveillance & RF Monitoring</h3>
                      <p className="text-sapp-gray mb-4">
                        Identify and neutralise unauthorised surveillance activity across acoustic, RF, and electromagnetic vectors.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-sapp-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>Espionage and surveillance countermeasures — acoustic, RF, and electromagnetic threat detection</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-sapp-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>Technical surveillance countermeasures (TSCM) — regular or ad-hoc sweeps</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-sapp-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>Protective monitoring systems — continuous detection of unauthorised signals</span>
                        </li>
                      </ul>
                      <Button 
                        className="mt-6 bg-sapp-blue/10 hover:bg-sapp-blue/20 text-sapp-blue"
                        asChild
                      >
                        <Link to="/installations/counter-surveillance">
                          Learn more about Counter-Surveillance
                        </Link>
                      </Button>
                    </div>
                    <div className="md:w-1/2">
                      <div className="rounded-lg overflow-hidden h-full bg-slate-100 flex items-center justify-center min-h-[200px]">
                        <FileText className="h-16 w-16 text-sapp-blue/30" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="network" className="mt-0">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-display font-bold text-sapp-dark mb-4">Network Infrastructure & Communication</h3>
                      <p className="text-sapp-gray mb-4">
                        Lay secure foundations for communication and control — whether on-site, distributed, or hybrid.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-sapp-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>Network and IT infrastructure installations — secure, scalable, and aligned with operational needs</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-sapp-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>Custom system builds — software or sensor-based solutions for task automation and integration</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-1.5 w-1.5 bg-sapp-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>Secure communication systems — for sensitive environments and critical operations</span>
                        </li>
                      </ul>
                      <Button 
                        className="mt-6 bg-sapp-blue/10 hover:bg-sapp-blue/20 text-sapp-blue"
                        asChild
                      >
                        <Link to="/installations/network-infrastructure">
                          Learn more about Network Solutions
                        </Link>
                      </Button>
                    </div>
                    <div className="md:w-1/2">
                      <div className="rounded-lg overflow-hidden h-full bg-slate-100 flex items-center justify-center min-h-[200px]">
                        <Users className="h-16 w-16 text-sapp-blue/30" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            <div className="flex justify-center mt-8">
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  Talk to Our Installation Team
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">Ready to upgrade your security infrastructure?</h2>
            <p className="text-sapp-gray max-w-2xl mx-auto mb-8">
              Our team of installation experts is ready to help you implement the latest security technologies for your organisation.
            </p>
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
            >
              Get a System Assessment
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Installations;
