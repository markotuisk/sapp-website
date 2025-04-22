
import React from 'react';
import InsightQuote from '@/components/home/InsightQuote';
import SectionLabel from '@/components/ui/SectionLabel';

const QuoteSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <SectionLabel>Industry Leader Opinion</SectionLabel>
        </div>
        <InsightQuote />
      </div>
    </section>
  );
};

export default QuoteSection;
