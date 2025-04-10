
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import FeatureCard from '@/components/ui/FeatureCard';

const WhyIndependentAudits = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4 text-center">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Independent Audits Matter</h3>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                Independent Audits Matter
              </h2>
              
              <div className="space-y-4 text-sapp-gray">
                <p className="text-lg">
                  Comply with international best practises and objectively evaluate the state of play of the physical and information security processes and technology at your organisation.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <Card className={cn(
                  "transition-all duration-500",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )} style={{ transitionDelay: inView ? '100ms' : '0ms' }}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sapp-dark mb-2">Professional Competence</h3>
                    <p className="text-sm text-sapp-gray">Our audit teams are competent and experienced security professionals.</p>
                  </CardContent>
                </Card>
                
                <Card className={cn(
                  "transition-all duration-500",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )} style={{ transitionDelay: inView ? '200ms' : '0ms' }}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sapp-dark mb-2">Objective Assessment</h3>
                    <p className="text-sm text-sapp-gray">External teams deliver an objective evaluation of your information security status.</p>
                  </CardContent>
                </Card>
                
                <Card className={cn(
                  "transition-all duration-500",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )} style={{ transitionDelay: inView ? '300ms' : '0ms' }}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sapp-dark mb-2">Best Industry Practises</h3>
                    <p className="text-sm text-sapp-gray">Independent security audits deliver compliance with international best practises.</p>
                  </CardContent>
                </Card>
                
                <Card className={cn(
                  "transition-all duration-500",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )} style={{ transitionDelay: inView ? '400ms' : '0ms' }}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sapp-dark mb-2">Security Resilience</h3>
                    <p className="text-sm text-sapp-gray">Security audits objectively identify any gaps and improve your security posture.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative h-full flex items-center justify-center">
              <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl"></div>
              <img 
                src="/lovable-uploads/2715aec1-4acb-498f-b139-9d7c81623255.png"
                alt="Security Compliance Diagram" 
                className="relative z-10 rounded-xl w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyIndependentAudits;
