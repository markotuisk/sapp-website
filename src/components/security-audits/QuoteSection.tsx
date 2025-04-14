
import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';

const QuoteSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Industry Leader Opinion</h3>
          </div>
        </div>
        <QuoteCard
          quote="Security isn't something you buy, it's something you do, and it takes trained professionals to do it effectively."
          author="Bruce Schneier"
          position="Security Technologist"
        />
      </div>
    </section>
  );
};

export default QuoteSection;
