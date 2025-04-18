
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NavigationButtons = () => {
  return (
    <div className="flex justify-between items-center">
      <Link to="/services/event-monitoring">
        <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
          <ArrowLeft className="h-4 w-4" />
          Previous: Event Monitoring
        </Button>
      </Link>
      <Link to="/services/close-protection">
        <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
          Next: Close Protection
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default NavigationButtons;
