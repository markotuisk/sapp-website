
import React from 'react';
import { Shield, Users, Building, FileText, CheckCircle } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const MethodologySection = () => {
  const methodologySteps = [
    {
      icon: <Building className="h-6 w-6 text-white" />,
      title: 'Venue Analysis',
      description: 'Physical inspection of all entry/exit points, perimeters, and infrastructure vulnerabilities.',
      color: 'bg-sapp-blue',
      delay: 0.1
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: 'Staff Procedures',
      description: 'Review of staff security protocols, background check processes, and training requirements.',
      color: 'bg-accent-dark-blue',
      delay: 0.2
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: 'Technical Review',
      description: 'Assess surveillance systems, access control measures, and electronic security implementations.',
      color: 'bg-sapp-dark',
      delay: 0.3
    },
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      title: 'Recommendations',
      description: 'Detailed report with prioritized security enhancements and implementation guidance.',
      color: 'bg-sapp-blue',
      delay: 0.4
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up">
          <div className="text-center mb-12">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Methodology</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              Comprehensive Security Assessment Process
            </h2>
            <p className="text-sapp-gray max-w-3xl mx-auto">
              We employ a systematic approach to venue security audits, ensuring that every potential vulnerability is identified and addressed before your event.
            </p>
          </div>
        </Animated>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 relative">
          {/* Connecting line (only visible on desktop) */}
          <div className="hidden md:block absolute left-1/2 top-1/4 bottom-1/4 w-0.5 bg-slate-200 transform -translate-x-1/2"></div>
          
          {/* Methodology steps */}
          {methodologySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.delay }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "flex",
                index % 2 === 0 ? "md:pr-8 md:text-right md:justify-end" : "md:pl-8"
              )}
            >
              <div className="bg-white shadow-lg rounded-xl border border-slate-100 overflow-hidden flex flex-col w-full max-w-md">
                <div className={`${step.color} p-5`}>
                  <div className="flex items-center justify-between">
                    <div className="bg-white/20 rounded-full p-3">
                      {step.icon}
                    </div>
                    <div className="bg-white/10 rounded-full px-3 py-1">
                      <span className="text-white font-medium">Step {index + 1}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-sapp-dark mb-3">{step.title}</h3>
                  <p className="text-sapp-gray">{step.description}</p>
                  
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-sapp-gray">Comprehensive Documentation</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Circle connector for desktop */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                <div className={cn(
                  "w-6 h-6 rounded-full border-4 border-white flex items-center justify-center",
                  step.color
                )}>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center px-6 py-3 bg-sapp-blue/10 rounded-full">
            <Shield className="h-5 w-5 text-sapp-blue mr-2" />
            <span className="text-sapp-blue font-medium">ISO 27001 Compliant Methodology</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodologySection;
