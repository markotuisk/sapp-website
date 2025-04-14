
import React from 'react';
import QuoteCard from '@/components/ui/QuoteCard';
import { Animated } from '@/components/ui/AnimatedElements';

const InsightQuote = () => {
  return (
    <Animated animation="fade-up" delay={100}>
      <QuoteCard
        quote="The best security assessment approach is to think like an attacker."
        author="Bruce Schneier"
        position="Security Technologist"
      />
    </Animated>
  );
};

export default InsightQuote;
