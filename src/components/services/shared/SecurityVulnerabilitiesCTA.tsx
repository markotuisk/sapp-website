
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Animated } from '@/components/ui/AnimatedElements';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import Sparkles from '@/components/ui/Sparkles';

interface SecurityVulnerabilitiesCTAProps {
  onRequestAssessment: () => void;
}

const SecurityVulnerabilitiesCTA: React.FC<SecurityVulnerabilitiesCTAProps> = ({ onRequestAssessment }) => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  return (
    <section className="py-16 bg-white" aria-labelledby="security-vulnerabilities-cta">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <Animated animation="fade-up">
          <div 
            className="bg-sapp-dark rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#022B3A] to-transparent opacity-80" aria-hidden="true"></div>
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4" aria-hidden="true">
              <Sparkles className="h-64 w-64 text-sapp-blue/10" />
            </div>
            
            <div className="relative z-10 md:max-w-xl">
              <h3 id="security-vulnerabilities-cta" className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Identify Security Vulnerabilities
              </h3>
              <p className="text-gray-300 mb-6">
                Our comprehensive security assessments help you identify and address vulnerabilities before they can be exploited.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors"
                  onClick={() => setContactDialogOpen(true)}
                  aria-label="Contact us about security vulnerability assessments"
                >
                  Contact Us
                </Button>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                  onClick={onRequestAssessment}
                  aria-label="Request a security vulnerability assessment"
                >
                  Request Assessment
                </Button>
              </div>
            </div>
          </div>
        </Animated>
      </div>
      
      <ContactFormDialog 
        open={contactDialogOpen} 
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your Security Vulnerability Assessment services."
        serviceName="Security Vulnerability Assessment"
      />
    </section>
  );
};

export default SecurityVulnerabilitiesCTA;
