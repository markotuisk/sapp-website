
import React, { useState } from 'react';
import ServiceCard from '@/components/ui/ServiceCard';
import { Button } from '@/components/ui/button';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

const CapabilitiesSection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Corporate Security Systems</h3>
          </div>
        </div>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-sapp-dark mb-3">Our Installation Capabilities</h2>
          <p className="text-sapp-gray">SAPP Installations team works with major system manufacturers requiring both physical and cyber security expertise.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Services cards */}
          <ServiceCard 
            title="Physical Security"
            description="Control visibility, movement, and presence with CCTV, access and visitor management systems."
            delay={100}
            href="/installations/cctv-access"
          />
          
          {/* Speech Privacy & Sound Masking */}
          <ServiceCard 
            title="Speech & Sound Masking"
            description="Protect conversations and reduce acoustic exposure in sensitive or shared environments."
            delay={200}
            href="/installations/speech-privacy"
          />
          
          {/* Counter Surveillance TSCM */}
          <ServiceCard 
            title="Counter Surveillance TSCM"
            description="Identify and neutralise unauthorised surveillance activity across acoustic, RF, and electromagnetic vectors."
            delay={300}
            href="/installations/counter-surveillance"
          />
          
          {/* IT Network Systems */}
          <ServiceCard 
            title="IT Network Systems"
            description="Implement secure foundation for communication and control, whether is local or distributed cloud or hybrid solution."
            delay={400}
            href="/installations/network-infrastructure"
          />
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-all duration-300 hover:scale-105"
            onClick={() => setContactOpen(true)}
          >
            Talk to Our Installation Team
          </Button>
          
          <ContactFormDialog 
            open={contactOpen}
            onOpenChange={setContactOpen}
            defaultMessage="I'm interested in discussing installation services for my organization."
            serviceName="Installation Services"
          />
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
