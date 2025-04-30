
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { FileText, Search, Lock, ChartBar } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: <FileText className="h-8 w-8 text-white" />,
      step: 1,
      title: "Initial Consultation",
      description: "We discuss your concerns and assess potential risks in a secure setting. This helps us understand your specific needs and tailor our approach.",
      image: "assessment-planning"
    },
    {
      icon: <Search className="h-8 w-8 text-white" />,
      step: 2,
      title: "Technical Sweep",
      description: "Our engineers conduct a thorough inspection using specialized equipment to detect electronic surveillance devices, wireless transmitters, and other threats.",
      image: "thorough-inspection"
    },
    {
      icon: <ChartBar className="h-8 w-8 text-white" />,
      step: 3,
      title: "Analysis & Verification",
      description: "We analyze all findings, validate potential threats, and document evidence of surveillance when discovered.",
      image: "detailed-analysis"
    },
    {
      icon: <Lock className="h-8 w-8 text-white" />,
      step: 4,
      title: "Comprehensive Reporting",
      description: "Receive a detailed report with findings, recommendations, and ongoing security measures to protect against future threats.",
      image: "secure-reporting"
    }
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
            Our TSCM Process
          </h2>
          <p className="text-lg text-sapp-gray">
            A systematic approach to identifying and neutralizing surveillance threats
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={cn(
                  "bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-700 transform",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="h-2 bg-gradient-to-r from-sapp-blue to-accent-dark-blue"></div>
                <div className="p-7">
                  <div className="flex items-center mb-5">
                    <div className="w-12 h-12 bg-sapp-blue rounded-lg flex items-center justify-center mr-4 shadow-lg">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-display font-semibold text-sapp-dark">
                      <span className="text-sapp-blue mr-2">{step.step}.</span> {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-sapp-gray mb-6">
                    {step.description}
                  </p>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-32 rounded-lg flex items-center justify-center">
                    <div className="text-center opacity-60">
                      <span className="text-4xl mb-2 block">{step.step === 1 ? '📋' : step.step === 2 ? '🔍' : step.step === 3 ? '🔬' : '📊'}</span>
                      <span className="text-sm font-medium text-sapp-gray">{step.image.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
