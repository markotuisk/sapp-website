
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Animated } from '@/components/ui/AnimatedElements';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

const DeploymentConsultationSection = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <Animated animation="fade-up">
          <div className="bg-sapp-dark rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-sapp-navy to-transparent opacity-80"></div>
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
              <Sparkles className="h-64 w-64 text-sapp-blue/10" />
            </div>
            
            <div className="relative z-10 md:max-w-xl">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Elevate Your Security Systems
              </h2>
              
              <p className="text-gray-300 mb-6">
                Our project management methodology ensures clear communication, detailed documentation, and transparent processes throughout the deployment lifecycle, regardless of project complexity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors"
                  asChild
                >
                  <Link to="/">
                    Back to Home
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                  onClick={() => setContactDialogOpen(true)}
                >
                  Request Consultation
                </Button>
              </div>
            </div>
          </div>
        </Animated>
      </div>
      
      <ContactFormDialog 
        open={contactDialogOpen} 
        onOpenChange={setContactDialogOpen}
        defaultMessage="I would like to request a deployment consultation for my security installation project."
        serviceName="Installation Deployment Consultation"
      />
    </section>
  );
};

export default DeploymentConsultationSection;
