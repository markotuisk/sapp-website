
import { MonitorCheck, Wifi, Users, FileText, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import ServiceCard from '@/components/ui/ServiceCard';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';

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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
                    >
                      Request a Consultation
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Request a Security Consultation</AlertDialogTitle>
                      <AlertDialogDescription>
                        Fill out the form below to schedule a consultation with our installation experts.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                            <input id="name" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="company" className="text-sm font-medium">Company</label>
                            <input id="company" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">Email</label>
                          <input id="email" type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">Message</label>
                          <textarea id="message" rows={4} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                      </form>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-sapp-blue hover:bg-sapp-blue/90 text-white">Send Request</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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

        {/* Installation Capabilities Section - Redesigned to match Event Security */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-sapp-dark mb-3">Our Installation Capabilities</h2>
              <p className="text-sapp-gray">Expert installation services designed for complex and demanding environments</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* CCTV, Access & Visitor */}
              <ServiceCard 
                title="CCTV, Access & Visitor Systems"
                description="Control visibility, movement, and presence — with systems that scale from single sites to global estates."
                items={[
                  "AI-powered cloud surveillance to localised deployments",
                  "Encrypted, skimmer-resistant access control solutions",
                  "Standalone or integrated visitor management systems"
                ]}
                delay={100}
                href="/installations/cctv-access"
                imagePath="/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png"
              />
              
              {/* Speech Privacy & Sound Masking */}
              <ServiceCard 
                title="Speech Privacy & Sound Masking"
                description="Protect conversations and reduce acoustic exposure in sensitive or shared environments."
                items={[
                  "Speech privacy and sound masking systems for confidential environments",
                  "Smart privacy film for glass partitions and windows",
                  "Microphone nullification technology for secure spaces"
                ]}
                delay={200}
                href="/installations/speech-privacy"
              />
              
              {/* Counter Surveillance & RF Monitoring */}
              <ServiceCard 
                title="Countering Surveillance & RF Monitoring"
                description="Identify and neutralise unauthorised surveillance activity across acoustic, RF, and electromagnetic vectors."
                items={[
                  "Acoustic, RF, and electromagnetic threat detection",
                  "Technical surveillance countermeasures (TSCM)",
                  "Continuous detection of unauthorised signals"
                ]}
                delay={300}
                href="/installations/counter-surveillance"
              />
              
              {/* Network Infrastructure & Communication */}
              <ServiceCard 
                title="Network Infrastructure & Communication"
                description="Lay secure foundations for communication and control — whether on-site, distributed, or hybrid."
                items={[
                  "Secure, scalable network and IT infrastructure installations",
                  "Custom system builds for task automation and integration",
                  "Secure communication systems for sensitive environments"
                ]}
                delay={400}
                href="/installations/network-infrastructure"
              />
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-all duration-300 hover:scale-105"
              >
                Talk to Our Installation Team
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
                >
                  Get a System Assessment
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Request a System Assessment</AlertDialogTitle>
                  <AlertDialogDescription>
                    Fill out the form below to have our experts evaluate your current security infrastructure.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name2" className="text-sm font-medium">Full Name</label>
                        <input id="name2" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company2" className="text-sm font-medium">Company</label>
                        <input id="company2" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email2" className="text-sm font-medium">Email</label>
                      <input id="email2" type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                      <input id="phone" type="tel" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message2" className="text-sm font-medium">Current Security Setup</label>
                      <textarea id="message2" rows={4} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Briefly describe your current security systems..."></textarea>
                    </div>
                  </form>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-sapp-blue hover:bg-sapp-blue/90 text-white">Request Assessment</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Installations;
