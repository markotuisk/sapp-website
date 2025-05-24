
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Wifi, Bluetooth, Camera, Mic, Shield, Smartphone, Monitor, Clock, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ThreatLandscapeSection = () => {
  const [selectedThreat, setSelectedThreat] = useState(0);
  const { toast } = useToast();

  const threats = [
    {
      icon: Mic,
      title: 'Audio Surveillance',
      description: 'Hidden microphones and recording devices',
      details: 'Modern audio bugs are smaller than a coin and can transmit for months. They can be hidden in everyday objects, walls, or furniture.',
      impact: 'Board meetings, strategy discussions, and confidential calls are at risk',
      color: 'from-red-500 to-pink-500',
      evolution: 'From bulky wire-based devices to wireless nano-transmitters'
    },
    {
      icon: Camera,
      title: 'Visual Monitoring',
      description: 'Covert cameras and visual recording systems',
      details: 'Pinhole cameras, modified objects, and remote viewing systems can capture visual information without detection.',
      impact: 'Document theft, gesture analysis, and visual intelligence gathering',
      color: 'from-orange-500 to-red-500',
      evolution: 'High-definition recording in devices smaller than a button'
    },
    {
      icon: Radio,
      title: 'RF Surveillance',
      description: 'Wireless signal interception and monitoring',
      details: 'Radio frequency monitoring can intercept wireless communications, track devices, and detect electronic signatures.',
      impact: 'Communication interception, device tracking, and electronic profiling',
      color: 'from-purple-500 to-blue-500',
      evolution: 'Software-defined radios enable broad spectrum monitoring'
    },
    {
      icon: Smartphone,
      title: 'Digital Intrusion',
      description: 'Smartphone and device compromise',
      details: 'Mobile devices can be remotely activated to record audio/video, track location, and access sensitive data.',
      impact: 'Complete privacy breach through personal devices',
      color: 'from-blue-500 to-cyan-500',
      evolution: 'Sophisticated malware targeting business communications'
    }
  ];

  const evolutionTimeline = [
    {
      era: '1960s-1980s',
      title: 'Analogue Era',
      description: 'Large, wired devices requiring physical installation',
      icon: Monitor
    },
    {
      era: '1990s-2000s',
      title: 'Digital Transition',
      description: 'Miniaturisation and wireless transmission capabilities',
      icon: Radio
    },
    {
      era: '2010s-Present',
      title: 'Smart Surveillance',
      description: 'AI-powered analysis and ubiquitous connectivity',
      icon: Smartphone
    },
    {
      era: 'Future',
      title: 'Invisible Monitoring',
      description: 'Nano-scale devices and ambient intelligence',
      icon: TrendingUp
    }
  ];

  const handleThreatAssessment = () => {
    toast({
      title: "Threat Assessment Requested",
      description: "Our security experts will evaluate your specific threat landscape within 24 hours.",
    });
  };

  const handleViewProtection = () => {
    toast({
      title: "Protection Solutions",
      description: "Explore our comprehensive counter-surveillance protection packages.",
    });
  };

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

          {/* Threat Evolution Timeline */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-sapp-dark text-center mb-8">Evolution of Surveillance Threats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {evolutionTimeline.map((period, index) => {
                const PeriodIcon = period.icon;
                return (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200 h-full">
                      <div className="flex items-center mb-4">
                        <PeriodIcon className="h-6 w-6 text-sapp-blue mr-2" />
                        <span className="text-sm font-semibold text-sapp-blue">{period.era}</span>
                      </div>
                      <h4 className="font-bold text-sapp-dark mb-2">{period.title}</h4>
                      <p className="text-sm text-sapp-gray">{period.description}</p>
                    </div>
                    {index < evolutionTimeline.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-sapp-blue to-transparent"></div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Interactive Threat Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-sapp-dark mb-6">Modern Threat Vectors</h3>
              {threats.map((threat, index) => {
                const ThreatIcon = threat.icon;
                return (
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
                      <ThreatIcon className={`h-8 w-8 ${selectedThreat === index ? 'text-white' : 'text-sapp-blue'}`} />
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
                );
              })}
            </div>

            <motion.div
              key={selectedThreat}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const IconComponent = threats[selectedThreat].icon;
                return (
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${threats[selectedThreat].color} flex items-center justify-center mb-6`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                );
              })()}
              
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

                <div>
                  <h4 className="font-semibold text-sapp-dark mb-2">Technology Evolution:</h4>
                  <p className="text-sapp-gray">
                    {threats[selectedThreat].evolution}
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

          {/* Educational Focus Section */}
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
                <button 
                  onClick={handleThreatAssessment}
                  className="bg-white text-sapp-dark hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                >
                  Get Threat Assessment
                </button>
                <button 
                  onClick={handleViewProtection}
                  className="border-2 border-white text-white hover:bg-white hover:text-sapp-dark font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                >
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
