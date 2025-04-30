import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Bluetooth, Shield, Scan, AlertTriangle } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import QuoteCard from '@/components/ui/QuoteCard';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import FeatureCard from '@/components/ui/FeatureCard';

const BluetoothSecurity = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Bluetooth Security | SAPP Security</title>
        <meta 
          name="description" 
          content="Advanced Bluetooth security solutions that protect against eavesdropping, BlueBorne attacks, and other wireless vulnerabilities." 
        />
        <link rel="canonical" href="https://sappsecurity.com/cyber-security/bluetooth-security" />
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
                    <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Personal Area Network Security</h3>
                  </div>
                  <h1 id="bluetooth-security-heading" className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                    Bluetooth Security
                  </h1>
                  <p className="text-lg text-sapp-gray mb-8 max-w-2xl">
                    Protect your Bluetooth-enabled devices against eavesdropping, BlueBorne attacks, and proximity-based threats with our comprehensive security solutions.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                    onClick={() => setContactDialogOpen(true)}
                  >
                    Protect Your Bluetooth Devices
                  </Button>
                </Animated>
              </div>
              <div className="md:w-1/2">
                <Animated animation="fade-up" delay={200} className="relative">
                  <div className="absolute -inset-4 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
                  <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src="/lovable-uploads/94d4676f-3535-4967-ab30-0ec0bbc3eeb3.png" 
                      alt="Bluetooth Security" 
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
                  Bluetooth Threat Protection
                </h2>
                <p className="text-sapp-gray max-w-3xl mx-auto">
                  Our comprehensive Bluetooth security solutions protect your devices and data from the full spectrum of short-range wireless threats.
                </p>
              </div>
            </Animated>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Animated animation="fade-up" delay={150} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Bluetooth className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Vulnerability Detection</h3>
                    <p className="text-sm text-sapp-gray">Identify Bluetooth vulnerabilities in your devices and environment before they can be exploited.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={200} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Shield className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Eavesdropping Prevention</h3>
                    <p className="text-sm text-sapp-gray">Protect against Bluetooth snooping and data interception with advanced encryption solutions.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={250} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Scan className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Malicious Device Detection</h3>
                    <p className="text-sm text-sapp-gray">Identify and block rogue Bluetooth devices attempting to connect to your network.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={300} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <AlertTriangle className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">BlueBorne Protection</h3>
                    <p className="text-sm text-sapp-gray">Safeguard against BlueBorne attack vectors that can compromise devices without pairing.</p>
                  </div>
                </div>
              </Animated>
            </div>
            
            <div className="mt-12">
              <FeatureCard
                title="Our Bluetooth Security Services"
                features={[
                  "Bluetooth vulnerability scanning",
                  "BlueBorne attack prevention",
                  "Bluetooth device inventory",
                  "Secure pairing protocols",
                  "Bluetooth traffic analysis",
                  "Proximity threat detection",
                  "Secure connection enforcement",
                  "Rogue device identification",
                  "BLE security assessments",
                  "RF signal monitoring",
                  "Bluetooth policy implementation",
                  "Executive device protection"
                ]}
              />
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <QuoteCard
              quote="Bluetooth vulnerabilities are particularly dangerous because they operate silently in the background. Many organizations focus on network security while leaving Bluetooth as an overlooked attack vector that can bypass traditional security controls entirely."
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
                Secure Your Bluetooth Environment
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Contact our team for a comprehensive assessment of your Bluetooth security vulnerabilities and tailored protection solutions.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-sapp-blue hover:bg-white/90 border-0 shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Request a Bluetooth Security Audit
              </Button>
            </Animated>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your Bluetooth Security services."
        serviceName="Bluetooth Security"
      />
    </div>
  );
};

export default BluetoothSecurity;
