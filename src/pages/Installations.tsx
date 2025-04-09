
import { MonitorCheck, Wifi, Users, FileText, ArrowRight, Lock, Database } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import QuoteSection from '@/components/installations/QuoteSection';

const Installations = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();

  const handleRapidServiceNavigator = () => {
    navigate('/#services');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
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
                Accredited installation of <span className="text-sapp-blue">AI-driven</span> complex corporate <span className="text-sapp-blue">security</span> systems and <span className="text-sapp-blue">technology</span>
              </h1>
              <p 
                className={cn(
                  "text-sapp-gray text-lg md:text-xl mb-8 transition-all duration-500 delay-200 max-w-3xl mx-auto",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                From cloud to cable deployments, making security an integral part of your system installations in physical and network security, speech privacy and counter surveillance
              </p>
              
              <div 
                className={cn(
                  "flex flex-col space-y-2 items-center justify-center transition-all duration-500 delay-300",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <p className="text-sapp-blue font-semibold text-lg mb-2">Cut through complexity</p>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 w-full sm:w-auto transition-all duration-300 group relative overflow-hidden"
                  onClick={handleRapidServiceNavigator}
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    Rapid Service Navigator
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - Updated to match Cyber Security layout */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Why Choose Our Solutions</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-6">
                  Next Generation AI Security Integration
                </h2>
                <p className="text-sapp-gray mb-6">
                  There is a notable shift towards AI-driven security systems with strengthened defence and improved user experience. Organisations are increasingly replacing their legacy access control, CCTV and other systems with data-driven scalable security systems to automate across various interfaces and improve their security posture whilst optimising costs and reduce manual work. New security systems provide a perfect interface for bringing together the physical and cyber security expertise in organisations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <MonitorCheck className="h-6 w-6 text-sapp-blue mb-2" />
                    <h4 className="font-semibold text-sapp-dark mb-1">CCTV & Access</h4>
                    <p className="text-sm text-sapp-gray">Comprehensive video surveillance and access control systems.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <Wifi className="h-6 w-6 text-sapp-blue mb-2" />
                    <h4 className="font-semibold text-sapp-dark mb-1">Speech Privacy</h4>
                    <p className="text-sm text-sapp-gray">Advanced sound masking and speech protection solutions.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <Lock className="h-6 w-6 text-sapp-blue mb-2" />
                    <h4 className="font-semibold text-sapp-dark mb-1">Counter Surveillance</h4>
                    <p className="text-sm text-sapp-gray">Protection against unauthorized surveillance activities.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <Database className="h-6 w-6 text-sapp-blue mb-2" />
                    <h4 className="font-semibold text-sapp-dark mb-1">Network Security</h4>
                    <p className="text-sm text-sapp-gray">Secure network infrastructure and communications.</p>
                  </div>
                </div>
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
              <div className="relative order-1 md:order-2">
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

        {/* Industry Leader Opinion Section */}
        <QuoteSection />

        {/* Installation Capabilities Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Security Expertise</h3>
              </div>
            </div>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-sapp-dark mb-3">Our Installation Capabilities</h2>
              <p className="text-sapp-gray">Our Technical team works with major system manufacturers requiring both physical and cyber security expertise.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
              {/* Physical Security Systems */}
              <ServiceCard 
                title="Physical Security Systems"
                description="Control visibility, movement, and presence with CCTV, access and visitor management systems."
                delay={100}
                href="/installations/cctv-access"
              />
              
              {/* Speech Privacy & Sound Masking */}
              <ServiceCard 
                title="Speech Privacy & Sound Masking"
                description="Protect conversations and reduce acoustic exposure in sensitive or shared environments."
                delay={200}
                href="/installations/speech-privacy"
              />
              
              {/* Counter Surveillance Systems */}
              <ServiceCard 
                title="Counter Surveillance Systems"
                description="Identify and neutralise unauthorised surveillance activity across acoustic, RF, and electromagnetic vectors."
                delay={300}
                href="/installations/counter-surveillance"
              />
              
              {/* IT Network Systems */}
              <ServiceCard 
                title="IT Network Systems"
                description="Implement secure foundation for communication and control, whether is local or distributed cloud or hybrid solution."
                delay={400}
                href="/installations/network-infrastructure"
              />
            </div>

            <div className="text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-all duration-300 hover:scale-105"
                  >
                    Talk to Our Installation Team
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Talk to Our Installation Team</AlertDialogTitle>
                    <AlertDialogDescription>
                      Fill out the form below to get in touch with our expert installation team.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="py-4">
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name3" className="text-sm font-medium">Full Name</label>
                          <input id="name3" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="company3" className="text-sm font-medium">Company</label>
                          <input id="company3" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email3" className="text-sm font-medium">Email</label>
                        <input id="email3" type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message3" className="text-sm font-medium">Message</label>
                        <textarea id="message3" rows={4} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="text-center mb-8">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Get Started</h3>
              </div>
            </div>
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
