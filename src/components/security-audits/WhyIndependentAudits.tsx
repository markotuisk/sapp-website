
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
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
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
              <div className="relative z-10 w-full h-auto overflow-hidden rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                <img 
                  src="/lovable-uploads/8651010d-f633-42b3-a6d6-523efa59fa6f.png"
                  alt="Security Compliance" 
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sapp-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyIndependentAudits;
