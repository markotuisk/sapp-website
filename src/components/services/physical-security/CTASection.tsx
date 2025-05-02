
import React from 'react';
import { Shield, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface CTASectionProps {
  /** Callback function triggered when user requests an assessment */
  onRequestAssessment: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onRequestAssessment }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white relative">
      <div className="absolute inset-0 overflow-hidden">
        {/* Background design elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-sapp-blue/5 to-blue-100/20 blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 w-64 h-64 rounded-full bg-blue-50/50 blur-2xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMCAwaDJsMCAySDBoLTJ6TTAgMzhoMmwwIDJIMHYtMnpNMzggMHYyaDJWMGgtMnpNMzggMzh2Mmgydi0yaC0yeiIgZmlsbD0icmdiYSgwLDAsMCwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="bg-sapp-blue/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-sapp-blue" />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-4">
                  Secure Your Organization With a Professional Assessment
                </h3>
                <p className="text-sapp-gray mb-8">
                  Every security vulnerability is an opportunity for unauthorized access or attack. Our professional assessment identifies these weak points before they can be exploited.
                </p>
                <div className="space-y-4">
                  <Button 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg hover:shadow-xl shadow-sapp-blue/10 transition-all duration-300"
                    size="lg"
                    onClick={onRequestAssessment}
                  >
                    Request Your Assessment <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
              
              <div className="relative bg-gradient-to-br from-sapp-blue to-[#1a5e6c] hidden lg:block">
                {/* Visual security pattern elements */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="absolute bg-white/5 rounded-full"
                      style={{
                        width: Math.random() * 60 + 20 + 'px',
                        height: Math.random() * 60 + 20 + 'px',
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1, 1, 0], 
                        opacity: [0, 0.3, 0.3, 0] 
                      }}
                      transition={{ 
                        duration: Math.random() * 3 + 4, 
                        repeat: Infinity, 
                        delay: Math.random() * 5 
                      }}
                    />
                  ))}
                </div>
                
                {/* Foreground security elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <motion.div
                      className="absolute inset-0 border-4 border-white/20 rounded-full"
                      animate={{ 
                        scale: [1, 1.1, 1], 
                        opacity: [0.2, 0.3, 0.2] 
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 border-4 border-white/15 rounded-full"
                      animate={{ 
                        scale: [1.1, 1, 1.1], 
                        opacity: [0.15, 0.25, 0.15] 
                      }}
                      transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute inset-0 border-4 border-white/10 rounded-full"
                      animate={{ 
                        scale: [1.2, 1.1, 1.2], 
                        opacity: [0.1, 0.2, 0.1] 
                      }}
                      transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                    />
                    
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1, 0.8] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    >
                      <Lock className="h-16 w-16 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                title: "Expertise",
                description: "Conducted by certified security professionals with extensive industry experience"
              },
              {
                title: "Methodology",
                description: "Using established frameworks and industry best practices for thorough analysis"
              },
              {
                title: "Actionable",
                description: "Providing clear prioritized recommendations, not just theoretical findings"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-lg font-semibold text-sapp-dark mb-2">{item.title}</h4>
                <p className="text-sapp-gray text-sm">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
