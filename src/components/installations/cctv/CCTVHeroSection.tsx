
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Shield, Zap, Network, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingSecurityIcon = ({ icon: Icon, delay = 0, className = "" }) => (
  <motion.div
    className={`absolute opacity-20 ${className}`}
    initial={{ y: 20, opacity: 0 }}
    animate={{ 
      y: [20, 0, -10, 0], 
      opacity: [0, 0.2, 0.3, 0.2],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      duration: 4, 
      delay, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <Icon className="h-12 w-12 text-sapp-blue" />
  </motion.div>
);

const CCTVHeroSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-sapp-blue overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <FloatingSecurityIcon icon={Camera} delay={0} className="top-20 left-10" />
        <FloatingSecurityIcon icon={Shield} delay={1} className="top-32 right-20" />
        <FloatingSecurityIcon icon={Network} delay={2} className="bottom-40 left-20" />
        <FloatingSecurityIcon icon={Cloud} delay={1.5} className="bottom-20 right-10" />
        <FloatingSecurityIcon icon={Zap} delay={0.5} className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          <motion.div 
            className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-medium text-white/90 tracking-wider">INTERACTIVE SECURITY SOLUTIONS GUIDE</h3>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block text-white mb-2">CCTV & Access Control</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Technology Evolution
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore the evolution from analog systems to AI-powered cloud platforms. 
            Make informed decisions between cloud, on-premise, and hybrid solutions with our interactive comparison tools.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-sapp-blue to-blue-600 text-white hover:from-sapp-blue/90 hover:to-blue-600/90 shadow-2xl hover:scale-105 transition-all duration-300 font-semibold px-10 py-4 text-lg border-2 border-blue-500/30"
              onClick={() => document.getElementById('era-evolution')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Camera className="mr-3 h-6 w-6" />
              Start Interactive Journey
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-sapp-blue backdrop-blur-sm hover:scale-105 transition-all duration-300 px-10 py-4 text-lg font-semibold"
              onClick={() => document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Shield className="mr-3 h-6 w-6" />
              Compare Solutions
            </Button>
          </motion.div>
          
          {/* Technology Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { label: 'AI Detection Accuracy', value: '99.7%', icon: Zap },
              { label: 'Cloud Uptime SLA', value: '99.9%', icon: Cloud },
              { label: 'Response Time', value: '<5s', icon: Shield },
              { label: 'Scalability', value: 'Unlimited', icon: Network }
            ].map(({ label, value, icon: Icon }, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)' 
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-white/70">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CCTVHeroSection;
