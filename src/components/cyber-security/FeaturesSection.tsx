
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
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-12">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our IoT Security Expertise</h3>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              Our IoT Security Capabilities
            </h2>
            
            <p className="text-sapp-gray max-w-3xl mx-auto mb-8">
              IoT device security starts with the automated device inventory, network segmentation and security policy implementation, followed by real-time monitoring during highly sensitive meetings and events.
            </p>
          </div>
        </Animated>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">IoT Device Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sapp-gray text-sm min-h-[80px]">
                IoT device security starts with the automated device inventory, network segmentation and security policy implementation.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/cyber-security/iot-device-security">
                <Button variant="outline" className="text-sapp-blue border-sapp-blue/30 hover:bg-sapp-blue/5">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Button 
                className="bg-sapp-blue hover:bg-sapp-blue/90" 
                onClick={() => handleGetDetails('IoT Device Security')}
              >
                Get Details
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">WiFi Network Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sapp-gray text-sm min-h-[80px]">
                Our WiFi security solutions protect your wireless networks from unauthorised access, rogue access points, and man-in-the-middle attacks through continuous monitoring.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/cyber-security/wifi-security">
                <Button variant="outline" className="text-sapp-blue border-sapp-blue/30 hover:bg-sapp-blue/5">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Button 
                className="bg-sapp-blue hover:bg-sapp-blue/90" 
                onClick={() => handleGetDetails('WiFi Network Security')}
              >
                Get Details
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Bluetooth Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sapp-gray text-sm min-h-[80px]">
                We safeguard your Bluetooth-enabled devices against eavesdropping, BlueBorne attacks, and other vulnerabilities through advanced detection and mitigation solutions.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/cyber-security/bluetooth-security">
                <Button variant="outline" className="text-sapp-blue border-sapp-blue/30 hover:bg-sapp-blue/5">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Button 
                className="bg-sapp-blue hover:bg-sapp-blue/90" 
                onClick={() => handleGetDetails('Bluetooth Security')}
              >
                Get Details
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Cellular Network Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sapp-gray text-sm min-h-[80px]">
                Our cellular security expertise protects against IMSI catchers, SS7 vulnerabilities, and other mobile network threats through advanced detection and prevention technologies.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/cyber-security/cellular-security">
                <Button variant="outline" className="text-sapp-blue border-sapp-blue/30 hover:bg-sapp-blue/5">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Button 
                className="bg-sapp-blue hover:bg-sapp-blue/90" 
                onClick={() => handleGetDetails('Cellular Network Security')}
              >
                Get Details
              </Button>
            </CardFooter>
          </Card>
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
