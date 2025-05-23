
import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';

const SecurityAuditsQuoteSection = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium">
              SECURITY AUDIT IMPACT
            </h3>
          </div>
        </div>
        <QuoteCard
          quote="An external security audit provides credibility and confidence to management and shareholders that the organisation is compliant and best protected against any information security risks."
          author="SAPP Customer"
          position="Global Head of Security, International Technology Firm"
        />
      </div>
    </section>
  );
};

export default SecurityAuditsQuoteSection;
