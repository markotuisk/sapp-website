
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-50">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60"></div>
      
      {/* Floating security elements */}
      <div 
        className={cn(
          "absolute w-48 h-48 rounded-full bg-sapp-blue/10 blur-3xl -top-10 -right-10 transition-all duration-2000",
          isLoaded ? "opacity-40 animate-float" : "opacity-0"
        )}
      ></div>
      <div 
        className={cn(
          "absolute w-64 h-64 rounded-full bg-sapp-lightBlue/10 blur-3xl bottom-20 -left-20 transition-all duration-3000",
          isLoaded ? "opacity-30 animate-float" : "opacity-0"
        )}
      ></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo mark (animated) */}
          <div 
            className={cn(
              "inline-flex items-center justify-center p-3 bg-white rounded-full shadow-xl mb-6 transition-all duration-700",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            )}
          >
            <Shield className="h-10 w-10 text-sapp-blue" />
          </div>
          
          {/* Headline */}
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-display font-bold text-sapp-dark leading-tight mb-6 transition-all duration-700 delay-100",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Your trusted technical 
            <span className="block">
              <span className="text-sapp-blue">security</span> and privacy partner
            </span>
          </h1>
          
          {/* Subheadline */}
          <p 
            className={cn(
              "text-lg md:text-xl text-sapp-gray mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            We provide comprehensive technical security services for corporate clients worldwide,
            protecting your sensitive meetings, high-value events, and critical infrastructure.
          </p>
          
          {/* CTA Buttons */}
          <div 
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 w-full sm:w-auto transition-all duration-300"
            >
              Explore Services
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-sapp-blue text-sapp-blue hover:bg-sapp-blue/10 w-full sm:w-auto transition-all duration-300"
            >
              Contact Us
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="flex flex-col items-center text-sapp-gray hover:text-sapp-blue transition-colors">
            <span className="text-xs font-medium mb-2">Discover More</span>
            <ChevronDown className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
