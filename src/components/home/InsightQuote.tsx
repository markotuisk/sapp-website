
import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';
import { Animated } from '@/components/ui/AnimatedElements';

const InsightQuote = () => {
  return (
    <Animated animation="fade-up" delay={100}>
      <QuoteCard
        quote="We recognise that security is a cost item and a hard sell. Our commercial skills and expertise help and support your internal security sell."
        author="Raili Maripuu"
        position="SAPP Founder and Commercial Director"
      />
    </Animated>
  );
};

export default InsightQuote;
