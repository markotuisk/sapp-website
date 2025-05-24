
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Radio, Zap } from 'lucide-react';

const TechnologyDeepDive = () => {
  const technologies = [
    {
      icon: Radio,
      title: 'RF Spectrum Analysis',
      description: 'Advanced radio frequency detection covering 1MHz to 12GHz spectrum',
      technical: 'Real-time spectrum analysis with -140dBm sensitivity'
    },
    {
      icon: Wifi,
      title: 'Digital Signal Processing',
      description: 'AI-powered signal classification and threat identification',
      technical: 'Machine learning algorithms for pattern recognition'
    },
    {
      icon: Cpu,
      title: 'Acoustic Analysis',
      description: 'Ultrasonic and infrasonic detection capabilities',
      technical: 'Frequency range: 0.1Hz to 100kHz with 0.1dB resolution'
    },
    {
      icon: Zap,
      title: 'Thermal Imaging',
      description: 'Heat signature detection for concealed electronic devices',
      technical: 'FLIR thermal sensors with 0.02°C sensitivity'
    }
  ];

  return (
    <section className="py-20 bg-sapp-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-white/10 rounded-full px-6 py-2 mb-6 border border-white/20">
              <h3 className="text-sm font-medium text-white tracking-wider">TECHNOLOGY</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Advanced Detection Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Military-grade detection equipment and proprietary analysis software 
              ensure no surveillance device goes undetected.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => {
              const TechIcon = tech.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-6">
                    <TechIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    {tech.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {tech.description}
                  </p>
                  <div className="text-sm text-cyan-400 font-mono">
                    {tech.technical}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyDeepDive;
