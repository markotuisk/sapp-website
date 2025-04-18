
import React from 'react';
import { Animated } from '@/components/ui/AnimatedElements';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

const ApproachSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-12">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Approach</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              Comprehensive Event Monitoring Solutions
            </h2>
            <p className="text-sapp-gray max-w-3xl mx-auto">
              Real-time technical and physical monitoring should be a standard business process at any confidential, restricted or sensitive meeting. Our monitoring also includes incident management to prevent potential crises and reputational damage.
            </p>
          </div>
        </Animated>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Pre-Event Security Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-sapp-gray">
                We establish comprehensive monitoring systems before your meeting begins, ensuring secure conditions from the start.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Technical Surveillance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-sapp-gray">
                Our specialists use advanced equipment to detect unauthorized recording devices and monitor for electronic intrusions.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Physical Security Presence</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-sapp-gray">
                Discreet security personnel maintain vigilance throughout your event, controlling access and monitoring for suspicious activity.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-sapp-dark">Real-Time Threat Response</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-sapp-gray">
                Our team provides immediate intervention for any security concerns, with established protocols for different threat levels.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
