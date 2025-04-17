
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Radio, Scan, AlertTriangle, Shield } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import QuoteCard from '@/components/ui/QuoteCard';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import FeatureCard from '@/components/ui/FeatureCard';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TSCMInspections = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>TSCM Inspections | SAPP Security</title>
        <meta 
          name="description" 
          content="Comprehensive technical surveillance countermeasures (TSCM) inspections to detect and prevent unauthorized surveillance devices." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/tscm-inspections" />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            {/* Navigation buttons */}
            <div className="flex justify-between items-center mb-8">
              <Link to="/services/physical-security-assessments">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Physical Security Assessments
                </Button>
              </Link>
              <Link to="/services/compliance-audits">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                  Next: Compliance Audits
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <Animated animation="fade-up" delay={100}>
                  <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                    <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Bug Sweeps</h3>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                    TSCM Inspections
                  </h1>
                  <p className="text-lg text-sapp-gray mb-8 max-w-2xl">
                    Systematic technical and physical inspections that detect unauthorized listening devices and protect your organization from corporate espionage.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                    onClick={() => setContactDialogOpen(true)}
                  >
                    Schedule a TSCM Inspection
                  </Button>
                </Animated>
              </div>
              <div className="md:w-1/2">
                <Animated animation="fade-up" delay={200} className="relative">
                  <div className="absolute -inset-4 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
                  <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src="/lovable-uploads/7bf6f8ff-6cf1-4ab0-abba-6a916c49bfb8.png" 
                      alt="TSCM Inspection" 
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
                  Comprehensive Bug Sweep Services
                </h2>
                <p className="text-sapp-gray max-w-3xl mx-auto">
                  Our TSCM inspections utilize advanced technology and methodologies to detect and neutralize surveillance threats in your sensitive environments.
                </p>
              </div>
            </Animated>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Animated animation="fade-up" delay={150} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Radio className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">RF Spectrum Analysis</h3>
                    <p className="text-sm text-sapp-gray">Detection of unauthorized radio frequency transmissions using advanced spectrum analyzers.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={200} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Scan className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Non-Linear Junction Detection</h3>
                    <p className="text-sm text-sapp-gray">Locating hidden electronic devices even when powered off using specialized equipment.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={250} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <AlertTriangle className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Physical Inspection</h3>
                    <p className="text-sm text-sapp-gray">Thorough examination of spaces for signs of tampering or unauthorized modifications.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={300} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Shield className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Preventive Measures</h3>
                    <p className="text-sm text-sapp-gray">Implementation of countermeasures and ongoing protection strategies against future threats.</p>
                  </div>
                </div>
              </Animated>
            </div>
            
            <div className="mt-12">
              <FeatureCard
                title="Our TSCM Inspection Services"
                features={[
                  "Radio frequency (RF) detection",
                  "Carrier current analysis",
                  "Infrared and visual light examination",
                  "Acoustic leakage detection",
                  "Telephone and VoIP testing",
                  "Wireless network security",
                  "Non-linear junction detection",
                  "Physical examination of fixtures",
                  "Executive office inspections",
                  "Meeting room sweeps",
                  "Vehicle TSCM services",
                  "Ongoing monitoring programs"
                ]}
              />
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <QuoteCard
              quote="In today's competitive business environment, the theft of sensitive information through electronic eavesdropping is a real and growing threat. Regular TSCM inspections are not a luxury—they're a necessity for organizations that value their intellectual property and confidential discussions."
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
                Protect Your Sensitive Information
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Contact our team to schedule a comprehensive TSCM inspection for your organization's most sensitive areas.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-sapp-blue hover:bg-white/90 border-0 shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Request a Bug Sweep
              </Button>
            </Animated>
          </div>
        </section>
        
        {/* Bottom navigation */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-8 border-t border-gray-100">
            <Link to="/services/physical-security-assessments">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Physical Security Assessments
              </Button>
            </Link>
            <Link to="/services/compliance-audits">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Compliance Audits
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your TSCM Inspection services."
        serviceName="TSCM Inspection"
      />
    </div>
  );
};

export default TSCMInspections;
