
import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';
import { Animated } from '@/components/ui/AnimatedElements';
import SectionLabel from '@/components/ui/SectionLabel';

const QuoteSection = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-8">
            <SectionLabel>Industry Leader Opinion</SectionLabel>
          </div>
        </Animated>
        <QuoteCard
          quote="Security is always seen as too much until the day it's not enough."
          author="William H. Webster"
          position="Former FBI Director"
        />
      </div>
    </section>
  );
};

export default QuoteSection;
