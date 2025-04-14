
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
    <section className="py-16 bg-sapp-blue/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Industry Leader Opinion</h3>
          </div>
        </div>
        <div
          ref={ref}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
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
                  "In our increasingly connected world, cyber security isn't just an IT concern—it's a fundamental business imperative that impacts every aspect of modern operations."
                </p>
              </blockquote>
              <footer className="flex items-center">
                <div>
                  <p className="font-semibold text-sapp-dark">Dr. Ian Levy</p>
                  <p className="text-sm text-sapp-gray">Former Technical Director, NCSC</p>
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
