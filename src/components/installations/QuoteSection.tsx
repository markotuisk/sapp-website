
import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';

const QuoteSection = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Industry Leader Opinion</h3>
          </div>
        </div>
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
