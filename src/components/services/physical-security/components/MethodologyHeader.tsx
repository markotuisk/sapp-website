
import React from 'react';
import { Animated } from '@/components/ui/AnimatedElements';

const MethodologyHeader: React.FC = () => {
  return (
    <Animated animation="fade-up">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
          <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Methodology</h3>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
          Comprehensive Security Assessment Process
        </h2>
        <p className="text-sapp-gray max-w-3xl mx-auto">
          Our assessment process is methodical and thorough, designed to identify vulnerabilities in your physical security infrastructure and provide actionable recommendations.
        </p>
      </div>
    </Animated>
  );
};

export default MethodologyHeader;
