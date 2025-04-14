
import React from 'react';
import { Quote } from 'lucide-react';

const QuoteSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
            <Quote className="h-10 w-10 mx-auto text-sapp-blue/20 mb-6" />
            <blockquote className="mb-6">
              <p className="text-2xl md:text-3xl font-display font-medium text-sapp-dark mb-8 leading-relaxed italic">
                "In today's rapidly evolving security landscape, independent audits aren't a luxury—they're 
                essential. They provide the unbiased perspective needed to truly understand your 
                vulnerabilities before malicious actors can exploit them."
              </p>
            </blockquote>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-lg text-sapp-dark">Global Head of Security</p>
              <p className="text-sapp-gray">International Technology Firm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
