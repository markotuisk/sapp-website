
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Animated } from '@/components/ui/AnimatedElements';
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type TestingType = 'red' | 'black' | 'white' | 'gray' | 'due';

const TypesSection: React.FC = () => {
  const [activeType, setActiveType] = useState<TestingType>('red');
  
  const types = [
    {
      id: 'red',
      name: 'Red Team',
      icon: <AlertTriangle className="h-5 w-5" />,
      description: 'Comprehensive, real-world threat simulation with multiple attack vectors',
      useCase: 'Thorough security evaluation for mature security programs',
      color: 'bg-red-500',
      textColor: 'text-red-500',
      hoverColor: 'hover:bg-red-500/10'
    },
    {
      id: 'black',
      name: 'Black Box',
      icon: <EyeOff className="h-5 w-5" />,
      description: 'Testing with minimal information, simulating an external attacker',
      useCase: 'Realistic adversary testing with no prior knowledge',
      color: 'bg-slate-800',
      textColor: 'text-slate-800',
      hoverColor: 'hover:bg-slate-500/10'
    },
    {
      id: 'white',
      name: 'White Box',
      icon: <Eye className="h-5 w-5" />,
      description: 'Full information assessment for detailed vulnerability discovery',
      useCase: 'Comprehensive testing to identify all known vulnerabilities',
      color: 'bg-slate-300',
      textColor: 'text-slate-800',
      hoverColor: 'hover:bg-slate-300/10'
    },
    {
      id: 'gray',
      name: 'Gray Box',
      icon: <Shield className="h-5 w-5" />,
      description: 'Limited information testing balancing speed and authenticity',
      useCase: 'Realistic testing with constrained resources or timeframes',
      color: 'bg-slate-500',
      textColor: 'text-slate-600',
      hoverColor: 'hover:bg-slate-400/10'
    },
    {
      id: 'due',
      name: 'Due Diligence',
      icon: <CheckCircle2 className="h-5 w-5" />,
      description: 'Authorized walkthrough assessment without full penetration testing',
      useCase: 'Quick vulnerability assessment for compliance or pre-acquisition',
      color: 'bg-green-500',
      textColor: 'text-green-600',
      hoverColor: 'hover:bg-green-500/10'
    }
  ];
  
  const activeTypeData = types.find(t => t.id === activeType) || types[0];
  
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up">
          <div className="text-center mb-12">
            <h3 className="uppercase text-sapp-blue text-sm font-medium tracking-wider mb-2">Tailored Solutions</h3>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">Types of Testing</h2>
            <p className="text-sapp-gray max-w-2xl mx-auto">
              We offer different testing approaches based on your organization's specific needs, security maturity, and objectives.
            </p>
          </div>
        </Animated>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mt-12">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Animated animation="fade-up" delay={200}>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activeTypeData.color} bg-opacity-20 mb-4`}>
                  {activeTypeData.icon}
                </div>
                <h3 className="text-2xl font-semibold text-sapp-dark mb-3">{activeTypeData.name}</h3>
                <p className="text-sapp-gray mb-4">{activeTypeData.description}</p>
                
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-sapp-blue uppercase mb-2">Best For</h4>
                  <p className="text-sapp-gray">{activeTypeData.useCase}</p>
                </div>
                
                <motion.div 
                  className="mt-8 pt-6 border-t border-gray-100"
                  key={activeType}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-sm font-semibold text-sapp-dark mb-2">Key Features</h4>
                  <ul className="space-y-2">
                    {activeType === 'red' && (
                      <>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Multi-vector attack simulation
                        </li>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Objective-based testing
                        </li>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Advanced social engineering
                        </li>
                      </>
                    )}
                    {activeType === 'black' && (
                      <>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> No prior information provided
                        </li>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Realistic attack simulation
                        </li>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> True security posture assessment
                        </li>
                      </>
                    )}
                    {activeType === 'white' && (
                      <>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Complete information disclosure
                        </li>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Thorough security review
                        </li>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Detailed vulnerability mapping
                        </li>
                      </>
                    )}
                    {activeType === 'gray' && (
                      <>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Partial information provided
                        </li>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Balanced approach to testing
                        </li>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Efficient resource utilization
                        </li>
                      </>
                    )}
                    {activeType === 'due' && (
                      <>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Non-intrusive assessment
                        </li>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Compliance-focused review
                        </li>
                        <li className="flex items-center gap-2 text-sm text-sapp-gray">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Quick security snapshot
                        </li>
                      </>
                    )}
                  </ul>
                </motion.div>
              </div>
            </Animated>
          </div>
          
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Animated animation="fade-up" delay={100}>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {types.map((type) => (
                    <motion.button
                      key={type.id}
                      className={cn(
                        "p-4 rounded-lg flex flex-col items-center text-center transition-all",
                        activeType === type.id
                          ? `${type.color} bg-opacity-10 border border-${type.color} border-opacity-30`
                          : "bg-white border border-gray-100 hover:border-gray-200",
                        type.hoverColor
                      )}
                      whileHover={{ y: -2 }}
                      onClick={() => setActiveType(type.id as TestingType)}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                        activeType === type.id ? `${type.color} bg-opacity-20` : "bg-slate-100"
                      )}>
                        <span className={activeType === type.id ? "text-white" : type.textColor}>
                          {type.icon}
                        </span>
                      </div>
                      <span className={cn(
                        "text-sm font-medium",
                        activeType === type.id ? type.textColor : "text-sapp-dark"
                      )}>
                        {type.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-slate-50 to-white p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-sapp-dark mb-3">How to Choose the Right Testing Type</h3>
                  <p className="text-sapp-gray mb-4">
                    The selection of testing type should align with your organization's security maturity, regulatory requirements, and specific security objectives.
                  </p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sapp-blue/10 rounded-full flex items-center justify-center shrink-0">
                        <Shield className="h-5 w-5 text-sapp-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sapp-dark">Security Maturity</h4>
                        <p className="text-sm text-sapp-gray">Organizations with mature security programs benefit most from Red Team and Black Box testing</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sapp-blue/10 rounded-full flex items-center justify-center shrink-0">
                        <AlertTriangle className="h-5 w-5 text-sapp-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sapp-dark">Risk Assessment</h4>
                        <p className="text-sm text-sapp-gray">High-risk environments require more comprehensive testing approaches</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Animated>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypesSection;
