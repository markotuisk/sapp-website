
import React from 'react';
import { Quote } from 'lucide-react';

const QuoteSection = () => {
  return (
    <section className="py-16 bg-sapp-blue/5">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="h-10 w-10 mx-auto text-sapp-blue mb-6" />
          <h2 className="text-2xl md:text-3xl font-display font-medium text-sapp-dark mb-8 leading-relaxed">
            "In today's rapidly evolving security landscape, independent audits aren't a luxury—they're 
            essential. They provide the unbiased perspective needed to truly understand your 
            vulnerabilities before malicious actors can exploit them."
          </h2>
          <div className="flex flex-col items-center">
            <p className="font-semibold text-lg text-sapp-dark">Global Head of Security</p>
            <p className="text-sapp-gray">International Technology Firm</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
