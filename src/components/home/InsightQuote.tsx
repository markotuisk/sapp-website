
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const InsightQuote = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
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
              "The best security assessment approach is to think like an attacker."
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
  );
};

export default InsightQuote;
