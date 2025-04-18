
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onRequestAssessment: () => void;
}

const HeroSection = ({ onRequestAssessment }: HeroSectionProps) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link to="/security-audits">
            <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
              <ArrowLeft className="h-4 w-4" />
              Back to Security Audits
            </Button>
          </Link>
          <Link to="/services/tscm-inspections">
            <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
              Next: TSCM Inspections
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Security Assessment</h3>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
            Physical Security Assessments
          </h1>
          <p className="text-lg text-sapp-gray mb-8 max-w-2xl mx-auto">
            Comprehensive evaluation of your organization's physical security measures to identify vulnerabilities and strengthen your security posture against potential threats.
          </p>
          <Button 
            size="lg" 
            className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
            onClick={onRequestAssessment}
          >
            Request an Assessment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
