
import React from 'react';
import InsightQuote from '@/components/home/InsightQuote';

const QuoteSection = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-6 text-center mb-8">
        <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
          <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Industry Leader Opinion</h3>
        </div>
      </div>
      <InsightQuote />
    </section>
  );
};

export default QuoteSection;
