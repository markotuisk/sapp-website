
import React from 'react';
import { Button } from '@/components/ui/button';
import TranslatedText from '@/components/ui/TranslatedText';
import { Animated } from '@/components/ui/AnimatedElements';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2 } from 'lucide-react';

interface CTASectionProps {
  onRequestService: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onRequestService }) => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Animated animation="fade-up">
              <h3 className="uppercase text-sapp-blue text-sm font-medium tracking-wider mb-2">TAKE ACTION</h3>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                Ready to test your defenses?
              </h2>
              <p className="text-sapp-gray mb-8">
                Don't wait for a security incident to expose your vulnerabilities. Proactive physical security 
                testing helps you identify and address weaknesses before they can be exploited.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Expert penetration testers with industry certifications",
                  "Realistic simulation of actual attack techniques",
                  "Comprehensive reporting with actionable recommendations",
                  "Minimally invasive testing with clear rules of engagement"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sapp-gray">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
                onClick={onRequestService}
              >
                Schedule a Consultation
              </Button>
            </Animated>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-sapp-blue/10 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-sapp-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sapp-dark">Security Assurance</h3>
                  <p className="text-sapp-gray text-sm">Protect your assets with confidence</p>
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="p-4 bg-slate-50 rounded-lg border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Tailored Testing Programs</h4>
                  <p className="text-sm text-sapp-gray">
                    Every organization has unique security requirements. We customize our penetration testing 
                    approach to address your specific concerns and security objectives.
                  </p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-lg border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Certified Professionals</h4>
                  <p className="text-sm text-sapp-gray">
                    Our testing teams include certified security professionals with extensive experience 
                    in physical security assessment and penetration testing methodologies.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-sapp-blue/10 to-slate-50 rounded-lg border border-sapp-blue/20">
                  <h4 className="font-semibold text-sapp-dark mb-2">Ready to Start?</h4>
                  <p className="text-sm text-sapp-gray mb-4">
                    Contact us today to discuss your security assessment needs and how our 
                    penetration testing services can help strengthen your security posture.
                  </p>
                  <Button 
                    className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                    onClick={onRequestService}
                  >
                    Request a Free Consultation
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
