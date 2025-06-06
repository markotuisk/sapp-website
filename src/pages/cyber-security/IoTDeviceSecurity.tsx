
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Database, List } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import QuoteCard from '@/components/ui/QuoteCard';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import FeatureCard from '@/components/ui/FeatureCard';

const IoTDeviceSecurity = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>IoT Device Security | SAPP Security</title>
        <meta 
          name="description" 
          content="Comprehensive IoT device security solutions including device inventory, network segmentation, and security policy implementation." 
        />
        <link rel="canonical" href="https://sappsecurity.com/cyber-security/iot-device-security" />
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
                    <h3 className="text-sm font-medium text-sapp-blue tracking-wider">IoT Security</h3>
                  </div>
                  <h1 id="iot-security-heading" className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                    IoT Device Security
                  </h1>
                  <p className="text-lg text-sapp-gray mb-8 max-w-2xl">
                    Protect your interconnected devices with comprehensive IoT security solutions that identify vulnerabilities, segment networks, and implement security policies to prevent unauthorized access.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                    onClick={() => setContactDialogOpen(true)}
                  >
                    Get a Security Assessment
                  </Button>
                </Animated>
              </div>
              <div className="md:w-1/2">
                <Animated animation="fade-up" delay={200} className="relative">
                  <div className="absolute -inset-4 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
                  <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src="/lovable-uploads/53d3f50f-88a2-4e7c-8b65-5a3c79f001fa.png" 
                      alt="IoT Device Security" 
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
                  Comprehensive IoT Security
                </h2>
                <p className="text-sapp-gray max-w-3xl mx-auto">
                  Our robust approach to IoT security combines device inventory, network segmentation, and continuous monitoring to ensure complete protection.
                </p>
              </div>
            </Animated>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Animated animation="fade-up" delay={150} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Shield className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Device Identification</h3>
                    <p className="text-sm text-sapp-gray">Automated discovery and inventory management of all IoT devices on your network.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={200} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Database className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Network Segmentation</h3>
                    <p className="text-sm text-sapp-gray">Isolate IoT devices from critical systems to minimize attack surface and prevent lateral movement.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={250} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <List className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Policy Implementation</h3>
                    <p className="text-sm text-sapp-gray">Create and enforce security policies specific to IoT devices and their unique requirements.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={300} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Lock className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Continuous Monitoring</h3>
                    <p className="text-sm text-sapp-gray">24/7 monitoring for unusual activity, with immediate alerts for potential security breaches.</p>
                  </div>
                </div>
              </Animated>
            </div>
            
            <div className="mt-12">
              <FeatureCard
                title="Our IoT Security Services"
                features={[
                  "IoT device discovery and inventory",
                  "Network segmentation design",
                  "Security policy creation",
                  "Vulnerability assessments",
                  "Anomaly detection",
                  "Device authentication",
                  "Access control implementation",
                  "Security audits and reviews",
                  "Incident response planning",
                  "Firmware verification",
                  "Encryption consultation",
                  "Real-time monitoring"
                ]}
              />
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <QuoteCard
              quote="The vast majority of IoT devices are deployed with minimal security considerations, creating an ever-expanding attack surface. Comprehensive device management and network segmentation are no longer optional—they're essential components of modern cyber defense."
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
                Secure Your IoT Environment Today
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Contact our team for a comprehensive assessment of your IoT security posture and tailored recommendations.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-sapp-blue hover:bg-white/90 border-0 shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Request a Consultation
              </Button>
            </Animated>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your IoT Device Security services."
        serviceName="IoT Device Security"
      />
    </div>
  );
};

export default IoTDeviceSecurity;
