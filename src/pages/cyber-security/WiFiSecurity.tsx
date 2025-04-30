import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Wifi, ShieldAlert, Radio, Eye } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import QuoteCard from '@/components/ui/QuoteCard';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import FeatureCard from '@/components/ui/FeatureCard';

const WiFiSecurity = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>WiFi Network Security | SAPP Security</title>
        <meta 
          name="description" 
          content="Comprehensive WiFi network security solutions to protect against unauthorised access, rogue access points, and wireless network vulnerabilities." 
        />
        <link rel="canonical" href="https://sappsecurity.com/cyber-security/wifi-security" />
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
                    <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Wireless Protection</h3>
                  </div>
                  <h1 id="wifi-security-heading" className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                    WiFi Network Security
                  </h1>
                  <p className="text-lg text-sapp-gray mb-8 max-w-2xl">
                    Safeguard your wireless networks from unauthorised access, man-in-the-middle attacks, and rogue access points with our comprehensive WiFi security solutions.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                    onClick={() => setContactDialogOpen(true)}
                  >
                    Secure Your WiFi Network
                  </Button>
                </Animated>
              </div>
              <div className="md:w-1/2">
                <Animated animation="fade-up" delay={200} className="relative">
                  <div className="absolute -inset-4 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
                  <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src="/lovable-uploads/2c9bf332-fb77-4577-a92d-afad7565e5b8.png" 
                      alt="WiFi Security" 
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
                  Advanced WiFi Security Solutions
                </h2>
                <p className="text-sapp-gray max-w-3xl mx-auto">
                  Our WiFi security solutions provide comprehensive protection against the full spectrum of wireless network threats, from access control to continuous monitoring.
                </p>
              </div>
            </Animated>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Animated animation="fade-up" delay={150} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Wifi className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Rogue AP Detection</h3>
                    <p className="text-sm text-sapp-gray">Automatically identify and alert to unauthorized access points on your network.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={200} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <ShieldAlert className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Attack Prevention</h3>
                    <p className="text-sm text-sapp-gray">Protect against common WiFi attacks including evil twin, deauthentication, and packet injection.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={250} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Radio className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Signal Analysis</h3>
                    <p className="text-sm text-sapp-gray">Monitor wireless signals to detect anomalies and potential security breaches in real-time.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={300} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Eye className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Continuous Monitoring</h3>
                    <p className="text-sm text-sapp-gray">24/7 monitoring of your wireless network environment to identify and respond to potential threats.</p>
                  </div>
                </div>
              </Animated>
            </div>
            
            <div className="mt-12">
              <FeatureCard
                title="Our WiFi Security Services"
                features={[
                  "Wireless network assessments",
                  "Rogue access point detection",
                  "Evil twin attack prevention",
                  "Man-in-the-middle protection",
                  "WPA3 implementation",
                  "Guest network isolation",
                  "Wireless intrusion detection",
                  "Access control management",
                  "Network traffic analysis",
                  "RF spectrum monitoring",
                  "WiFi security policy creation",
                  "Secure guest access solutions"
                ]}
              />
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <QuoteCard
              quote="WiFi networks are often the first entry point for attackers. A single compromised wireless access point can expose your entire network to threats, making robust WiFi security not just recommended, but essential for modern businesses."
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
                Protect Your Wireless Network Today
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Contact our team to assess your WiFi security and implement comprehensive protection measures.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-sapp-blue hover:bg-white/90 border-0 shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Request a WiFi Security Audit
              </Button>
            </Animated>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your WiFi Network Security services."
        serviceName="WiFi Network Security"
      />
    </div>
  );
};

export default WiFiSecurity;
