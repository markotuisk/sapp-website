
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

interface CTASectionProps {
  onRequestConsultation: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onRequestConsultation }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#022B3A] to-[#053F5E] opacity-90"></div>
      <div className="absolute inset-0 opacity-10">
        {/* Sound wave patterns */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute h-[1px] bg-white"
            style={{ 
              width: '200%',
              top: `${15 + (i * 10)}%`,
              left: '-50%',
              transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
              opacity: 0.4
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Animated animation="fade-up" delay={100}>
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
              <Volume2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Get in Touch Today to Secure Your Speech Privacy
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Whether it's boardroom talks, medical disclosures, or legal consultations, our Speech Privacy & Soundmasking 
              services provide essential protection in today's interconnected world.
            </p>
            <Button 
              size="lg" 
              className="bg-white hover:bg-blue-50 text-sapp-blue hover:text-sapp-dark shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              onClick={onRequestConsultation}
            >
              Request a Consultation
            </Button>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
