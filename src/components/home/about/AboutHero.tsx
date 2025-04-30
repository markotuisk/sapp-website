
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const AboutHero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about-hero-section" className="relative overflow-hidden bg-white">
      {/* Navigation offset - ensures content starts below fixed navbar */}
      <div className="h-24 md:h-28"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-1">
            <div className="max-w-2xl" ref={ref}>
              <h1 
                id="about-heading"
                className={cn(
                  "text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-8 md:mb-10 text-sapp-dark tracking-tight",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Security expertise built on competence, integrity and experience
              </h1>
              
              <p 
                className={cn(
                  "text-sapp-gray text-xl mb-8 transition-all duration-500 delay-200 max-w-xl",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                SAPP Security unifies combined backgrounds in corporate security, technology, counter espionage, law, banking, engineering and information security.
              </p>
            </div>
          </div>
          
          <div className="order-2 lg:order-2">
            <div 
              className={cn(
                "relative transition-all duration-500 delay-300",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
                <AspectRatio ratio={4/3} className="w-full">
                  <img 
                    src="/lovable-uploads/7708cec8-524d-4c91-ba6b-9a96ddf50e70.png" 
                    alt="SAPP Security Team" 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <div className="p-6 md:p-8">
                  <h3 className="font-display font-semibold text-xl md:text-2xl mb-3 text-accent-dark-blue">Trusted Professionals</h3>
                  <p className="text-sapp-gray">Our team combines industry expertise with innovative approach and personalized service to ensure your security needs are met with excellence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
