
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const NavigationButtons: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-8 border-t border-gray-100">
        <Link to="/services/physical-security-assessments">
          <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
            <ArrowLeft className="h-4 w-4" />
            Back to Physical Security Assessments
          </Button>
        </Link>
        <Link to="/tscm">
          <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
            Learn more about TSCM
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavigationButtons;
