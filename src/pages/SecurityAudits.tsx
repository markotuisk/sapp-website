
import { AlertTriangle, Shield, FileText, Lock, FileCheck, Quote } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import ServiceCard from '@/components/ui/ServiceCard';
import InsightQuote from '@/components/home/InsightQuote';

const SecurityAudits = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const auditServices = [
    {
      title: "Physical Security Assessments",
      description: "Impartial evaluation of existing and planned security measures to protect organisation's assets from threats and identify vulnerabilities to improve and strengthen organisational resilience. Can include penetration testing.",
      href: "/services/physical-security-assessments",
      delay: 100
    },
    {
      title: "TSCM Inspections",
      description: "Commonly referred to as a bug sweep is a systematic technical and physical inspection that includes scanning and search for unauthorised listening devices to protect the organisation from corporate espionage.",
      href: "/services/tscm-inspections",
      delay: 200
    },
    {
      title: "Compliance Audits",
      description: "ISO27001 certified audit that measures the organisation's compliance with industry standards and international regulations.",
      href: "/services/compliance-audits",
      delay: 300
    },
    {
      title: "Technology and Systems Testing",
      description: "Technical testing of organisation's existing security and communications technology to identify any gaps and protect against physical security and cyber attacks.",
      href: "/services/technology-systems-testing",
      delay: 400
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section - Updated with new headline and subheading */}
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
                Certified <span className="text-sapp-blue">targeted</span> and <span className="text-sapp-blue">comprehensive</span><br /> 
                physical security <span className="text-sapp-blue">audits</span>
              </h1>
              <p 
                className={cn(
                  "text-sapp-gray text-lg md:text-xl mb-8 transition-all duration-500 delay-200 max-w-3xl mx-auto",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Helping you to comply with international best practises and improve your information security resilience
              </p>
              
              <div 
                className={cn(
                  "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 delay-300",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 w-full sm:w-auto transition-all duration-300 group relative overflow-hidden"
                    >
                      <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                        <TranslatedText textKey="exploreServices" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Contact Our Security Audit Team</AlertDialogTitle>
                      <AlertDialogDescription>
                        Fill out the form below to request information about our security audit services.
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

        {/* UPDATED SECTION: Why Independent Audits Matter */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center mb-8">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4 text-center">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Why Independent Audits Matter</h3>
              </div>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                    Unbiased physical security assessment for greater resilience
                  </h2>
                  
                  <div className="space-y-4 text-sapp-gray">
                    <p className="text-lg">Comply with the international best practises for information security management.</p>
                    <p className="text-lg">Use external teams for comprehensive and objective assessment of information security status in your organisation.</p>
                    <p className="text-lg">Commission an all-inclusive or a niche security audit tailored to your specific requirement.</p>
                    <p className="text-lg">These external audits are on-site service visits to objectively evaluate the state of play of the physical and information security processes and technology at your organisation.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
                  <img 
                    src="/lovable-uploads/photo-1498050108023-c5249f4df085.png"
                    alt="Security Audit Process" 
                    className="relative z-10 rounded-xl shadow-2xl w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UPDATED SECTION: Client Quote - now using InsightQuote component */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6 text-center mb-8">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Industry Leader Opinion</h3>
            </div>
          </div>
          <InsightQuote />
        </section>

        {/* Main Content - Updated to match Cyber Security layout */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-8">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Services</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-6">
                  Comprehensive Security Audit Services
                </h2>
                <p className="text-sapp-gray mb-6">
                  The objective of our security audit is to detect and identify any potential gaps and oversights providing detailed risk-based recommendations for improvement. We use a methodical approach to ensure all aspects of your security are thoroughly evaluated.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <Shield className="h-6 w-6 text-sapp-blue mb-2" />
                    <h4 className="font-semibold text-sapp-dark mb-1">Physical Security</h4>
                    <p className="text-sm text-sapp-gray">Comprehensive assessment of physical security measures.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <FileText className="h-6 w-6 text-sapp-blue mb-2" />
                    <h4 className="font-semibold text-sapp-dark mb-1">Systems Testing</h4>
                    <p className="text-sm text-sapp-gray">Thorough evaluation of security systems effectiveness.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <FileCheck className="h-6 w-6 text-sapp-blue mb-2" />
                    <h4 className="font-semibold text-sapp-dark mb-1">Compliance Audits</h4>
                    <p className="text-sm text-sapp-gray">Ensure adherence to industry standards and regulations.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <Lock className="h-6 w-6 text-sapp-blue mb-2" />
                    <h4 className="font-semibold text-sapp-dark mb-1">Penetration Tests</h4>
                    <p className="text-sm text-sapp-gray">Identify vulnerabilities before they can be exploited.</p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
                >
                  <TranslatedText textKey="contactUs" />
                </Button>
              </div>
              <div className="relative order-1 md:order-2">
                <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
                <img 
                  src="/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
                  alt="Security Audit Process" 
                  className="relative z-10 rounded-xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Security Audit Services Cards */}
        <section id="security-audit-services" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">What We Deliver</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
                Comprehensive Security Audit Services
              </h2>
              <p className="text-sapp-gray max-w-3xl mx-auto">
                Certified security audits detect and identify any potential gaps and oversights, providing detailed risk-based recommendations for improvement. The security audits can be both comprehensive and tailored to the organisation's specific requirement, such as TSCM, assessment of access control systems etc.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {auditServices.map((service, index) => (
                <ServiceCard 
                  key={index}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  delay={service.delay}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Image Banner Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src="/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png"
                alt="Security Audit Technology" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sapp-dark/70 to-transparent flex items-center">
                <div className="px-10 max-w-lg">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                    Identify Security Vulnerabilities
                  </h3>
                  <p className="text-white/90">
                    Our comprehensive audits help you identify and address security gaps before they can be exploited.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">Ready to improve your security posture?</h2>
            <p className="text-sapp-gray max-w-2xl mx-auto mb-8">
              Our team of security audit experts is ready to help you identify vulnerabilities and enhance your overall security posture.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
                >
                  <TranslatedText textKey="getInTouch" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Contact Our Security Audit Team</AlertDialogTitle>
                  <AlertDialogDescription>
                    Fill out the form below to request information about our security audit services.
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
                      <label htmlFor="message2" className="text-sm font-medium">Message</label>
                      <textarea id="message2" rows={4} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SecurityAudits;
