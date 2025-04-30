
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const NavigationButtons: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8 border-t border-gray-100">
        <Link to="/services/physical-security-assessments">
          <Button 
            variant="outline" 
            className={cn(
              "flex items-center gap-2 transition-all duration-500 hover:translate-x-[-5px]",
              inView ? "opacity-100" : "opacity-0 -translate-x-6"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Physical Security Assessments
          </Button>
        </Link>
        <Link to="/tscm">
          <Button 
            variant="outline" 
            className={cn(
              "flex items-center gap-2 transition-all duration-500 hover:translate-x-[5px] bg-sapp-blue/10 text-sapp-blue border-sapp-blue/30 hover:bg-sapp-blue/20",
              inView ? "opacity-100" : "opacity-0 translate-x-6"
            )}
          >
            Learn more about TSCM
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavigationButtons;
