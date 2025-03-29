
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import TranslatedText from '@/components/ui/TranslatedText';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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
            <TranslatedText textKey="headline" />
          </h1>
          
          <p 
            className={cn(
              "text-lg md:text-xl text-sapp-gray mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <TranslatedText textKey="subheadline" />
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
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                <TranslatedText textKey="exploreServices" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-sapp-dark text-sapp-dark hover:bg-sapp-dark/10 w-full sm:w-auto transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
                <TranslatedText textKey="contactUs" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - Fixed to bottom of viewport */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <a href="#about" className="flex flex-col items-center text-sapp-gray hover:text-sapp-blue transition-colors duration-300 group">
          <span className="text-xs font-medium mb-2 group-hover:translate-y-1 transition-transform">
            <TranslatedText textKey="discoverMore" />
          </span>
          <ChevronDown className="h-5 w-5 group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
