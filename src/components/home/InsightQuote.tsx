
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Animated } from '@/components/ui/AnimatedElements';
import { Quote } from 'lucide-react';

const InsightQuote = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-10 bg-sapp-blue/5 relative overflow-hidden">
      <div className="container mx-auto px-4">
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
                  "An external security audit provides credibility and confidence to management and shareholders that the organisation is compliant and best protected against any information security risks."
                </p>
              </blockquote>
              <footer className="flex items-center">
                <div>
                  <p className="font-semibold text-sapp-dark">Raili Maripuu</p>
                  <p className="text-sm text-sapp-gray">Commercial Director, SAPP Security</p>
                </div>
              </footer>
            </Animated>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightQuote;
