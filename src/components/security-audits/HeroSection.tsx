
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Shield, Search, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import ServicesOverlay from '@/components/ui/ServicesOverlay';
import TranslatedText from '@/components/ui/TranslatedText';

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-b from-slate-50 to-white">
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
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 
              className={cn(
                "inline-block text-[19px] leading-[77px] tracking-[3.62px] text-sapp-blue font-medium uppercase mb-4 transition-all duration-500",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              ref={ref}
            >
              CERTIFIED
            </h3>
            
            <h1 
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-display font-bold text-sapp-dark mb-6 leading-tight transition-all duration-500 delay-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              id="security-audits-heading"
            >
              Independent <span className="text-sapp-blue">Security Audits</span> for organisations
            </h1>
            
            <p 
              className={cn(
                "text-sapp-gray text-lg mb-8 max-w-2xl transition-all duration-500 delay-200",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Our security audits provide an objective evaluation of your organisation's physical and information security posture, identifying vulnerabilities and providing actionable recommendations to enhance protection.
            </p>
            
            <div 
              className={cn(
                "flex flex-wrap gap-4 transition-all duration-500 delay-300",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 w-full sm:w-auto transition-all duration-300 group relative overflow-hidden"
                onClick={() => setServicesOpen(true)}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  Rapid Service Navigator
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Button>
            </div>
          </div>
          
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-sapp-blue/10 to-transparent rounded-3xl blur-xl"></div>
              <div className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-sapp-blue/10 rounded-full p-3 mr-4">
                    <Shield className="h-6 w-6 text-sapp-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-sapp-dark">Security Audit Report</h3>
                    <p className="text-sm text-sapp-gray">Summary of findings</p>
                  </div>
                </div>
                
                <div className="space-y-5">
                  {[
                    { icon: Shield, title: "Physical Security", text: "Entry points evaluated: 12" },
                    { icon: FileText, title: "Documentation Review", text: "Policies reviewed: 8" },
                    { icon: Search, title: "Vulnerability Assessment", text: "Issues identified: 6" },
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
                      className="flex items-start p-3 rounded-lg bg-slate-50 border border-slate-100"
                    >
                      <div className="bg-white rounded-full p-2 mr-3 border border-slate-100">
                        <item.icon className="h-5 w-5 text-sapp-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sapp-dark">{item.title}</h4>
                        <p className="text-xs text-sapp-gray">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-medium text-sapp-dark mb-2">Overall Risk Score</h4>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-amber-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1, delay: 1.3 }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-green-600">Low</span>
                    <span className="text-xs text-amber-600 font-medium">Medium</span>
                    <span className="text-xs text-red-600">High</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ServicesOverlay 
        open={servicesOpen}
        onOpenChange={setServicesOpen}
      />
    </section>
  );
};

export default HeroSection;
