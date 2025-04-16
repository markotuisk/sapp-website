
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import TranslatedText from '@/components/ui/TranslatedText';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="text-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Get Started</h3>
          </div>
        </div>
        
        <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">Ready to secure your next event?</h2>
        <p className="text-sapp-gray max-w-2xl mx-auto mb-8">
          Our team of event security experts is ready to create a tailored security plan for your upcoming corporate events.
        </p>
        <Link to="/#contact">
          <Button 
            size="lg" 
            className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-transform duration-300 hover:scale-105"
          >
            <TranslatedText textKey="getInTouch" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
