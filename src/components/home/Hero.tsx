
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
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{ 
          backgroundImage: "url('/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png')",
          backgroundBlendMode: "overlay"
        }}
      ></div>
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
          "absolute w-64 h-64 rounded-full bg-sapp-dark/5 blur-3xl bottom-20 -left-20 transition-all duration-3000",
          isLoaded ? "opacity-30 animate-float" : "opacity-0"
        )}
      ></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-left md:w-1/2">
            {/* Headline */}
            <h1 
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-display font-bold text-sapp-dark leading-tight mb-6 transition-all duration-700",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <TranslatedText textKey="headline" />
            </h1>
            
            {/* Subheadline */}
            <p 
              className={cn(
                "text-lg md:text-xl text-sapp-gray mb-8 transition-all duration-700 delay-200",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <TranslatedText textKey="subheadline" />
            </p>
            
            {/* CTA Buttons */}
            <div 
              className={cn(
                "flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300",
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
          
          {/* Hero image */}
          <div 
            className={cn(
              "relative md:w-1/2 transition-all duration-1000 delay-500",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            )}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
              <img 
                src="/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png" 
                alt="Security Technology" 
                className="relative z-10 rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sapp-blue/10 rounded-full blur-xl"></div>
            </div>
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
