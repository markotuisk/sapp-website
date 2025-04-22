
import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';
import SectionLabel from '@/components/ui/SectionLabel';

const QuoteSection = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <div className="text-center mb-8">
          <SectionLabel>Industry Leader Opinion</SectionLabel>
        </div>
        <QuoteCard
          quote="An external security audit provides credibility and confidence to management and shareholders that organisation is compliant and best protected against any information security risks."
          author="SAPP Customer"
          position="Global Head of Security, International Technology Firm"
        />
      </div>
    </section>
  );
};

export default QuoteSection;
