
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const AboutHero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-1">
            <div className="max-w-2xl" ref={ref}>
              <h1 
                id="about-heading"
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-sapp-dark",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Security expertise built on competence, integrity and experience
              </h1>
              
              <p 
                className={cn(
                  "text-sapp-gray text-lg mb-8 transition-all duration-500 delay-200",
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
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/7708cec8-524d-4c91-ba6b-9a96ddf50e70.png" 
                  alt="SAPP Security Team" 
                  className="w-full h-auto object-cover"
                />
                <div className="p-6">
                  <h3 className="font-display font-semibold text-xl mb-2 text-accent-dark-blue">Trusted Professionals</h3>
                  <p className="text-sapp-gray text-sm">Our team combines industry expertise with innovative approach and personalized service to ensure your security needs are met with excellence.</p>
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
