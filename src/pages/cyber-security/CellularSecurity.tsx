
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Signal, ShieldCheck, Smartphone, AlertOctagon } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import QuoteCard from '@/components/ui/QuoteCard';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import FeatureCard from '@/components/ui/FeatureCard';

const CellularSecurity = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Cellular Network Security | SAPP Security</title>
        <meta 
          name="description" 
          content="Advanced cellular network security solutions that protect against IMSI catchers, SS7 vulnerabilities, and other mobile network threats." 
        />
        <link rel="canonical" href="https://sappsecurity.com/cyber-security/cellular-security" />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <Animated animation="fade-up" delay={100}>
                  <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                    <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Mobile Network Protection</h3>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                    Cellular Network Security
                  </h1>
                  <p className="text-lg text-sapp-gray mb-8 max-w-2xl">
                    Protect your mobile communications against IMSI catchers, SS7 vulnerabilities, and other cellular network threats with our advanced security solutions.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                    onClick={() => setContactDialogOpen(true)}
                  >
                    Secure Your Mobile Communications
                  </Button>
                </Animated>
              </div>
              <div className="md:w-1/2">
                <Animated animation="fade-up" delay={200} className="relative">
                  <div className="absolute -inset-4 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
                  <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src="/lovable-uploads/41de3450-d5aa-4a60-985b-1c3478dd5763.png" 
                      alt="Cellular Network Security" 
                      className="w-full h-auto"
                    />
                  </div>
                </Animated>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Animated animation="fade-up" delay={100}>
              <div className="text-center mb-12">
                <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                  <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Approach</h3>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                  Cellular Threat Protection
                </h2>
                <p className="text-sapp-gray max-w-3xl mx-auto">
                  Our comprehensive cellular security solutions protect your mobile communications from sophisticated attacks and surveillance.
                </p>
              </div>
            </Animated>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Animated animation="fade-up" delay={150} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Signal className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">IMSI Catcher Detection</h3>
                    <p className="text-sm text-sapp-gray">Identify fake base stations attempting to intercept mobile communications.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={200} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <ShieldCheck className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">SS7 Vulnerability Protection</h3>
                    <p className="text-sm text-sapp-gray">Safeguard against SS7 protocol vulnerabilities that can compromise mobile networks.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={250} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Smartphone className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Secure Communications</h3>
                    <p className="text-sm text-sapp-gray">Implement end-to-end encrypted voice and data communications for sensitive discussions.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={300} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <AlertOctagon className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Anomaly Detection</h3>
                    <p className="text-sm text-sapp-gray">Monitor for unusual cellular behavior that could indicate an attack or surveillance.</p>
                  </div>
                </div>
              </Animated>
            </div>
            
            <div className="mt-12">
              <FeatureCard
                title="Our Cellular Security Services"
                features={[
                  "IMSI catcher detection",
                  "SS7 vulnerability protection",
                  "End-to-end encrypted voice",
                  "Secure SMS communications",
                  "Mobile threat detection",
                  "SIM card security",
                  "Baseband security monitoring",
                  "RF signal analysis",
                  "Cellular anomaly detection",
                  "Mobile network assessments",
                  "Secure mobile device management",
                  "Executive travel protection"
                ]}
              />
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <QuoteCard
              quote="Cellular networks offer unparalleled convenience, but they also introduce unique security challenges. Advanced attackers know that mobile devices are often the most vulnerable link in an organization's security posture, making comprehensive cellular protection essential."
              author="Marko Tuisk"
              position="SAPP Founder and Technical Director"
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-sapp-blue to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Animated animation="fade-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Secure Your Cellular Communications
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Contact our team for a comprehensive assessment of your mobile security vulnerabilities and tailored protection solutions.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-sapp-blue hover:bg-white/90 border-0 shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Request a Mobile Security Consultation
              </Button>
            </Animated>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your Cellular Network Security services."
        serviceName="Cellular Network Security"
      />
    </div>
  );
};

export default CellularSecurity;
