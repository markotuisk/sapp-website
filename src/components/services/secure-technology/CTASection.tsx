
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Animated } from '@/components/ui/AnimatedElements';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  onRequestAssessment: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onRequestAssessment }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-accent-dark-blue to-sapp-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <Animated animation="fade-up" delay={100}>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Enhance Your Event Security
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Our secure technology solutions ensure your sensitive corporate events and meetings are protected from technical vulnerabilities.
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white text-sapp-blue hover:bg-white/90 border-0 shadow-lg hover:scale-105 transition-all duration-200"
            onClick={onRequestAssessment}
          >
            Request Technology Assessment
          </Button>
        </Animated>
      </div>
    </section>
  );
};

export default CTASection;
