
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Wifi, Bluetooth, Camera, Mic, Shield, Smartphone, Monitor } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ThreatLandscapeSection = () => {
  const [selectedThreat, setSelectedThreat] = useState(0);

  const threats = [
    {
      icon: Mic,
      title: 'Audio Surveillance',
      description: 'Hidden microphones and recording devices',
      details: 'Modern audio bugs are smaller than a coin and can transmit for months. They can be hidden in everyday objects, walls, or furniture.',
      impact: 'Board meetings, strategy discussions, and confidential calls are at risk',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Camera,
      title: 'Visual Monitoring',
      description: 'Covert cameras and visual recording systems',
      details: 'Pinhole cameras, modified objects, and remote viewing systems can capture visual information without detection.',
      impact: 'Document theft, gesture analysis, and visual intelligence gathering',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Radio,
      title: 'RF Surveillance',
      description: 'Wireless signal interception and monitoring',
      details: 'Radio frequency monitoring can intercept wireless communications, track devices, and detect electronic signatures.',
      impact: 'Communication interception, device tracking, and electronic profiling',
      color: 'from-purple-500 to-blue-500'
    },
    {
      icon: Smartphone,
      title: 'Digital Intrusion',
      description: 'Smartphone and device compromise',
      details: 'Mobile devices can be remotely activated to record audio/video, track location, and access sensitive data.',
      impact: 'Complete privacy breach through personal devices',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const statisticsData = [
    { 
      number: '£21bn', 
      text: 'Corporate espionage costs UK businesses annually' 
    },
    { 
      number: '67%', 
      text: 'of executives have been targeted by surveillance' 
    },
    { 
      number: '127', 
      text: 'Average detection time for corporate bugs (days)' 
    },
    { 
      number: '15+', 
      text: 'new surveillance vectors per smart office' 
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-red-500/10 rounded-full px-6 py-2 mb-6 border border-red-500/20">
              <h3 className="text-sm font-medium text-red-600 tracking-wider">THREAT ANALYSIS</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
              The Invisible War on Privacy
            </h2>
            <p className="text-xl text-sapp-gray max-w-3xl mx-auto">
              Every day, sophisticated surveillance technologies become more accessible, affordable, and undetectable. 
              Understanding these threats is the first step to protecting yourself.
            </p>
          </motion.div>

          {/* Threat Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {statisticsData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-2xl font-bold text-red-600 mb-2">
                  {item.number}
                </div>
                <p className="text-sm text-sapp-gray">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Interactive Threat Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {threats.map((threat, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedThreat === index 
                      ? 'bg-gradient-to-r ' + threat.color + ' text-white shadow-xl scale-105' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedThreat(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <threat.icon className={`h-8 w-8 ${selectedThreat === index ? 'text-white' : 'text-sapp-blue'}`} />
                    <div>
                      <h3 className={`text-lg font-semibold ${selectedThreat === index ? 'text-white' : 'text-sapp-dark'}`}>
                        {threat.title}
                      </h3>
                      <p className={`text-sm ${selectedThreat === index ? 'text-white/90' : 'text-sapp-gray'}`}>
                        {threat.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              key={selectedThreat}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${threats[selectedThreat].color} flex items-center justify-center mb-6`}>
                <threats[selectedThreat].icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-sapp-dark mb-4">
                {threats[selectedThreat].title}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sapp-dark mb-2">How it works:</h4>
                  <p className="text-sapp-gray">
                    {threats[selectedThreat].details}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sapp-dark mb-2">Business Impact:</h4>
                  <p className="text-sapp-gray">
                    {threats[selectedThreat].impact}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2 text-red-600">
                  <Shield className="h-5 w-5" />
                  <span className="font-semibold">Protection Available</span>
                </div>
                <p className="text-sm text-red-700 mt-1">
                  SAPP Security offers targeted countermeasures for this specific threat vector.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-sapp-dark to-slate-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">The question is not why would someone listen in</h3>
              <p className="text-xl text-gray-300 mb-6">
                It is what are you doing to stop them
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-sapp-dark hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                  Get Threat Assessment
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-sapp-dark font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                  View Protection Solutions
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ThreatLandscapeSection;
