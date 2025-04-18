
import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';

const QuoteSection = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-6">
        <QuoteCard
          quote="Physical security assessments are the foundation of any comprehensive security program. Without understanding your current vulnerabilities, it's impossible to build an effective security strategy that protects your most valuable assets."
          author="Marko Tuisk"
          position="SAPP Founder and Technical Director"
        />
      </div>
    </section>
  );
};

export default QuoteSection;
