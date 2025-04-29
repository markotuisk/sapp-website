
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Animated } from '@/components/ui/AnimatedElements';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

const JoinTeam = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  return (
    <section className="py-16 bg-white" aria-labelledby="join-team-cta">
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
              <h3 id="join-team-cta" className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                BECOME A SAPP SECURITY INNOVATOR
              </h3>
              <p className="text-gray-300 mb-6">
                Join our growing team of innovative thinkers and no-nonsense shakers to create the next-gen security offering
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors"
                  onClick={() => setContactDialogOpen(true)}
                  aria-label="Contact us about career opportunities"
                >
                  Contact Us
                </Button>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                  asChild
                >
                  <Link to="/careers" aria-label="View career opportunities at SAPP Security">
                    WORK WITH US
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Animated>
      </div>
      
      <ContactFormDialog 
        open={contactDialogOpen} 
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in career opportunities at SAPP Security."
        serviceName="Career Inquiry"
      />
    </section>
  );
};

export default JoinTeam;
