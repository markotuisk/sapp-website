import React, { useState } from 'react';
import { ClipboardEdit, Building2, Presentation, Handshake, WalletCards } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TranslatedText from '@/components/ui/TranslatedText';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

const SecurityProcessSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const meetingTypes = [
    {
      title: "Board Meetings",
      description: "Comprehensive security protocols for board and management meetings.",
      icon: <Building2 className="h-8 w-8 text-white" />,
      color: "from-sapp-blue to-sapp-blue/80",
      delay: 100
    },
    {
      title: "Results Rehearsals",
      description: "Ensure confidentiality for sensitive presentations.",
      icon: <Presentation className="h-8 w-8 text-white" />,
      color: "from-sapp-blue/90 to-sapp-blue/70",
      delay: 200
    },
    {
      title: "Strategy Planning",
      description: "Protect confidential strategic brainstorming and discussions.",
      icon: <ClipboardEdit className="h-8 w-8 text-white" />,
      color: "from-sapp-blue/80 to-sapp-blue/60",
      delay: 300
    },
    {
      title: "Negotiations",
      description: "Secure environment for sensitive negotiations and contract discussions.",
      icon: <Handshake className="h-8 w-8 text-white" />,
      color: "from-sapp-blue/70 to-sapp-blue/50",
      delay: 400
    },
    {
      title: "Investor Meeting",
      description: "Protect confidential fundraising discussions and partner meetings.",
      icon: <WalletCards className="h-8 w-8 text-white" />,
      color: "from-sapp-blue/60 to-sapp-blue/40",
      delay: 500
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <div className="text-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Protect Confidential Meetings</h3>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">
            Which events should be protected
          </h2>
          <p className="text-sapp-gray">
            SAPP Security teams have 20 years' experience in protecting management and board meetings, results rehearsals, sports events, brainstorming and strategy planning meetings with technical security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
          {meetingTypes.map((meetingType, index) => (
            <Card 
              key={index} 
              className={cn(
                "overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${meetingType.delay}ms` }}
              ref={index === 0 ? ref : undefined}
            >
              <div className={`bg-gradient-to-br ${meetingType.color} p-5`}>
                <div className="flex justify-between items-center">
                  <div className="bg-white/20 rounded-full h-12 w-12 flex items-center justify-center backdrop-blur-sm">
                    {meetingType.icon}
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-display font-semibold mb-2 text-sapp-dark group-hover:text-sapp-blue transition-colors duration-300">
                  {meetingType.title}
                </h3>
                <p className="text-sapp-gray text-sm">
                  {meetingType.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
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
            defaultMessage="I'm interested in security for my confidential meetings."
            serviceName="Event Security"
          />
        </div>
      </div>
    </section>
  );
};

export default SecurityProcessSection;
