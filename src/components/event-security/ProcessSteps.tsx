
import React from 'react';
import { cn } from '@/lib/utils';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  delay: number;
}

interface ProcessStepsProps {
  inView: boolean;
  steps: ProcessStep[];
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ inView, steps }) => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-sapp-dark mb-12 text-center">
          Our Event Security Process
        </h2>
        
        <div className="flex flex-col md:flex-row justify-between flex-wrap gap-y-6 relative">
          {/* Background connector line */}
          <div className="absolute top-12 left-14 right-14 h-1 bg-gradient-to-r from-sapp-blue/20 via-sapp-blue to-sapp-blue/20 hidden md:block"></div>
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white p-6 rounded-lg shadow-md border border-gray-100 w-full md:w-[calc(20%-1rem)] relative z-10 transition-all duration-700 hover:shadow-lg hover:-translate-y-1",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: inView ? `${step.delay}ms` : '0ms' }}
            >
              <div className="w-12 h-12 bg-sapp-blue text-white rounded-full flex items-center justify-center font-display font-bold mb-4 mx-auto">
                {step.number}
              </div>
              <h3 className="font-display font-semibold text-center mb-2">{step.title}</h3>
              <p className="text-sm text-sapp-gray text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
