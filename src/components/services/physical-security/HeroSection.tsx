
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  /** Callback function triggered when user requests an assessment */
  onRequestAssessment: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRequestAssessment }) => {
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const iconAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-slate-100 via-white to-blue-50 relative overflow-hidden">
      {/* Geometric background patterns */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-sapp-blue/20"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(60px)',
              transform: `scale(${Math.random() * 0.5 + 0.5})`
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerAnimation}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div variants={itemAnimation} className="mb-6">
                <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                  <h3 className="text-sm font-medium text-sapp-blue tracking-wider flex items-center justify-center lg:justify-start gap-2">
                    <Shield className="h-4 w-4" /> Professional Assessment
                  </h3>
                </div>
                <h1 id="physical-security-heading" className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-sapp-dark leading-tight mb-6">
                  Find <span className="text-sapp-blue">Vulnerabilities</span> Before Others Do
                </h1>
                <p className="text-lg md:text-xl text-sapp-gray max-w-2xl mx-auto lg:mx-0">
                  Our comprehensive physical security assessments identify weak points in your security infrastructure before they can be exploited.
                </p>
              </motion.div>
              
              <motion.div variants={itemAnimation}>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-xl shadow-sapp-blue/20 hover:scale-105 transition-all duration-300"
                  onClick={onRequestAssessment}
                >
                  Request a Security Assessment
                </Button>
              </motion.div>
            </div>
            
            <div className="lg:col-span-5 hidden lg:block">
              <motion.div 
                className="relative"
                variants={iconAnimation}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-sapp-blue/20 to-sapp-blue/5 rounded-full blur-xl"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Shield, title: "Threat Detection", delay: 0 },
                      { icon: Lock, title: "Access Control", delay: 0.1 },
                      { icon: Search, title: "Vulnerability Analysis", delay: 0.2 },
                      { icon: Shield, title: "Security Planning", delay: 0.3 }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className={cn(
                          "bg-slate-50 rounded-xl p-4 flex flex-col items-center text-center",
                          index === 0 && "col-span-2"
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: item.delay + 0.5, duration: 0.5 }}
                      >
                        <div className="bg-sapp-blue/10 rounded-full p-3 mb-3">
                          <item.icon className="h-6 w-6 text-sapp-blue" />
                        </div>
                        <h3 className="text-sm font-medium text-sapp-dark">{item.title}</h3>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 relative">
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-sapp-blue to-blue-400 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "75%" }}
                        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-sapp-gray">
                      <span>Assessment Progress</span>
                      <span>75% Complete</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 lg:mt-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {[
              { title: "15+", subtitle: "Years Experience" },
              { title: "500+", subtitle: "Assessments Completed" },
              { title: "98%", subtitle: "Client Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/50 backdrop-blur-sm border border-gray-100 rounded-lg p-6 text-center">
                <h3 className="text-3xl font-display font-bold text-sapp-blue mb-1">{stat.title}</h3>
                <p className="text-sm text-sapp-gray">{stat.subtitle}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
