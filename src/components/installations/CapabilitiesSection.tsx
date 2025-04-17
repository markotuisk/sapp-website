
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { Animated } from '@/components/ui/AnimatedElements';

const CapabilitiesSection = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleGetDetails = (serviceName: string) => {
    setSelectedService(serviceName);
    setContactDialogOpen(true);
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-12">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Corporate Security Systems</h3>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">Our Installation Capabilities</h2>
            
            <p className="text-sapp-gray max-w-3xl mx-auto mb-8">
              SAPP Installations team works with major system manufacturers requiring both physical and cyber security expertise.
            </p>
          </div>
        </Animated>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-gray-100 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Physical Security</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sapp-gray text-sm min-h-[80px]">
                Control visibility, movement, and presence with CCTV, access and visitor management systems.
              </CardDescription>
            </CardContent>
            <CardFooter className="mt-auto flex justify-between">
              <Link to="/installations/cctv-access">
                <Button variant="outline" className="text-sapp-blue border-sapp-blue/30 hover:bg-sapp-blue/5">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Button 
                className="bg-sapp-blue hover:bg-sapp-blue/90" 
                onClick={() => handleGetDetails('Physical Security')}
              >
                Get Details
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-gray-100 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Speech & Sound Masking</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sapp-gray text-sm min-h-[80px]">
                Protect conversations and reduce acoustic exposure in sensitive or shared environments.
              </CardDescription>
            </CardContent>
            <CardFooter className="mt-auto flex justify-between">
              <Link to="/installations/speech-privacy">
                <Button variant="outline" className="text-sapp-blue border-sapp-blue/30 hover:bg-sapp-blue/5">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Button 
                className="bg-sapp-blue hover:bg-sapp-blue/90" 
                onClick={() => handleGetDetails('Speech & Sound Masking')}
              >
                Get Details
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-gray-100 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Counter Surveillance TSCM</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sapp-gray text-sm min-h-[80px]">
                Identify and neutralise unauthorised surveillance activity across acoustic, RF, and electromagnetic vectors.
              </CardDescription>
            </CardContent>
            <CardFooter className="mt-auto flex justify-between">
              <Link to="/installations/counter-surveillance">
                <Button variant="outline" className="text-sapp-blue border-sapp-blue/30 hover:bg-sapp-blue/5">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Button 
                className="bg-sapp-blue hover:bg-sapp-blue/90" 
                onClick={() => handleGetDetails('Counter Surveillance TSCM')}
              >
                Get Details
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-gray-100 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">IT Network Systems</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sapp-gray text-sm min-h-[80px]">
                Implement secure foundation for communication and control, whether is local or distributed cloud or hybrid solution.
              </CardDescription>
            </CardContent>
            <CardFooter className="mt-auto flex justify-between">
              <Link to="/installations/network-infrastructure">
                <Button variant="outline" className="text-sapp-blue border-sapp-blue/30 hover:bg-sapp-blue/5">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Button 
                className="bg-sapp-blue hover:bg-sapp-blue/90" 
                onClick={() => handleGetDetails('IT Network Systems')}
              >
                Get Details
              </Button>
            </CardFooter>
          </Card>
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
        defaultMessage={`I'm interested in learning more about your ${selectedService} services.`}
        serviceName={selectedService}
      />
    </section>
  );
};

export default CapabilitiesSection;
