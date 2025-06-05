
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
  return (
    <section className="py-16 bg-slate-50" id="executive-events">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-12">
            <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium">
              SECURITY SOLUTIONS
            </h3>
            
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
      </div>
    </section>
  );
};

export default ServicesSection;
