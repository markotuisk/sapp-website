
import React from 'react';
import { Animated } from '@/components/ui/AnimatedElements';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeaturesSectionProps {
  onContactClick: () => void;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onContactClick }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-12">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Approach</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              Comprehensive Technology Security Solutions
            </h2>
            <p className="text-sapp-gray max-w-3xl mx-auto">
              Companies typically use a range of communications technology at most of their sensitive events. Our service includes detailed audit of all technology with recommendations for more secure alternatives.
            </p>
          </div>
        </Animated>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Technology Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-sapp-gray">
                We comprehensively evaluate all technologies planned for use at your event, identifying potential security vulnerabilities.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Secure Communications Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-sapp-gray">
                Our specialists implement encrypted communications systems for sensitive discussions, protecting against eavesdropping.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Network Security Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-sapp-gray">
                We establish secure, isolated networks for your event, with comprehensive monitoring for intrusion attempts.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Device Security Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-sapp-gray">
                All devices used during your event undergo security hardening to protect against malware and unauthorized access.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12">
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Why Choose Our Secure Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                  <span className="text-sm text-sapp-gray">State-of-the-art encryption solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                  <span className="text-sm text-sapp-gray">Comprehensive cyber threat protection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                  <span className="text-sm text-sapp-gray">Technical surveillance countermeasures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                  <span className="text-sm text-sapp-gray">Secure document handling protocols</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                  <span className="text-sm text-sapp-gray">Experienced cybersecurity professionals</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                onClick={onContactClick}
              >
                Request Secure Technology
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
