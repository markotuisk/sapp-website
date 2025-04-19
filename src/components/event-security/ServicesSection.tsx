import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { Animated } from '@/components/ui/AnimatedElements';

interface ServicesSectionProps {
  serviceDetails: Array<{
    title: string;
    description: string;
    href: string;
    imagePath: string;
  }>;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ serviceDetails }) => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleGetDetails = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setContactDialogOpen(true);
  };

  return (
    <section className="py-16 bg-slate-50" id="executive-events">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-12">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Security Solutions</h3>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              How We Secure Executive Events
            </h2>
            
            <p className="text-sapp-gray max-w-3xl mx-auto mb-8">
              We are specialised executive-level Event Security and technical vendor providing comprehensive protection for corporate board and management meetings.
            </p>
          </div>
        </Animated>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {serviceDetails.map((service, index) => (
            <Card key={index} className="border-gray-100 flex flex-col lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-xl text-sapp-dark">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sapp-gray text-sm min-h-[100px]">
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

export default ServicesSection;
