
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Settings, Eye, Shield, FileCheck } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const ProcessTimelineSection: React.FC = () => {
  const phases = [
    {
      icon: Search,
      title: "Site Assessment",
      timeline: "2-4 weeks before",
      description: "Comprehensive venue evaluation and threat analysis",
      activities: [
        "Physical security assessment",
        "Network infrastructure review",
        "Risk assessment and planning",
        "Custom service selection"
      ]
    },
    {
      icon: Settings,
      title: "Setup & Deployment",
      timeline: "24-48 hours before",
      description: "Installation of monitoring systems and security infrastructure",
      activities: [
        "TSCM sweeping of venue",
        "Network setup and testing",
        "Personnel briefing and positioning",
        "System integration and testing"
      ]
    },
    {
      icon: Eye,
      title: "Active Monitoring",
      timeline: "During event",
      description: "Real-time surveillance and response coordination",
      activities: [
        "24/7 command center operation",
        "Device monitoring and control",
        "Incident response and management",
        "Continuous threat assessment"
      ]
    },
    {
      icon: Shield,
      title: "Incident Response",
      timeline: "As needed",
      description: "Rapid response to any security concerns or breaches",
      activities: [
        "Immediate threat neutralization",
        "Crisis communication management",
        "Stakeholder notification protocols",
        "Evidence preservation"
      ]
    },
    {
      icon: FileCheck,
      title: "Post-Event Security",
      timeline: "After event",
      description: "Secure cleanup and comprehensive reporting",
      activities: [
        "Document disposal and sanitization",
        "Equipment removal and storage",
        "Incident analysis and reporting",
        "Recommendations for future events"
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-emerald-500/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-emerald-600 tracking-wider">PROCESS TIMELINE</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            End-to-End Event Security Process
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Our systematic approach ensures comprehensive protection from initial planning 
            through post-event cleanup, with customized protocols for each phase.
          </p>
        </Animated>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-sapp-blue to-emerald-500 hidden lg:block"></div>

          <div className="space-y-12">
            {phases.map((phase, index) => {
              const PhaseIcon = phase.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-8`}
                >
                  <div className={`lg:w-1/2 ${isEven ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'} mb-6 lg:mb-0`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-sapp-blue/10 rounded-lg p-2">
                          <PhaseIcon className="h-5 w-5 text-sapp-blue" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sapp-dark">{phase.title}</h4>
                          <p className="text-xs text-emerald-600 font-medium">{phase.timeline}</p>
                        </div>
                      </div>
                      <p className="text-sapp-gray mb-4 text-sm">{phase.description}</p>
                      <div className="space-y-2">
                        {phase.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            <div className="w-1.5 h-1.5 bg-sapp-blue rounded-full flex-shrink-0"></div>
                            <span className="text-sapp-gray">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline node */}
                  <div className="relative lg:flex-shrink-0 hidden lg:block">
                    <div className="w-12 h-12 bg-white border-4 border-sapp-blue rounded-full flex items-center justify-center shadow-lg">
                      <PhaseIcon className="h-5 w-5 text-sapp-blue" />
                    </div>
                  </div>

                  <div className="lg:w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <Animated animation="fade-up" delay={500} className="text-center mt-12">
          <div className="bg-gradient-to-r from-emerald-500 to-sapp-blue rounded-xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Seamless Integration</h3>
            <p className="max-w-2xl mx-auto opacity-90">
              Our process is designed to integrate with your event planning timeline, 
              ensuring security measures enhance rather than hinder your event experience.
            </p>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default ProcessTimelineSection;
