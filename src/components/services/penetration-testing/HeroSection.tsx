
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, UserCheck, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Animated, AnimatedCount } from '@/components/ui/AnimatedElements';

interface HeroProps {
  onRequestService: () => void;
}

const HeroSection: React.FC<HeroProps> = ({ onRequestService }) => {
  const stats = [
    { value: 74, suffix: '%', label: 'Breaches involve human factors' },
    { value: 28, suffix: '%', label: 'Organizations report increased incidents' },
    { value: 60, suffix: '%', label: 'Vulnerabilities are non-technical' }
  ];

  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {[...Array(6)].map((_, i) => (
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
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Animated animation="fade-up" className="order-2 lg:order-1">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">SECURITY SERVICES</h3>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
              Physical Security <span className="text-sapp-blue">Penetration Testing</span>
            </h1>
            <p className="text-lg text-sapp-gray mb-8">
              Simulate real-world attacks to identify vulnerabilities in your physical security measures, 
              including access controls, surveillance systems, and employee protocols.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-sapp-blue">
                    <AnimatedCount end={stat.value} duration={2000} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs md:text-sm text-sapp-gray mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
              onClick={onRequestService}
            >
              Request Penetration Testing
            </Button>
          </Animated>
          
          <div className="order-1 lg:order-2">
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-xl shadow-xl p-6 relative z-10">
                <div className="flex items-center mb-6 space-x-3">
                  <div className="bg-red-500/10 rounded-full p-3">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sapp-dark">Threat Simulation</h3>
                    <p className="text-sm text-sapp-gray">Testing real-world attack scenarios</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-slate-50 p-4 rounded-lg flex items-start gap-3"
                  >
                    <div className="bg-sapp-blue/10 rounded-full p-2">
                      <Shield className="h-5 w-5 text-sapp-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sapp-dark text-sm">Access Control Testing</h3>
                      <p className="text-xs text-sapp-gray">Checkpoint bypass detection</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-slate-50 p-4 rounded-lg flex items-start gap-3"
                  >
                    <div className="bg-sapp-blue/10 rounded-full p-2">
                      <Lock className="h-5 w-5 text-sapp-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sapp-dark text-sm">Lock & Barrier Testing</h3>
                      <p className="text-xs text-sapp-gray">Physical barrier assessment</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-slate-50 p-4 rounded-lg flex items-start gap-3"
                  >
                    <div className="bg-sapp-blue/10 rounded-full p-2">
                      <UserCheck className="h-5 w-5 text-sapp-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sapp-dark text-sm">Social Engineering</h3>
                      <p className="text-xs text-sapp-gray">Human factor vulnerability testing</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gradient-to-r from-sapp-blue/20 to-sapp-blue/5 p-4 rounded-lg"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="font-bold text-sapp-dark text-sm mb-1">Ready to test your defenses?</h3>
                    <p className="text-xs text-sapp-gray mb-2">Uncover vulnerabilities before attackers do</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full border-sapp-blue/20 hover:bg-sapp-blue hover:text-white"
                      onClick={onRequestService}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-sapp-blue/5 rounded-xl -z-10"></div>
              <div className="absolute -bottom-12 -right-12 w-full h-full bg-sapp-blue/3 rounded-xl -z-20"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
