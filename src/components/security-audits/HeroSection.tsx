import React from 'react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <h1 
            id="security-audits-heading"
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100 leading-tight",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            ref={ref}
          >
            Independent <span className="text-sapp-blue">security audits</span> and assessments
          </h1>
          
          <p 
            className={cn(
              "text-sapp-gray text-lg md:text-xl mb-8 transition-all duration-500 delay-200 max-w-3xl mx-auto",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Protect your organisation with accredited security audits and penetration testing.
          </p>
          
          <p 
            className={cn(
              "text-md text-sapp-blue italic mb-4 max-w-xl mx-auto opacity-70 transition-all duration-500 delay-300",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Cut through complexity
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 delay-300",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 w-full sm:w-auto transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                Book a Consultation
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
