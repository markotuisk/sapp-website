
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock } from 'lucide-react';
import NavigationButtons from './NavigationButtons';
import FloatingSecurityElements from './FloatingSecurityElements';

interface HeroSectionProps {
  onContactClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-sapp-blue overflow-hidden">
      <FloatingSecurityElements />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-8">
          <NavigationButtons />
        </div>
        
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div 
            className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-medium text-white/90 tracking-wider">SECURE COMMUNICATION TECHNOLOGY</h3>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block text-white">Communication</span>
            <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Security Solutions
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Advanced secure communication services protecting your sensitive information through 
            encrypted networks, secure radios, and comprehensive technology protection during corporate events.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-sapp-blue text-white hover:bg-sapp-blue/90 shadow-xl hover:scale-105 transition-all duration-200 font-semibold px-8 py-3 border-2 border-sapp-blue"
              onClick={onContactClick}
            >
              <Shield className="mr-2 h-5 w-5" />
              Schedule Security Assessment
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-sapp-blue backdrop-blur-sm hover:scale-105 transition-all duration-200 px-8 py-3 font-semibold"
              onClick={() => scrollToSection('security-levels')}
            >
              <Zap className="mr-2 h-5 w-5" />
              View Protection Levels
            </Button>
          </motion.div>
          
          {/* Security Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: Lock, stat: '99.9%', label: 'Communication Security' },
              { icon: Shield, stat: '24/7', label: 'Threat Monitoring' },
              { icon: Zap, stat: '<2min', label: 'Incident Response' }
            ].map(({ icon: Icon, stat, label }, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)' 
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat}</div>
                <div className="text-sm text-white/70">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
