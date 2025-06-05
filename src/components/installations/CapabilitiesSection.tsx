
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { Animated } from '@/components/ui/AnimatedElements';
import { useState } from 'react';

const CapabilitiesSection = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-12">
            <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium">
              CORPORATE SECURITY SYSTEMS
            </h3>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">Our Installation Capabilities</h2>
            
            <p className="text-sapp-gray max-w-3xl mx-auto mb-8">
              SAPP Installations team works with major system manufacturers requiring both physical and cyber security expertise.
            </p>
          </div>
        </Animated>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-12">
          {[
            {
              title: "CCTV & Access Control",
              description: "Advanced surveillance and access management systems with cloud and on-premise options, including Verkada and Ubiquiti solutions.",
              href: "/installations/cctv-access"
            },
            {
              title: "Speech & Sound Masking",
              description: "Protect conversations and reduce acoustic exposure in sensitive or shared environments.",
              href: "/services/speech-privacy"
            },
            {
              title: "Counter Surveillance TSCM",
              description: "Identify and neutralise unauthorised surveillance activity across acoustic, RF, and electromagnetic vectors.",
              href: "/installations/counter-surveillance"
            },
            {
              title: "IT Network Systems",
              description: "Implement secure foundation for communication and control, whether is local or distributed cloud or hybrid solution.",
              href: "/installations/network-infrastructure"
            }
          ].map((service, index) => (
            <Card key={index} className="border-gray-100 flex flex-col lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-xl text-sapp-dark">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sapp-gray text-sm min-h-[120px]">
                  {service.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 w-full" 
                  asChild
                >
                  <Link to={service.href}>
                    Learn More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-all duration-300 hover:scale-105"
            onClick={() => setContactDialogOpen(true)}
          >
            Talk to Our Installation Team
          </Button>
        </div>
      </div>

      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your installation services and would like to discuss how SAPP Security can help with our organisation's security infrastructure."
        serviceName="Installation Services"
      />
    </section>
  );
};

export default CapabilitiesSection;
