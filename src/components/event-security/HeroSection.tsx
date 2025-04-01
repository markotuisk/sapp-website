
import React from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  inView: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ inView }) => {
  return (
    <section className="pb-16 relative bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 
            className={cn(
              "text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6 text-center transition-all duration-500",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Event Security
          </h1>
          <p 
            className={cn(
              "text-xl text-sapp-gray text-center mb-10 transition-all duration-500 delay-100",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Real-time protection for high-profile confidential meetings and events
          </p>
          <p className="text-sapp-gray text-center mb-8">
            We are experienced in protecting management and board meetings for over 20 years. 
            Our team provides comprehensive security solutions for corporate executives, 
            ensuring your most sensitive gatherings remain secure and private.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
