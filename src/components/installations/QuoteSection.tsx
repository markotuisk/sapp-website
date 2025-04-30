
import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';
import { Animated } from '@/components/ui/AnimatedElements';

const InstallationsQuoteSection = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-8">
            <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium">
              WHAT LEADERS SAY
            </h3>
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

export default InstallationsQuoteSection;
