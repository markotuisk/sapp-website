
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const NavigationButtons: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-8 border-t border-gray-100">
        <Link to="/services/venue-security-audits">
          <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
            <ArrowLeft className="h-4 w-4" />
            Back to Venue Security Audits
          </Button>
        </Link>
        <Link to="/services/technology-systems-testing">
          <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
            Next: Technology & Systems Testing
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavigationButtons;
