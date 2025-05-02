
import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Animated } from '@/components/ui/AnimatedElements';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  onRequestAudit: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onRequestAudit }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up">
          <div className="bg-sapp-dark rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-dark-blue to-transparent opacity-80"></div>
            
            {/* Animated security element */}
            <motion.div 
              className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4"
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.05, 1, 0.95, 1]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <Shield className="h-64 w-64 text-sapp-blue/10" />
            </motion.div>
            
            <div className="relative z-10 md:max-w-xl">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Secure Your Venue Today
              </h3>
              <p className="text-gray-300 mb-6">
                Don't compromise on security for your next corporate event. Our professional venue security audit will identify vulnerabilities and recommend solutions to ensure your event meets the highest security standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors"
                  asChild
                >
                  <Link to="/event-security">
                    Explore Event Security
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                  onClick={onRequestAudit}
                >
                  Request Venue Audit
                </Button>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default CTASection;
