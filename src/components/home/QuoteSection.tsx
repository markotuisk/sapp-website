
import React from 'react';
import InsightQuote from '@/components/home/InsightQuote';

const QuoteSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <h3 className="uppercase text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium">
              OPINION
            </h3>
          </div>
        </div>
        <InsightQuote />
      </div>
    </section>
  );
};

export default QuoteSection;

