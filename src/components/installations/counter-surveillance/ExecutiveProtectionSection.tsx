
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Lock, Eye } from 'lucide-react';

const ExecutiveProtectionSection = () => {
  const protectionFeatures = [
    {
      icon: Shield,
      title: 'Personal Security Assessment',
      description: 'Comprehensive evaluation of individual risk profiles and vulnerabilities'
    },
    {
      icon: Users,
      title: 'Executive Team Protection',
      description: 'Coordinated security measures for senior leadership and key personnel'
    },
    {
      icon: Lock,
      title: 'Secure Communication',
      description: 'Encrypted channels and counter-surveillance communication protocols'
    },
    {
      icon: Eye,
      title: 'Threat Monitoring',
      description: 'Continuous surveillance detection and threat intelligence gathering'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-sapp-blue/10 rounded-full px-6 py-2 mb-6 border border-sapp-blue/20">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">EXECUTIVE FOCUS</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
              Protecting Leadership in the Modern Age
            </h2>
            <p className="text-xl text-sapp-gray max-w-3xl mx-auto">
              Senior executives face unique security challenges. Our tailored protection services 
              ensure your leadership team can operate with confidence and discretion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {protectionFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-sapp-blue to-cyan-500 rounded-full flex items-center justify-center mb-6">
                    <FeatureIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-sapp-dark mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sapp-gray">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveProtectionSection;
