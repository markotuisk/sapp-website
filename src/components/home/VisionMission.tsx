
import React from 'react';
import { Shield, Target, Building, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Animated } from '@/components/ui/AnimatedElements';

const VisionMission = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Animated animation="fade-up" delay={200}>
            <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium uppercase mb-4">
              STRATEGIC DIRECTION
            </h3>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-sapp-dark">
              Vision & Mission
            </h2>
            <p className="text-sapp-gray">
              Converging cyber, compliance, and physical security for comprehensive protection
            </p>
          </Animated>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Animated animation="fade-right" delay={300}>
            <Card className="h-full border-0 shadow-lg overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-accent-teal" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-accent-dark-blue">Our Vision</h3>
                </div>
                <Separator className="mb-6 bg-gray-200" />
                <p className="text-sapp-gray text-lg leading-relaxed">
                  The SAPP Vision is for organisations to have a turnkey solution to converge their cyber, compliance and physical security functions.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-accent-teal mr-2" />
                    <span className="text-sm text-sapp-gray">Unified Security</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="w-5 h-5 text-accent-teal mr-2" />
                    <span className="text-sm text-sapp-gray">Corporate Protection</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-accent-teal mr-2" />
                    <span className="text-sm text-sapp-gray">Expert Guidance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Animated>
          
          <Animated animation="fade-left" delay={400}>
            <Card className="h-full border-0 shadow-lg overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-accent-teal" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-accent-dark-blue">Our Mission</h3>
                </div>
                <Separator className="mb-6 bg-gray-200" />
                <p className="text-sapp-gray text-lg leading-relaxed">
                  The SAPP technical security services are for corporate clients to protect their sensitive meetings and high-value events, audit security processes at their workplace, install and maintain security systems, and provide innovative security for IoT devices.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="border-l-2 border-accent-teal pl-3">
                    <h4 className="text-sm font-semibold text-accent-dark-blue">Event Security</h4>
                    <p className="text-xs text-sapp-gray mt-1">Protecting high-value occasions</p>
                  </div>
                  <div className="border-l-2 border-accent-teal pl-3">
                    <h4 className="text-sm font-semibold text-accent-dark-blue">Security Audits</h4>
                    <p className="text-xs text-sapp-gray mt-1">Comprehensive workplace assessment</p>
                  </div>
                  <div className="border-l-2 border-accent-teal pl-3">
                    <h4 className="text-sm font-semibold text-accent-dark-blue">System Installation</h4>
                    <p className="text-xs text-sapp-gray mt-1">Deployment and maintenance</p>
                  </div>
                  <div className="border-l-2 border-accent-teal pl-3">
                    <h4 className="text-sm font-semibold text-accent-dark-blue">IoT Security</h4>
                    <p className="text-xs text-sapp-gray mt-1">Innovative device protection</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
