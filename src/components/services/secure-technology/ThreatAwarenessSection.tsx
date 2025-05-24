
import React from 'react';
import { Shield, Wifi, Radio, FileText, AlertTriangle } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { motion } from 'framer-motion';

const ThreatAwarenessSection: React.FC = () => {
  const threats = [
    {
      icon: Radio,
      title: "Intercepted Communications",
      description: "Unencrypted radios and calls can be easily monitored by anyone with basic equipment",
      impact: "Operational plans and sensitive discussions exposed to competitors or bad actors"
    },
    {
      icon: Wifi,
      title: "Unsecured Networks",
      description: "Public WiFi and unencrypted networks expose all data transmitted during events",
      impact: "Attendee data, payment information, and confidential files at risk of theft"
    },
    {
      icon: FileText,
      title: "Document Vulnerabilities",
      description: "Physical and digital files left unsecured can be accessed by unauthorized personnel",
      impact: "Strategic plans, attendee lists, and operational details compromised"
    },
    {
      icon: AlertTriangle,
      title: "Surveillance Devices",
      description: "Hidden recording devices can capture private conversations and confidential information",
      impact: "Complete breach of privacy and potential blackmail or competitive disadvantage"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-100 to-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-orange-500/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-orange-600 tracking-wider">COMMUNICATION VULNERABILITIES</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Understanding Communication Security Risks
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Every event generates valuable information that requires protection. 
            Understanding these vulnerabilities is essential for choosing the right security approach.
          </p>
        </Animated>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {threats.map((threat, index) => {
            const ThreatIcon = threat.icon;
            return (
              <Animated key={index} animation="fade-up" delay={100 * (index + 1)}>
                <motion.div 
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-sapp-blue/10 rounded-lg p-3 flex-shrink-0">
                      <ThreatIcon className="h-6 w-6 text-sapp-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sapp-dark mb-2">{threat.title}</h4>
                      <p className="text-sapp-gray mb-3 text-sm">{threat.description}</p>
                      <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-400">
                        <p className="text-amber-700 text-xs font-medium">Risk: {threat.impact}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Animated>
            );
          })}
        </div>

        <Animated animation="fade-up" delay={500} className="text-center">
          <div className="bg-gradient-to-r from-sapp-blue to-accent-dark-blue rounded-xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-6">The Reality of Communication Security Breaches</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-yellow-300">£3.5M</div>
                <p className="text-sm opacity-90">average cost of a data breach in the UK</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-yellow-300">72%</div>
                <p className="text-sm opacity-90">of events use unsecured communications</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-yellow-300">24 hours</div>
                <p className="text-sm opacity-90">average time for information to reach competitors</p>
              </motion.div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default ThreatAwarenessSection;
