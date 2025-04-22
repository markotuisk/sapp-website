
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Animated } from '@/components/ui/AnimatedElements';
import { Quote } from 'lucide-react';

interface QuoteCardProps {
  quote: string;
  author: string;
  position: string;
  delay?: number;
}

const QuoteCard = ({ quote, author, position, delay = 100 }: QuoteCardProps) => {
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
          "bg-gradient-to-br from-[#F1F0FB] to-[#E6E5F9] rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] border border-gray-100/50 overflow-hidden transition-all duration-200 ease-in-out p-8",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: inView ? '100ms' : '0ms' }}
      >
        <Quote className="h-12 w-12 text-sapp-blue/20 mb-4" />
        <Animated
          animation="fade-up"
          delay={delay}
          className={cn(
            "transition-all duration-500",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <blockquote className="mb-6">
            <p className="text-xl md:text-2xl font-display italic text-sapp-dark leading-relaxed">
              "{quote}"
            </p>
          </blockquote>
          <footer className="flex items-center">
            <div>
              <p className="font-semibold text-sapp-dark">{author}</p>
              <p className="text-sm text-sapp-gray">{position}</p>
            </div>
          </footer>
        </Animated>
      </div>
    </div>
  );
};

export default QuoteCard;
