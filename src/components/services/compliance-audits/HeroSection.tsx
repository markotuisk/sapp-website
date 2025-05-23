
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Animated, AnimatedCount } from '@/components/ui/AnimatedElements';

interface HeroProps {
  onRequestAssessment: () => void;
}

const HeroSection: React.FC<HeroProps> = ({ onRequestAssessment }) => {
  const stats = [
    { value: 44486, suffix: '', label: 'ISO 27001 Certified Organizations Worldwide' },
    { value: 20, suffix: '%', label: 'Year-over-year growth in certifications' },
    { value: 39, suffix: '%', label: 'Of IT companies are ISO 27001 certified' }
  ];

  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sapp-blue/20"
            style={{
              width: `${Math.random() * 200 + 80}px`,
              height: `${Math.random() * 200 + 80}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Animated animation="fade-up" className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-1.5 mb-4">
              <Award className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-medium text-emerald-700 tracking-wider">ISO 27001 CERTIFIED AUDITS</h3>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
              Compliance Audits for <span className="text-sapp-blue">Regulatory Excellence</span>
            </h1>
            <p className="text-lg text-sapp-gray mb-8">
              Ensure your organisation meets international standards with our comprehensive ISO 27001 
              compliance audits. Build trust, reduce risk, and demonstrate your commitment to information security.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4"
                >
                  <div className="text-2xl md:text-3xl font-display font-bold text-sapp-blue">
                    <AnimatedCount end={stat.value} duration={2000} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs md:text-sm text-sapp-gray mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
              onClick={onRequestAssessment}
            >
              Schedule Readiness Assessment
            </Button>
          </Animated>
          
          <div className="order-1 lg:order-2">
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-xl shadow-xl p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500/10 rounded-full p-3">
                      <CheckCircle className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sapp-dark">Compliance Framework</h3>
                      <p className="text-sm text-sapp-gray">ISO 27001 Annex A.11 Coverage</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="bg-sapp-blue/10 rounded-full p-2"
                  >
                    <Award className="h-5 w-5 text-sapp-blue" />
                  </motion.div>
                </div>
                
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-sapp-blue" />
                      <span className="text-sm font-medium text-sapp-dark">Physical Security Perimeter</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-sapp-blue" />
                      <span className="text-sm font-medium text-sapp-dark">Entry Controls</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-sapp-blue" />
                      <span className="text-sm font-medium text-sapp-dark">Equipment Protection</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gradient-to-r from-sapp-blue/20 to-emerald-500/20 p-4 rounded-lg text-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-sapp-blue" />
                      <span className="font-bold text-sapp-dark">Ready for Certification?</span>
                    </div>
                    <p className="text-xs text-sapp-gray mb-3">Join 44,000+ certified organisations worldwide</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full border-sapp-blue/20 hover:bg-sapp-blue hover:text-white"
                      onClick={onRequestAssessment}
                    >
                      Start Assessment
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-emerald-500/5 rounded-xl -z-10"></div>
              <div className="absolute -bottom-12 -right-12 w-full h-full bg-sapp-blue/3 rounded-xl -z-20"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
