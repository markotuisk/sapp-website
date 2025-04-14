
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Animated } from '@/components/ui/AnimatedElements';
import { Quote } from 'lucide-react';

const QuoteSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Industry Leader Opinion</h3>
          </div>
        </div>
        <div
          ref={ref}
          className="max-w-3xl mx-auto"
        >
          <div 
            className={cn(
              "bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 overflow-hidden transition-all duration-200 ease-in-out p-8",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: inView ? '100ms' : '0ms' }}
          >
            <Quote className="h-12 w-12 text-sapp-blue/20 mb-4" />
            <Animated
              animation="fade-up"
              delay={100}
              className={cn(
                "transition-all duration-500",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <blockquote className="mb-6">
                <p className="text-xl md:text-2xl font-display italic text-sapp-dark leading-relaxed">
                  "Security isn't something you buy, it's something you do, and it takes trained professionals to do it effectively."
                </p>
              </blockquote>
              <footer className="flex items-center">
                <div>
                  <p className="font-semibold text-sapp-dark">Bruce Schneier</p>
                  <p className="text-sm text-sapp-gray">Security Technologist</p>
                </div>
              </footer>
            </Animated>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
