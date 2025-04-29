
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Animated } from '@/components/ui/AnimatedElements';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

const ImageBannerSection = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <section className="py-16 bg-white" aria-labelledby="vulnerabilities-section">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <Animated animation="fade-up">
          <div 
            className="rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden"
            style={{ background: '#022B3A' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#022B3A] to-[#022B3A]/70 opacity-100" aria-hidden="true"></div>
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4" aria-hidden="true">
              <Sparkles className="h-64 w-64 text-sapp-blue/10" />
            </div>
            
            <div className="relative z-10 md:max-w-xl">
              <h3 id="vulnerabilities-section" className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Identify Security Vulnerabilities
              </h3>
              <p className="text-gray-300 mb-6">
                Our comprehensive audits help you identify and address security gaps before they can be exploited.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors"
                  asChild
                >
                  <Link to="/" aria-label="Return to SAPP Security homepage">
                    Return to Homepage
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                  onClick={() => setContactDialogOpen(true)}
                  aria-label="Request a comprehensive security audit assessment"
                >
                  Request Security Audit Assessment
                </Button>
              </div>
            </div>
          </div>
        </Animated>
      </div>
      
      <ContactFormDialog 
        open={contactDialogOpen} 
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in a security audit to identify vulnerabilities in our systems."
        serviceName="Security Vulnerability Assessment"
      />
    </section>
  );
};

export default ImageBannerSection;
