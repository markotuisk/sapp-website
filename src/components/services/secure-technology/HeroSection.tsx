
import React from 'react';
import { Button } from '@/components/ui/button';
import NavigationButtons from './NavigationButtons';

interface HeroSectionProps {
  onContactClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <NavigationButtons />
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Event Security</h3>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
            Secure Technology
          </h1>
          <p className="text-lg text-sapp-gray mb-8 max-w-2xl mx-auto">
            Protecting your sensitive information with hardened technology solutions during corporate events and executive meetings.
          </p>
          <Button 
            size="lg" 
            className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
            onClick={onContactClick}
          >
            Schedule Technology Assessment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
