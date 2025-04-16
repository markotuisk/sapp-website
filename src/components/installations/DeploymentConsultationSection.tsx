
import React, { useState } from 'react';
import { Home, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Animated } from '@/components/ui/AnimatedElements';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

const DeploymentConsultationSection = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 text-center">
        <Animated animation="fade-up" delay={100}>
          <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">
            Request Deployment Consultation
          </h2>
          <p className="text-sapp-gray max-w-2xl mx-auto mb-8">
            Our project management methodology ensures clear communication, detailed documentation, and transparent processes throughout the deployment lifecycle, regardless of project complexity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button 
                variant="outline"
                size="lg" 
                className="min-w-[200px] border-sapp-blue text-sapp-blue hover:bg-sapp-blue/10"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Button 
              size="lg" 
              className="min-w-[200px] bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
              onClick={() => setContactDialogOpen(true)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Request Consultation
            </Button>
          </div>
        </Animated>
        
        <ContactFormDialog 
          open={contactDialogOpen} 
          onOpenChange={setContactDialogOpen}
          defaultMessage="I would like to request a deployment consultation for my security installation project."
          serviceName="Installation Deployment Consultation"
        />
      </div>
    </section>
  );
};

export default DeploymentConsultationSection;
