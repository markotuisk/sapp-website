
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Animated } from '@/components/ui/AnimatedElements';

const InsightQuote = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-sapp-blue/5 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className="max-w-3xl mx-auto text-center"
        >
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
                "We recognise that security is a cost item and a hard sell. Our commercial skills and expertise are embedded into our core service delivery supporting your internal security sell."
              </p>
            </blockquote>
            <footer className="text-sm text-sapp-gray font-light">
              — Raili Maripuu, Founder & Commercial Director, SAPP Security
            </footer>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default InsightQuote;
