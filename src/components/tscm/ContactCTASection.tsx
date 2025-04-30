
import React from 'react';
import { Button } from '@/components/ui/button';

const ContactCTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-sapp-blue to-accent-dark-blue text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Secure Your Environment?
          </h2>
          
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Contact our TSCM specialists for a confidential consultation and free estimate.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-sapp-blue hover:bg-white/90 text-lg px-8 py-6 h-auto shadow-lg"
            >
              Request a Free Estimate
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            >
              Contact Us
            </Button>
          </div>
          
          <p className="mt-8 text-sm opacity-80">
            All inquiries are treated with the utmost confidentiality. Our specialists are available 24/7 for urgent matters.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactCTASection;
