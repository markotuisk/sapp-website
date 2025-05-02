
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const NavigationButtons = () => {
  return (
    <div className="flex justify-between items-center">
      <Link to="/installations/cctv-access">
        <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
          <ArrowLeft className="h-4 w-4" />
          CCTV & Access Control
        </Button>
      </Link>
      <Link to="/installations/counter-surveillance">
        <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
          Counter-Surveillance
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default NavigationButtons;
