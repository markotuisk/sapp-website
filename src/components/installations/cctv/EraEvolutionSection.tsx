
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Monitor, HardDrive, Cloud, Brain, Camera, Network, Smartphone, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const eras = [
  {
    id: 'analog',
    title: 'Analog Era',
    period: '1970s - 2000s',
    icon: Monitor,
    color: 'from-gray-600 to-gray-800',
    description: 'Basic CCTV systems with analog cameras, VHS recording, and manual monitoring',
    features: ['Analog cameras', 'VHS/DVR recording', 'Manual monitoring', 'Limited storage'],
    limitations: ['Poor image quality', 'Physical media storage', 'No remote access', 'Manual evidence retrieval'],
    gradient: 'bg-gradient-to-br from-gray-500 to-gray-700'
  },
  {
    id: 'digital',
    title: 'Digital Era',
    period: '2000s - 2010s', 
    icon: HardDrive,
    color: 'from-blue-600 to-blue-800',
    description: 'IP cameras, digital recording, and network-based systems with basic remote access',
    features: ['IP cameras', 'Digital recording', 'Network infrastructure', 'Basic remote viewing'],
    limitations: ['Complex setup', 'Limited analytics', 'Hardware dependencies', 'Manual configuration'],
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-700'
  },
  {
    id: 'cloud',
    title: 'Cloud Era',
    period: '2010s - 2020s',
    icon: Cloud,
    color: 'from-cyan-600 to-cyan-800', 
    description: 'Cloud-managed systems, remote access, and simplified deployment with mobile apps',
    features: ['Cloud management', 'Mobile access', 'Automated updates', 'Scalable storage'],
    limitations: ['Internet dependency', 'Subscription costs', 'Data privacy concerns', 'Bandwidth requirements'],
    gradient: 'bg-gradient-to-br from-cyan-500 to-cyan-700'
  },
  {
    id: 'ai',
    title: 'AI Era',
    period: '2020s - Present',
    icon: Brain,
    color: 'from-purple-600 to-purple-800',
    description: 'AI-powered analytics, smart detection, predictive security, and intelligent automation',
    features: ['AI analytics', 'Smart detection', 'Predictive alerts', 'Automated responses'],
    limitations: ['Higher costs', 'Complexity', 'Training requirements', 'Algorithm bias'],
    gradient: 'bg-gradient-to-br from-purple-500 to-purple-700'
  }
];

const EraEvolutionSection = () => {
  const [activeEra, setActiveEra] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEraChange = (index: number) => {
    if (isAnimating || index === activeEra) return;
    setIsAnimating(true);
    setActiveEra(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextEra = () => {
    if (activeEra < eras.length - 1) {
      handleEraChange(activeEra + 1);
    }
  };

  return (
    <section id="era-evolution" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-purple-600/10 rounded-full px-6 py-2 mb-6">
            <h3 className="text-sm font-medium text-purple-700 tracking-wider">TECHNOLOGY EVOLUTION</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
            The Evolution of Security Technology
          </h2>
          <p className="text-xl text-sapp-gray max-w-3xl mx-auto">
            From analog cameras to AI-powered security platforms - explore how technology has transformed physical security
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-gray-500 via-blue-500 via-cyan-500 to-purple-500 rounded-full"
                initial={{ width: '25%' }}
                animate={{ width: `${((activeEra + 1) / eras.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            {/* Era Buttons */}
            <div className="flex justify-between relative z-10">
              {eras.map((era, index) => {
                const Icon = era.icon;
                const isActive = index === activeEra;
                const isPassed = index <= activeEra;
                
                return (
                  <motion.button
                    key={era.id}
                    onClick={() => handleEraChange(index)}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-white shadow-lg scale-110' 
                        : isPassed 
                        ? 'bg-white/80 shadow-md' 
                        : 'bg-white/60 shadow-sm'
                    }`}
                    whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`p-3 rounded-full mb-2 ${
                      isActive ? era.gradient : isPassed ? 'bg-gray-400' : 'bg-gray-300'
                    }`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-sapp-dark' : 'text-gray-600'
                    }`}>
                      {era.title}
                    </span>
                    <span className="text-xs text-gray-500">{era.period}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Era Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEra}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <Card className="p-8 shadow-xl border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Era Info */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-full ${eras[activeEra].gradient}`}>
                      {React.createElement(eras[activeEra].icon, { className: "h-8 w-8 text-white" })}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-sapp-dark">{eras[activeEra].title}</h3>
                      <p className="text-gray-600">{eras[activeEra].period}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-sapp-gray mb-8 leading-relaxed">
                    {eras[activeEra].description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Features */}
                    <div>
                      <h4 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {eras[activeEra].features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-sm text-gray-700 flex items-start"
                          >
                            <span className="text-green-500 mr-2">•</span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Limitations */}
                    <div>
                      <h4 className="text-lg font-semibold text-orange-700 mb-4 flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        Limitations
                      </h4>
                      <ul className="space-y-2">
                        {eras[activeEra].limitations.map((limitation, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="text-sm text-gray-700 flex items-start"
                          >
                            <span className="text-orange-500 mr-2">•</span>
                            {limitation}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Visual Representation */}
                <div className="flex items-center justify-center">
                  <motion.div
                    className={`w-80 h-80 rounded-2xl ${eras[activeEra].gradient} flex items-center justify-center relative overflow-hidden`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </div>

                    {/* Era Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      {React.createElement(eras[activeEra].icon, { className: "h-32 w-32 text-white" })}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={nextEra}
            disabled={activeEra >= eras.length - 1}
            className="bg-gradient-to-r from-sapp-blue to-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {activeEra >= eras.length - 1 ? 'Evolution Complete' : 'Next Era'}
            {activeEra < eras.length - 1 && <ChevronRight className="ml-2 h-5 w-5" />}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EraEvolutionSection;
