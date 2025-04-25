import { Animated } from '@/components/ui/AnimatedElements';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleGetDetails = (serviceName: string) => {
    setSelectedService(serviceName);
    setContactDialogOpen(true);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-12">
            <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium">
              OUR IOT SECURITY EXPERTISE
            </h3>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              OUR IoT Security Capabilities
            </h2>
            
            <p className="text-sapp-gray max-w-3xl mx-auto mb-8">
              IoT device security starts with the automated device inventory, network segmentation and security policy implementation, followed by real-time monitoring during highly sensitive meetings and events.
            </p>
          </div>
        </Animated>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto">
          {[
            {
              title: "IoT Device Security",
              description: "IoT device security starts with the automated device inventory, network segmentation and security policy implementation."
            },
            {
              title: "WiFi Network Security",
              description: "Our WiFi security solutions protect your wireless networks from unauthorised access, rogue access points, and man-in-the-middle attacks through continuous monitoring."
            },
            {
              title: "Bluetooth Security",
              description: "We safeguard your Bluetooth-enabled devices against eavesdropping, BlueBorne attacks, and other vulnerabilities through advanced detection and mitigation solutions."
            },
            {
              title: "Cellular Network Security",
              description: "Our cellular security expertise protects against IMSI catchers, SS7 vulnerabilities, and other mobile network threats through advanced detection and prevention technologies."
            }
          ].map((service, index) => (
            <Card key={index} className="border-gray-100 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl text-sapp-dark">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sapp-gray text-sm min-h-[80px]">
                  {service.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 w-full" 
                  onClick={() => handleGetDetails(service.title)}
                >
                  Get Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 max-w-5xl mx-auto">
          <ContactFormDialog 
            open={contactDialogOpen}
            onOpenChange={setContactDialogOpen}
            defaultMessage={`I'm interested in learning more about your ${selectedService} services.`}
            serviceName={selectedService}
          />
        </div>
      </div>

      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage={`I'm interested in learning more about your ${selectedService} services.`}
        serviceName={selectedService}
      />
    </section>
  );
};

export default FeaturesSection;
