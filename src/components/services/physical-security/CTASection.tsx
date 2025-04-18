import React from 'react';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  /** Callback function triggered when user requests an assessment */
  onRequestAssessment: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onRequestAssessment }) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-sapp-dark rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sapp-navy to-transparent opacity-80"></div>
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <Shield className="h-64 w-64 text-sapp-blue/10" />
          </div>
          
          <div className="relative z-10 md:max-w-xl">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              Identify Security Vulnerabilities
            </h3>
            <p className="text-gray-300 mb-6">
              Our comprehensive security assessments help you identify and address vulnerabilities before they can be exploited.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors"
                onClick={onRequestAssessment}
              >
                Request Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
