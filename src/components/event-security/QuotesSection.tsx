
import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';

const QuotesSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuoteCard
            quote="Security is always seen as too much until the day it's not enough."
            author="William H. Webster"
            role="Former FBI Director"
            color="blue"
            delay={100}
          />
          <QuoteCard
            quote="It takes 20 years to build a reputation and a few minutes to ruin it."
            author="Stephane Nappo"
            role="Global Chief Information Security Officer"
            color="dark"
            delay={200}
          />
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;
