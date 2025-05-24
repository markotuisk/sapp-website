
import React, { useState } from 'react';
import { Wifi, Radio, Trash2, Search, Shield, Truck, Users } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceDetailsSection: React.FC = () => {
  const [activeService, setActiveService] = useState('networks');

  const services = [
    {
      id: 'networks',
      title: 'Temporary Secure Networks',
      icon: Wifi,
      description: 'Encrypted WiFi and Ethernet networks deployed specifically for your event',
      features: [
        'End-to-end AES-256 encryption',
        'Isolated from public networks',
        'Real-time monitoring and threat detection',
        'Scalable bandwidth based on attendee count',
        'Guest network options with controlled access'
      ],
      benefits: 'Ensures all digital communications and transactions remain secure and private',
      implementation: 'Set up 24-48 hours before event, monitored throughout, removed after completion'
    },
    {
      id: 'radios',
      title: 'Encrypted Radio Communications',
      icon: Radio,
      description: 'Secure two-way radios for crystal-clear staff coordination',
      features: [
        'Military-grade encryption protocols',
        'Noise cancellation for clear audio',
        'Extended battery life (12+ hours)',
        'Weather-resistant design',
        'Emergency alert capabilities'
      ],
      benefits: 'Enables private coordination across large venues without risk of interception',
      implementation: 'Pre-programmed radios delivered on event day with staff training included'
    },
    {
      id: 'files',
      title: 'Secure File Handling',
      icon: Trash2,
      description: 'Complete protection for both physical and digital documents',
      features: [
        'On-site document shredding',
        'Encrypted digital file transfers',
        'Secure USB drives with auto-encryption',
        'Controlled access cloud storage',
        'Certificate of destruction provided'
      ],
      benefits: 'Prevents sensitive information from falling into wrong hands during or after events',
      implementation: 'Portable shredders and secure transfer protocols deployed as needed'
    },
    {
      id: 'auditing',
      title: 'Equipment Security Auditing',
      icon: Search,
      description: 'Comprehensive assessment of your existing communication equipment',
      features: [
        'Encryption standard verification',
        'Vulnerability assessment',
        'Compliance checks (GDPR, HIPAA)',
        'Upgrade recommendations',
        'Security certification'
      ],
      benefits: 'Ensures your current equipment meets security standards and identifies gaps',
      implementation: 'Pre-event audit with detailed report and recommendations provided'
    },
    {
      id: 'tscm',
      title: 'Technical Surveillance Counter Measures',
      icon: Shield,
      description: 'Professional sweeps to detect and neutralize hidden surveillance devices',
      features: [
        'RF signal detection',
        'Hidden camera identification',
        'Audio surveillance detection',
        'Continuous monitoring options',
        'Immediate threat neutralization'
      ],
      benefits: 'Guarantees privacy by eliminating unauthorized recording or listening devices',
      implementation: 'Sweeps conducted before and during events by certified specialists'
    },
    {
      id: 'collection',
      title: 'Post-Event Equipment Collection',
      icon: Truck,
      description: 'Secure removal and disposal of all temporary equipment and materials',
      features: [
        'Complete equipment retrieval',
        'Secure data wiping',
        'Physical destruction of sensitive materials',
        'Chain of custody documentation',
        'Environmental disposal compliance'
      ],
      benefits: 'Ensures no sensitive information or equipment is left behind after your event',
      implementation: 'Coordinated collection within 24 hours of event conclusion'
    },
    {
      id: 'protection',
      title: 'Close Protection Integration',
      icon: Users,
      description: 'Elite security personnel for high-risk events and VIP protection',
      features: [
        'Ex-military trained personnel',
        'Threat assessment and planning',
        'Coordination with communication systems',
        'Emergency response protocols',
        'Discrete professional presence'
      ],
      benefits: 'Provides physical security that integrates seamlessly with communication security',
      implementation: 'Security team briefed and deployed based on threat assessment'
    }
  ];

  const activeServiceData = services.find(s => s.id === activeService) || services[0];
  const ServiceIcon = activeServiceData.icon;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">OUR SERVICES</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Comprehensive Communication Protection
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Seven specialized services that work together to create an impenetrable communication security framework for your event.
          </p>
        </Animated>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {services.map((service) => {
                const Icon = service.icon;
                const isActive = activeService === service.id;
                
                return (
                  <motion.button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-sapp-blue text-white shadow-lg' 
                        : 'bg-slate-50 hover:bg-slate-100 text-sapp-dark'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-sapp-blue'}`} />
                      <span className="font-medium text-sm">{service.title}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Service Details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 rounded-xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-sapp-blue/10 rounded-lg p-3">
                    <ServiceIcon className="h-8 w-8 text-sapp-blue" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-sapp-dark">{activeServiceData.title}</h3>
                    <p className="text-sapp-gray">{activeServiceData.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-sapp-dark mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {activeServiceData.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-sapp-blue text-sm mt-1">•</span>
                          <span className="text-sm text-sapp-gray">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sapp-dark mb-2">Benefits</h4>
                      <p className="text-sm text-sapp-gray">{activeServiceData.benefits}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sapp-dark mb-2">Implementation</h4>
                      <p className="text-sm text-sapp-gray">{activeServiceData.implementation}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsSection;
