
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ServicesOverlay from '@/components/ui/ServicesOverlay';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-display font-bold text-sapp-dark leading-tight mb-6 transition-all duration-700",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Your <span className="text-[#20798C]">trusted</span> <span className="text-inherit">technical</span> <span className="text-[#20798C]">security</span> and <span className="text-inherit">privacy</span> <span className="text-[#20798C]">partner</span>
          </h1>
          
          <p 
            className={cn(
              "text-lg md:text-xl text-sapp-gray mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Helping corporate clients with technical <span className="text-[#20798C]">security</span> services to seamlessly align compliance, physical and cyber security
          </p>
          
          <p 
            className={cn(
              "text-md text-sapp-blue italic mb-4 max-w-xl mx-auto opacity-70 transition-all duration-700 delay-300 text-center",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Cut through complexity
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 w-full sm:w-auto transition-all duration-300 group relative overflow-hidden"
              onClick={() => setServicesOpen(true)}
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                Rapid Service Navigator
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>
          </div>
        </div>
      </div>

      <ServicesOverlay 
        open={servicesOpen}
        onOpenChange={setServicesOpen}
      />
    </section>
  );
};

export default Hero;
