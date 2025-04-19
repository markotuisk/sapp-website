import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';
import { Animated } from '@/components/ui/AnimatedElements';

const QuoteSection = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-8">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Industry Leader Opinion</h3>
            </div>
          </div>
        </Animated>
        <QuoteCard
          quote="Your defenses aren't the only things that can leave you exposed; your vendors' IoT systems and even your own people can contribute to the risk. The real danger often lies in your environment: nearby devices, RF signals, and third-party connections. In the realm of corporate security, trust and convenience are the easiest doors for an attacker to open."
          author="Marko Tuisk"
          position="SAPP Founder and Technical Director"
        />
      </div>
    </section>
  );
};

export default QuoteSection;
