
import React from 'react';
import SecurityVulnerabilitiesCTA from '../shared/SecurityVulnerabilitiesCTA';

interface CTASectionProps {
  onRequestAssessment: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onRequestAssessment }) => {
  return <SecurityVulnerabilitiesCTA onRequestAssessment={onRequestAssessment} />;
};

export default CTASection;
