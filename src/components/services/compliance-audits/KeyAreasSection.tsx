
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Eye, Zap, Server, Package, ChevronDown, CheckCircle } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { Card } from '@/components/ui/card';

const KeyAreasSection: React.FC = () => {
  const [activeControl, setActiveControl] = useState<string | null>(null);

  const controlAreas = [
    {
      id: 'A.11.1.1',
      name: 'Physical Security Perimeter',
      description: 'Ensures secure boundaries to prevent unauthorized access, damage, or interference.',
      icon: Shield,
      details: 'Verifying defined perimeters (e.g., site boundaries, building transitions) and their security measures.',
      color: 'emerald'
    },
    {
      id: 'A.11.1.2',
      name: 'Physical Entry Controls',
      description: 'Protects secure areas with entry controls for authorized personnel only.',
      icon: Lock,
      details: 'Checking authentication methods (e.g., biometrics, keys) and monitoring processes.',
      color: 'blue'
    },
    {
      id: 'A.11.1.3',
      name: 'Securing Offices & Facilities',
      description: 'Ensures security of internal spaces with regular reviews.',
      icon: Eye,
      details: 'Assessing visibility, access updates, visitor policies, and shared space protections.',
      color: 'purple'
    },
    {
      id: 'A.11.1.4',
      name: 'Environmental Threat Protection',
      description: 'Prevents damage from natural disasters, malicious attacks, or accidents.',
      icon: Zap,
      details: 'Reviewing risk assessments and mitigation measures for floods, fires, or attacks.',
      color: 'orange'
    },
    {
      id: 'A.11.2.1',
      name: 'Equipment Siting & Protection',
      description: 'Positions equipment to reduce environmental and access risks.',
      icon: Server,
      details: 'Checking equipment placement, accessibility, and secure storage.',
      color: 'indigo'
    },
    {
      id: 'A.11.2.5',
      name: 'Asset Removal Controls',
      description: 'Manages off-site equipment and information security.',
      icon: Package,
      details: 'Verifying check-in/out processes and risk-based policies.',
      color: 'pink'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-200',
      blue: 'bg-blue-500/10 text-blue-500 border-blue-200',
      purple: 'bg-purple-500/10 text-purple-500 border-purple-200',
      orange: 'bg-orange-500/10 text-orange-500 border-orange-200',
      indigo: 'bg-indigo-500/10 text-indigo-500 border-indigo-200',
      pink: 'bg-pink-500/10 text-pink-500 border-pink-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">ISO 27001 ANNEX A.11</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Key Control Areas We Assess
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Our comprehensive audits cover all aspects of physical and environmental security 
            as outlined in ISO 27001 Annex A.11, ensuring complete compliance coverage.
          </p>
        </Animated>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {controlAreas.map((control, index) => (
            <motion.div
              key={control.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activeControl === control.id ? 'ring-2 ring-sapp-blue/20 shadow-lg' : ''
                }`}
                onClick={() => setActiveControl(activeControl === control.id ? null : control.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`rounded-full p-3 ${getColorClasses(control.color)}`}>
                      <control.icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-sapp-gray bg-white rounded px-2 py-1">
                        {control.id}
                      </span>
                      <motion.div
                        animate={{ rotate: activeControl === control.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4 text-sapp-gray" />
                      </motion.div>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-sapp-dark mb-2">{control.name}</h3>
                  <p className="text-sm text-sapp-gray mb-4">{control.description}</p>
                  
                  <AnimatePresence>
                    {activeControl === control.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 pt-4"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-sapp-dark text-sm mb-1">Audit Focus:</h4>
                            <p className="text-sm text-sapp-gray">{control.details}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Animated animation="fade-up" delay={600}>
          <div className="bg-gradient-to-r from-sapp-blue/5 to-emerald-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-sapp-dark mb-4">
              Comprehensive Coverage Across All Control Areas
            </h3>
            <p className="text-sapp-gray mb-6 max-w-2xl mx-auto">
              Our auditors examine each control area systematically, ensuring your organization 
              meets all requirements for ISO 27001 physical security compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-sapp-dark">Policy Review</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-sapp-dark">Physical Inspection</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-sapp-dark">Documentation Assessment</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-sapp-dark">Staff Interviews</span>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default KeyAreasSection;
