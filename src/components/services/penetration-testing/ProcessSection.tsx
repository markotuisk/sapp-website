
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Animated } from '@/components/ui/AnimatedElements';
import { Briefcase, List, Target, FileText, CheckCheck, ArrowRight, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const processSteps = [
  {
    id: 1,
    icon: <Briefcase />,
    title: 'Scoping & Planning',
    description: 'We work with you to define the scope, objectives, and rules of engagement for the test, ensuring alignment with your security goals.',
    details: [
      'Define testing boundaries and limitations',
      'Establish communication protocols',
      'Create emergency contact procedures',
      'Sign necessary legal agreements'
    ]
  },
  {
    id: 2,
    icon: <List />,
    title: 'Reconnaissance',
    description: 'Our team gathers information about your physical security infrastructure, identifying potential entry points and vulnerabilities.',
    details: [
      'Analyze publicly available information',
      'Review security documentation if provided',
      'Identify potential entry points',
      'Map out security systems and personnel'
    ]
  },
  {
    id: 3,
    icon: <Target />,
    title: 'Testing Execution',
    description: 'We conduct the agreed-upon testing activities, attempting to breach physical security controls while documenting all findings.',
    details: [
      'Execute social engineering tactics',
      'Test physical barriers and access controls',
      'Attempt to bypass surveillance systems',
      'Document all successful and failed attempts'
    ]
  },
  {
    id: 4,
    icon: <FileText />,
    title: 'Analysis & Reporting',
    description: 'Our security experts analyze the test results and prepare a comprehensive report with detailed findings and recommendations.',
    details: [
      'Categorize vulnerabilities by severity',
      'Document successful breach methods',
      'Provide evidence of vulnerabilities',
      'Develop practical remediation strategies'
    ]
  },
  {
    id: 5,
    icon: <CheckCheck />,
    title: 'Remediation Support',
    description: 'We provide guidance and support to help you address the identified vulnerabilities and strengthen your security posture.',
    details: [
      'Prioritize security improvements',
      'Consult on implementing countermeasures',
      'Recommend policy and procedure updates',
      'Optional follow-up testing to verify fixes'
    ]
  }
];

const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up">
          <div className="text-center mb-12">
            <h3 className="uppercase text-sapp-blue text-sm font-medium tracking-wider mb-2">Our Methodology</h3>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
              The Testing Process
            </h2>
            <p className="text-sapp-gray max-w-2xl mx-auto">
              We follow a structured, transparent methodology to deliver maximum value while minimizing risk.
            </p>
          </div>
        </Animated>
        
        {/* Desktop Process Steps */}
        <div className="hidden md:block mb-16">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            
            {processSteps.map((step) => (
              <motion.button
                key={step.id}
                className="relative z-10 flex flex-col items-center"
                onClick={() => setActiveStep(step.id)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-all",
                    activeStep === step.id 
                      ? "bg-sapp-blue text-white shadow-lg shadow-sapp-blue/30" 
                      : "bg-slate-100 text-sapp-gray hover:bg-slate-200"
                  )}
                >
                  {step.icon}
                </div>
                <span 
                  className={cn(
                    "text-sm font-medium text-center",
                    activeStep === step.id ? "text-sapp-blue" : "text-sapp-gray"
                  )}
                >
                  {step.title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Mobile Process Steps */}
        <div className="flex md:hidden overflow-x-auto pb-4 mb-6 gap-4 scrollbar-hide">
          {processSteps.map((step) => (
            <button
              key={step.id}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all",
                activeStep === step.id 
                  ? "bg-sapp-blue text-white shadow-md" 
                  : "bg-slate-100 text-sapp-gray"
              )}
              onClick={() => setActiveStep(step.id)}
            >
              {step.title}
            </button>
          ))}
        </div>
        
        {/* Step Content */}
        <div className="bg-slate-50 rounded-xl p-6 lg:p-8 border border-gray-100">
          {processSteps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: activeStep === step.id ? 1 : 0,
                y: activeStep === step.id ? 0 : 20,
                display: activeStep === step.id ? "block" : "none"
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-sapp-blue/10 rounded-full flex items-center justify-center text-sapp-blue">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-sapp-dark">
                      Phase {step.id}: {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-sapp-gray mb-6">
                    {step.description}
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-sapp-dark mb-3">Key Components</h4>
                    <ul className="space-y-2">
                      {step.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-sapp-gray">
                          <ArrowRight className="h-4 w-4 mt-0.5 text-sapp-blue flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                  {step.id === 1 && (
                    <div>
                      <h4 className="font-medium text-sapp-dark mb-4">Sample Scoping Document</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-50 rounded border border-gray-100">
                          <h5 className="text-sm font-medium text-sapp-dark">Objectives</h5>
                          <p className="text-xs text-sapp-gray">Identify physical access vulnerabilities to server rooms</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-gray-100">
                          <h5 className="text-sm font-medium text-sapp-dark">Scope Boundaries</h5>
                          <p className="text-xs text-sapp-gray">Building A, floors 3-5, during business hours</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-gray-100">
                          <h5 className="text-sm font-medium text-sapp-dark">Out of Scope</h5>
                          <p className="text-xs text-sapp-gray">No disruption to production systems or alarms</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {step.id === 2 && (
                    <div>
                      <h4 className="font-medium text-sapp-dark mb-4">Reconnaissance Elements</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-50 rounded border border-gray-100">
                          <h5 className="text-sm font-medium text-sapp-dark">Access Points</h5>
                          <p className="text-xs text-sapp-gray">Doors, windows, loading bays</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-gray-100">
                          <h5 className="text-sm font-medium text-sapp-dark">Security Systems</h5>
                          <p className="text-xs text-sapp-gray">CCTV, access controls, alarms</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-gray-100">
                          <h5 className="text-sm font-medium text-sapp-dark">Personnel Patterns</h5>
                          <p className="text-xs text-sapp-gray">Shift changes, security rounds</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-gray-100">
                          <h5 className="text-sm font-medium text-sapp-dark">Publicly Available Info</h5>
                          <p className="text-xs text-sapp-gray">Building layouts, staff directories</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {step.id === 3 && (
                    <div>
                      <h4 className="font-medium text-sapp-dark mb-4">Testing Activities</h4>
                      <div className="flex flex-col gap-3">
                        <div className="p-3 bg-slate-50 rounded border border-gray-100 flex items-start gap-2">
                          <CheckCheck className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-sapp-dark">Tailgating Attempts</h5>
                            <p className="text-xs text-sapp-gray">Following authorized personnel through secure doors</p>
                          </div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-gray-100 flex items-start gap-2">
                          <CheckCheck className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-sapp-dark">Social Engineering</h5>
                            <p className="text-xs text-sapp-gray">Impersonating staff, vendors, or visitors</p>
                          </div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-gray-100 flex items-start gap-2">
                          <CheckCheck className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-sapp-dark">Access Control Testing</h5>
                            <p className="text-xs text-sapp-gray">Testing for bypass vulnerabilities in card readers</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {step.id === 4 && (
                    <div>
                      <h4 className="font-medium text-sapp-dark mb-4">Sample Report Elements</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-50 rounded border border-gray-100">
                          <h5 className="text-sm font-medium text-sapp-dark">Executive Summary</h5>
                          <p className="text-xs text-sapp-gray">High-level overview for management</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-gray-100">
                          <h5 className="text-sm font-medium text-sapp-dark">Technical Findings</h5>
                          <p className="text-xs text-sapp-gray">Detailed vulnerability documentation with evidence</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-gray-100">
                          <h5 className="text-sm font-medium text-sapp-dark">Risk Assessment</h5>
                          <p className="text-xs text-sapp-gray">Rating vulnerabilities by impact and likelihood</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-gray-100">
                          <h5 className="text-sm font-medium text-sapp-dark">Remediation Plan</h5>
                          <p className="text-xs text-sapp-gray">Prioritized recommendations with implementation guidance</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {step.id === 5 && (
                    <div>
                      <h4 className="font-medium text-sapp-dark mb-4">Remediation Support Services</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-50 rounded border border-gray-100 flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-sapp-blue mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-sapp-dark">Detailed Recommendations</h5>
                            <p className="text-xs text-sapp-gray">Specific actionable steps to address each vulnerability</p>
                          </div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-gray-100 flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-sapp-blue mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-sapp-dark">Implementation Consulting</h5>
                            <p className="text-xs text-sapp-gray">Expert guidance during the remediation phase</p>
                          </div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-gray-100 flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-sapp-blue mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-sapp-dark">Follow-up Testing</h5>
                            <p className="text-xs text-sapp-gray">Validation that remediation efforts are effective</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button 
                  className="text-sapp-blue flex items-center gap-1 text-sm font-medium hover:underline disabled:opacity-50 disabled:no-underline"
                  onClick={() => setActiveStep(prev => Math.max(prev - 1, 1))}
                  disabled={activeStep === 1}
                >
                  <ArrowDown className="h-4 w-4 rotate-90" /> Previous Step
                </button>
                
                <button 
                  className="text-sapp-blue flex items-center gap-1 text-sm font-medium hover:underline disabled:opacity-50 disabled:no-underline"
                  onClick={() => setActiveStep(prev => Math.min(prev + 1, processSteps.length))}
                  disabled={activeStep === processSteps.length}
                >
                  Next Step <ArrowDown className="h-4 w-4 -rotate-90" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
