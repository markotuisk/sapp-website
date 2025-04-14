
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const QuoteSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Industry Leader Opinion</h3>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div
            className={cn(
              "bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center transition-all duration-500",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="mb-6">
              <svg
                className="h-10 w-10 text-sapp-blue/40 mx-auto"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </div>
            <blockquote className="text-xl md:text-2xl font-display text-sapp-dark mb-5">
              "Independent security audits have become an essential component of our global security strategy. They provide the objective assessment we need to identify blind spots and ensure compliance with international standards."
            </blockquote>
            <div className="mt-4">
              <span className="text-sapp-dark font-semibold">Global Head of Security</span>
              <p className="text-sapp-gray text-sm">International Technology Firm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
