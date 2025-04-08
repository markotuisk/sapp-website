
import React from 'react';
import InsightQuote from '@/components/home/InsightQuote';

const QuoteSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Industry Leader Opinion</h3>
          </div>
        </div>
        <InsightQuote />
      </div>
    </section>
  );
};

export default QuoteSection;
