
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Shield, Check, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Animated, AnimatedCount } from '@/components/ui/AnimatedElements';

interface HeroProps {
  onRequestAudit: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRequestAudit }) => {
  const stats = [
    { value: 98, suffix: '%', label: 'Client satisfaction rate' },
    { value: 250, suffix: '+', label: 'Audits completed' },
    { value: 15, suffix: '+', label: 'Years of experience' }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Navigation buttons */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/event-security">
            <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
              <ArrowLeft className="h-4 w-4" />
              Back to Event Security
            </Button>
          </Link>
          <Link to="/services/event-monitoring">
            <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
              Next: Event Monitoring
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Animated animation="fade-up" className="order-2 lg:order-1">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Event Security</h3>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
              Venue Security Audits
            </h1>
            <p className="text-lg text-sapp-gray mb-8">
              Professional security audits for event venues to ensure baseline security for your sensitive corporate meetings and executive events.
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
                  <p className="text-sm text-sapp-gray mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
              onClick={onRequestAudit}
            >
              Schedule a Venue Security Audit
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
                      <h3 className="font-semibold text-sapp-dark text-sm">Vulnerability Assessment</h3>
                      <p className="text-xs text-sapp-gray">Identify security gaps in venue infrastructure</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-slate-50 p-4 rounded-lg flex items-start gap-3"
                  >
                    <div className="bg-sapp-blue/10 rounded-full p-2">
                      <Check className="h-5 w-5 text-sapp-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sapp-dark text-sm">Security Verification</h3>
                      <p className="text-xs text-sapp-gray">Confirm existing measures are effective</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-slate-50 p-4 rounded-lg flex items-start gap-3"
                  >
                    <div className="bg-sapp-blue/10 rounded-full p-2">
                      <Clock className="h-5 w-5 text-sapp-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sapp-dark text-sm">Rapid Deployment</h3>
                      <p className="text-xs text-sapp-gray">Quick assessment before critical events</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-slate-50 p-4 rounded-lg flex items-start gap-3"
                  >
                    <div className="bg-sapp-blue/10 rounded-full p-2">
                      <FileText className="h-5 w-5 text-sapp-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sapp-dark text-sm">Comprehensive Reporting</h3>
                      <p className="text-xs text-sapp-gray">Detailed findings and recommendations</p>
                    </div>
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

export default Hero;
