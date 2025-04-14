
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Shield, FileText, Lock, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhyIndependentAudits = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      title: "Professional Competence",
      description: "Our audit teams are competent and experienced security professionals.",
      icon: Shield,
      delay: 100
    },
    {
      title: "Objective Assessment",
      description: "External teams deliver an objective evaluation of your information security status.",
      icon: FileText,
      delay: 200
    },
    {
      title: "Best Industry Practises",
      description: "Independent security audits deliver compliance with international best practises.",
      icon: FileCheck,
      delay: 300
    },
    {
      title: "Security Resilience",
      description: "Security audits objectively identify any gaps and improve your security posture.",
      icon: Lock,
      delay: 400
    }
  ];

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4 text-center">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Improve Your Security Resilience</h3>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6 text-center">
            Independent Audits Matter
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-lg text-sapp-gray mb-8">
                Comply with international best practises and objectively evaluate the state of play of the physical and information security processes and technology at your organisation.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 overflow-hidden transition-all duration-200 ease-in-out p-5",
                      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{ transitionDelay: inView ? `${feature.delay}ms` : '0ms' }}
                  >
                    <div className="bg-accent-teal/10 text-accent-dark-blue p-3 mb-3 inline-block rounded-md">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2 text-sapp-dark">{feature.title}</h3>
                    <p className="text-sm text-sapp-gray">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <img 
                src="/lovable-uploads/94d4676f-3535-4967-ab30-0ec0bbc3eeb3.png"
                alt="Compliance and Security Standards Diagram" 
                className="rounded-xl w-full h-auto object-cover shadow-md transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-[1.01]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyIndependentAudits;
