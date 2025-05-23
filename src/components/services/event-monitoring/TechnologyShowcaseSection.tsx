
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Smartphone, Wifi, Shield, Eye, Zap, Play } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { Button } from '@/components/ui/button';

const TechnologyShowcaseSection: React.FC = () => {
  const [activeTech, setActiveTech] = useState(0);

  const technologies = [
    {
      icon: Radio,
      title: "TSCM Sweeping",
      subtitle: "Technical Surveillance Counter Measures",
      description: "Advanced detection and neutralization of unauthorized surveillance devices using military-grade equipment.",
      capabilities: [
        "RF spectrum analysis",
        "Hidden camera detection",
        "GPS tracker identification",
        "Audio surveillance detection"
      ],
      benefit: "Ensures complete privacy for sensitive discussions and strategic meetings"
    },
    {
      icon: Smartphone,
      title: "Device Isolation",
      subtitle: "Non-Intrusive Mobile Control",
      description: "Revolutionary technology that disables device functions while allowing attendees to keep their phones.",
      capabilities: [
        "Camera/recording blocking",
        "Network access control",
        "Selective app disabling",
        "Instant restoration capability"
      ],
      benefit: "Maintains security without inconveniencing attendees"
    },
    {
      icon: Wifi,
      title: "Secure Networks",
      subtitle: "Isolated Infrastructure",
      description: "Military-grade network security protecting all event communications and data transfers.",
      capabilities: [
        "End-to-end encryption",
        "Real-time threat detection",
        "Network segmentation",
        "Bandwidth optimization"
      ],
      benefit: "Protects sensitive data and prevents cyber infiltration"
    },
    {
      icon: Eye,
      title: "AI-Powered Surveillance",
      subtitle: "Intelligent Monitoring",
      description: "Advanced AI analytics for proactive threat detection and automated response protocols.",
      capabilities: [
        "Behavioral analysis",
        "Crowd density monitoring",
        "Anomaly detection",
        "Predictive alerts"
      ],
      benefit: "Prevents incidents before they escalate"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-purple-500/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-purple-600 tracking-wider">ADVANCED TECHNOLOGY</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Cutting-Edge Security Solutions
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Our proprietary technologies address modern threats that traditional security cannot handle, 
            providing comprehensive protection for today's corporate events.
          </p>
        </Animated>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {technologies.map((tech, index) => {
              const TechIcon = tech.icon;
              return (
                <motion.div
                  key={index}
                  onClick={() => setActiveTech(index)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeTech === index
                      ? 'bg-sapp-blue text-white shadow-lg scale-105'
                      : 'bg-white hover:bg-slate-50 hover:shadow-md'
                  }`}
                  whileHover={{ scale: activeTech === index ? 1.05 : 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      activeTech === index ? 'bg-white/20' : 'bg-sapp-blue/10'
                    }`}>
                      <TechIcon className={`h-6 w-6 ${
                        activeTech === index ? 'text-white' : 'text-sapp-blue'
                      }`} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${
                        activeTech === index ? 'text-white' : 'text-sapp-dark'
                      }`}>
                        {tech.title}
                      </h4>
                      <p className={`text-sm ${
                        activeTech === index ? 'text-white/80' : 'text-sapp-gray'
                      }`}>
                        {tech.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  {React.createElement(technologies[activeTech].icon, { 
                    className: "h-8 w-8 text-sapp-blue" 
                  })}
                  <div>
                    <h3 className="text-xl font-bold text-sapp-dark">
                      {technologies[activeTech].title}
                    </h3>
                    <p className="text-sm text-sapp-gray">
                      {technologies[activeTech].subtitle}
                    </p>
                  </div>
                </div>
                
                <p className="text-sapp-gray mb-6">
                  {technologies[activeTech].description}
                </p>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-sapp-dark">Key Capabilities:</h4>
                  {technologies[activeTech].capabilities.map((capability, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-sapp-gray">{capability}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-50 rounded-lg p-4 border-l-4 border-emerald-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium text-emerald-800">Business Impact</span>
                  </div>
                  <p className="text-emerald-700 text-sm">
                    {technologies[activeTech].benefit}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Animated animation="fade-up" delay={300} className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
          >
            <Play className="h-4 w-4 mr-2" />
            Watch Technology Demo
          </Button>
        </Animated>
      </div>
    </section>
  );
};

export default TechnologyShowcaseSection;
