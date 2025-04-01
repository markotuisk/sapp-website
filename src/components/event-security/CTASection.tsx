
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-sapp-dark to-sapp-dark/90 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-display font-bold mb-6">Ready to secure your next event?</h2>
        <p className="max-w-2xl mx-auto mb-8 text-white/80">
          Our team of security experts is ready to ensure your executive meetings and corporate events have the protection they need.
        </p>
        <Link to="/#contact">
          <Button 
            size="lg" 
            className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-all duration-300 hover:scale-105"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
