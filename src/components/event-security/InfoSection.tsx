import React, { useState } from 'react';
import { Shield, Calendar, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import TranslatedText from '@/components/ui/TranslatedText';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface InfoSectionProps {
  setServicesOpen: (open: boolean) => void;
}

const InfoSection: React.FC<InfoSectionProps> = ({ setServicesOpen }) => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Corporate Event Security</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Why Event Security Matters
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto mb-8">
            Protect any meetings or events that are classified confidential, restricted or sensitive with real-time monitoring as live discussions are most vulnerable to potential espionage attacks. Information gatherers always target the weakest link in the organisation and sensitive strategic meetings are usually an easy choice.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out">
                <Shield className="h-6 w-6 text-sapp-blue mb-3" />
                <h4 className="font-semibold text-sapp-dark mb-2">Weakest Link</h4>
                <p className="text-sm text-sapp-gray">Off-site corporate meetings and events are statistically most vulnerable to security attacks.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out">
                <Calendar className="h-6 w-6 text-sapp-blue mb-3" />
                <h4 className="font-semibold text-sapp-dark mb-2">Professional Competence</h4>
                <p className="text-sm text-sapp-gray">Experienced security professionals let organisations focus on their event.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out">
                <FileText className="h-6 w-6 text-sapp-blue mb-3" />
                <h4 className="font-semibold text-sapp-dark mb-2">Containment and Reputation</h4>
                <p className="text-sm text-sapp-gray">Security team handles crisis management and contains your reputation.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out">
                <Users className="h-6 w-6 text-sapp-blue mb-3" />
                <h4 className="font-semibold text-sapp-dark mb-2">Confidentiality and Discretion</h4>
                <p className="text-sm text-sapp-gray">External security team enhances the event confidentiality demonstrating duty of care to shareholders.</p>
              </div>
            </div>
            <div className="text-center md:text-left">
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-transform duration-300 hover:scale-105"
                onClick={() => setContactDialogOpen(true)}
              >
                <TranslatedText textKey="getInTouch" defaultText="Request Consultation" />
              </Button>

              <ContactFormDialog 
                open={contactDialogOpen}
                onOpenChange={setContactDialogOpen}
                defaultMessage="I'm interested in event security consultation."
                serviceName="Event Security"
              />
            </div>
          </div>
          <div className="relative order-1 md:order-2 flex items-center">
            <AspectRatio ratio={16/9} className="w-full">
              <img 
                src="/lovable-uploads/b4eb5728-fc18-4139-aac1-a88d01053ca3.png" 
                alt="Corporate Event Security Meeting" 
                className="rounded-xl w-full h-full object-cover shadow-md transition-all duration-200 hover:shadow-xl hover:scale-[1.01]"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
