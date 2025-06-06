
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLocation } from 'react-router-dom';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import CTASection from '@/components/services/tscm-inspections/CTASection';
import NavigationButtons from '@/components/services/tscm-inspections/NavigationButtons';
import { useComponentLogger, useDebugContext } from '@/utils/debugTools';

const TSCMInspections = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  const { logEvent } = useComponentLogger('TSCMInspections');
  const { isDebugMode } = useDebugContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>TSCM Inspections | SAPP Security</title>
        <meta 
          name="description" 
          content="Technical surveillance countermeasures inspections to detect and prevent unauthorized surveillance devices." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/tscm-inspections" />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Technical Surveillance</h3>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                TSCM Inspections
              </h1>
              <p className="text-lg text-sapp-gray mb-8 max-w-2xl mx-auto">
                Comprehensive technical surveillance countermeasures to detect and prevent unauthorized surveillance devices in your environment.
              </p>
              <button 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white px-6 py-3 rounded-md shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Schedule a TSCM Inspection
              </button>
            </div>
          </div>
        </section>
        
        {/* Approach Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Approach</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                Comprehensive TSCM Methodology
              </h2>
              <p className="text-sapp-gray max-w-3xl mx-auto">
                Our technical surveillance countermeasures process employs advanced detection technologies and methodical inspection protocols.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4">
                <div className="bg-sapp-blue/10 p-3 rounded-lg">
                  <span className="text-sapp-blue font-bold">01</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sapp-dark mb-2">Initial Assessment</h3>
                  <p className="text-sm text-sapp-gray">Thorough evaluation of your environment to identify potential surveillance risks.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4">
                <div className="bg-sapp-blue/10 p-3 rounded-lg">
                  <span className="text-sapp-blue font-bold">02</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sapp-dark mb-2">Technical Sweep</h3>
                  <p className="text-sm text-sapp-gray">Comprehensive RF and physical inspection using specialized equipment to detect devices.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4">
                <div className="bg-sapp-blue/10 p-3 rounded-lg">
                  <span className="text-sapp-blue font-bold">03</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sapp-dark mb-2">Countermeasure Implementation</h3>
                  <p className="text-sm text-sapp-gray">Deployment of effective strategies to neutralize threats and prevent future surveillance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg border border-gray-100 relative">
              <div className="absolute top-0 right-0 transform translate-x-[-25%] translate-y-[-25%] text-gray-100 opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl font-medium mb-6 text-sapp-dark">
                  "In the age of sophisticated surveillance technology, protecting your communications and sensitive information requires more than standard security measures. Our TSCM inspections identify covert listening devices, hidden cameras, and digital vulnerabilities that could compromise your privacy and business interests."
                </p>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold text-sapp-dark">Marko Tuisk</p>
                    <p className="text-sm text-sapp-gray">SAPP Founder and Technical Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <CTASection onRequestAssessment={() => setContactDialogOpen(true)} />
        
        {/* Navigation Buttons */}
        <NavigationButtons />
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
