
import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';
import { Animated } from '@/components/ui/AnimatedElements';

const QuoteSection = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-8">
            <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium">
              INDUSTRY LEADER OPINION
            </h3>
          </div>
        </Animated>
        <QuoteCard
          quote="It takes 20 years to build a reputation and a few minutes to ruin it."
          author="Stephane Nappo"
          position="Global Chief Information Security Officer"
        />
      </div>
    </section>
  );
};

export default QuoteSection;
