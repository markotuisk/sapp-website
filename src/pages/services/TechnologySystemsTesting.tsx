
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Server, Monitor, Lock, Shield } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import QuoteCard from '@/components/ui/QuoteCard';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import FeatureCard from '@/components/ui/FeatureCard';
import { useLocation } from 'react-router-dom';
import { useComponentLogger, useDebugContext } from '@/utils/debugTools';
import CTASection from '@/components/services/technology-systems-testing/CTASection';
import NavigationButtons from '@/components/services/technology-systems-testing/NavigationButtons';

const TechnologySystemsTesting = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  const { logEvent } = useComponentLogger('TechnologySystemsTesting');
  const { isDebugMode } = useDebugContext();
  
  useEffect(() => {
    // Scroll to the top when component mounts or location changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Technology & Systems Testing | SAPP Security</title>
        <meta 
          name="description" 
          content="Technical testing of security and communications technology to identify gaps and protect against physical security and cyber attacks." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/technology-systems-testing" />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Technical Testing</h3>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                Technology & Systems Testing
              </h1>
              <p className="text-lg text-sapp-gray mb-8 max-w-2xl mx-auto">
                Comprehensive testing of your security and communications technology to identify vulnerabilities and protect against both physical and cyber attacks.
              </p>
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Schedule a Technology Assessment
              </Button>
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
                  Comprehensive Technology Assessment
                </h2>
                <p className="text-sapp-gray max-w-3xl mx-auto">
                  Our technology testing services provide thorough evaluation of your security systems to identify vulnerabilities and ensure optimal performance.
                </p>
              </div>
            </Animated>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Animated animation="fade-up" delay={150} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Monitor className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">CCTV System Testing</h3>
                    <p className="text-sm text-sapp-gray">Comprehensive evaluation of surveillance systems for coverage, quality, and reliability.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={200} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Lock className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Access Control Testing</h3>
                    <p className="text-sm text-sapp-gray">Verification of access control system integrity and vulnerability assessment.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={250} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Server className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Network Security Testing</h3>
                    <p className="text-sm text-sapp-gray">Evaluation of network infrastructure for security vulnerabilities and performance issues.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={300} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Shield className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Intrusion Detection Testing</h3>
                    <p className="text-sm text-sapp-gray">Assessment of alarm systems and intrusion detection capabilities through simulated breach scenarios.</p>
                  </div>
                </div>
              </Animated>
            </div>
            
            <div className="mt-12">
              <FeatureCard
                title="Our Technology Testing Services"
                features={[
                  "CCTV system assessment",
                  "Access control testing",
                  "Alarm system evaluation",
                  "Communication systems testing",
                  "Network security assessment",
                  "Intrusion detection verification",
                  "Integration point vulnerability testing",
                  "Technology penetration testing",
                  "System resilience assessment",
                  "Backup and redundancy evaluation",
                  "Legacy system security review",
                  "Technology upgrade consulting"
                ]}
              />
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <QuoteCard
              quote="The convergence of physical security and cybersecurity has created new vulnerabilities where these systems meet. Organizations that test their technologies in isolation miss critical integration points that attackers specifically target. Comprehensive technology testing reveals these hidden vulnerabilities before they can be exploited."
              author="Marko Tuisk"
              position="SAPP Founder and Technical Director"
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <CTASection onRequestAssessment={() => setContactDialogOpen(true)} />
        
        {/* Bottom navigation */}
        <NavigationButtons />
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your Technology & Systems Testing services."
        serviceName="Technology & Systems Testing"
      />
    </div>
  );
};

export default TechnologySystemsTesting;
