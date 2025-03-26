
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-sapp-dark/90 to-sapp-dark/95">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/8ed7fc27-08e3-4ab1-a9e2-7abb4096e4a4.png" 
          alt="Connected security network" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sapp-dark/70 via-sapp-dark/80 to-sapp-dark/95"></div>
      </div>
      
      {/* Animated network lines */}
      <div className="absolute inset-0 z-0">
        <div className="bg-grid opacity-20"></div>
      </div>
      
      {/* Floating security elements - using the red accent color from the image */}
      <div 
        className={cn(
          "absolute w-48 h-48 rounded-full bg-red-500/10 blur-3xl -top-10 -right-10 transition-all duration-2000",
          isLoaded ? "opacity-40 animate-float" : "opacity-0"
        )}
      ></div>
      <div 
        className={cn(
          "absolute w-64 h-64 rounded-full bg-red-500/5 blur-3xl bottom-20 -left-20 transition-all duration-3000",
          isLoaded ? "opacity-30 animate-float" : "opacity-0"
        )}
      ></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6 transition-all duration-700",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Securing Tomorrow: 
            <span className="block">
              <span className="text-red-500">Strategic Risk Control</span> in a Connected World
            </span>
          </h1>
          
          {/* Subheadline */}
          <p 
            className={cn(
              "text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Physical and Digital, Seamlessly Protected.
            Technical security for UK and European corporates, safeguarding meetings, events, and infrastructure.
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
              className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 w-full sm:w-auto transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">Explore Services</span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto transition-all duration-300 group relative"
            >
              <span className="relative z-10 group-hover:text-red-300 transition-colors duration-300">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Animated connection lines - inspired by the image */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-sapp-dark to-transparent"></div>
        <div className="absolute bottom-0 left-1/4 w-0.5 h-16 bg-red-500/50 animate-connection-1"></div>
        <div className="absolute bottom-0 left-1/3 w-0.5 h-24 bg-red-500/30 animate-connection-2"></div>
        <div className="absolute bottom-0 left-1/2 w-0.5 h-20 bg-red-500/40 animate-connection-3"></div>
        <div className="absolute bottom-0 left-2/3 w-0.5 h-16 bg-red-500/50 animate-connection-2"></div>
        <div className="absolute bottom-0 left-3/4 w-0.5 h-24 bg-red-500/30 animate-connection-1"></div>
      </div>
      
      {/* Scroll indicator - Fixed to bottom of viewport */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <a href="#about" className="flex flex-col items-center text-gray-300 hover:text-red-400 transition-colors duration-300 group">
          <span className="text-xs font-medium mb-2 group-hover:translate-y-1 transition-transform">Discover More</span>
          <ChevronDown className="h-5 w-5 group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
