
import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';
import { Animated } from '@/components/ui/AnimatedElements';

const QuoteSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-8">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Industry Leader Opinion</h3>
            </div>
          </div>
        </Animated>
        <QuoteCard
          quote="In our increasingly connected world, cyber security isn't just an IT concern—it's a fundamental business imperative that impacts every aspect of modern operations."
          author="Dr. Ian Levy"
          position="Former Technical Director, NCSC"
        />
      </div>
    </section>
  );
};

export default QuoteSection;
