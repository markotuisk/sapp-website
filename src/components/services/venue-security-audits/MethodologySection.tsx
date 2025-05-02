
import React from 'react';
import { Shield, Users, Building, FileText } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { motion } from 'framer-motion';

const MethodologySection = () => {
  const methodologySteps = [
    {
      icon: <Building className="h-6 w-6 text-sapp-blue" />,
      title: 'Venue Analysis',
      description: 'Physical inspection of all entry/exit points, perimeters, and infrastructure vulnerabilities.'
    },
    {
      icon: <Users className="h-6 w-6 text-sapp-blue" />,
      title: 'Staff Procedures',
      description: 'Review of staff security protocols, background check processes, and training requirements.'
    },
    {
      icon: <Shield className="h-6 w-6 text-sapp-blue" />,
      title: 'Technical Review',
      description: 'Assess surveillance systems, access control measures, and electronic security implementations.'
    },
    {
      icon: <FileText className="h-6 w-6 text-sapp-blue" />,
      title: 'Recommendations',
      description: 'Detailed report with prioritized security enhancements and implementation guidance.'
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
        
        <div className="relative mt-20">
          {/* Timeline connector */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 transform -translate-x-1/2 hidden md:block"></div>
          
          {/* Methodology steps */}
          {methodologySteps.map((step, index) => (
            <div 
              key={index} 
              className={`relative z-10 mb-16 last:mb-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline dot for desktop */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex md:items-center md:justify-center">
                  <div className="w-10 h-10 bg-sapp-blue/10 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <div className="w-4 h-4 bg-sapp-blue rounded-full"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className={`bg-white rounded-xl shadow-md p-6 md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className={`flex items-center mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <div className="bg-sapp-blue/10 rounded-full p-2 mr-3 md:mr-0 md:ml-3 md:order-2">
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-sapp-dark">{step.title}</h3>
                  </div>
                  <p className="text-sapp-gray">{step.description}</p>
                </div>
                
                {/* Empty space for alignment */}
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
