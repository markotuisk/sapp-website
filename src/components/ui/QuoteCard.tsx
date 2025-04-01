
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

interface QuoteCardProps {
  quote: string;
  author: string;
  role: string;
  color?: 'blue' | 'dark';
  delay?: number;
}

const QuoteCard = ({
  quote,
  author,
  role,
  color = 'blue',
  delay = 0
}: QuoteCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const bgColor = color === 'blue' 
    ? 'bg-sapp-blue' 
    : 'bg-sapp-dark';

  return (
    <div
      ref={ref}
      className={cn(
        `${bgColor} rounded-xl p-6 text-white relative overflow-hidden transition-all duration-700`,
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {/* Animated background elements */}
      <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-white/5 blur-xl"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
      
      <div className="relative z-10">
        <p className="text-lg font-display italic mb-6 leading-relaxed">
          "{quote}"
        </p>
        <div className="flex flex-col">
          <span className="font-semibold text-white/95">{author}</span>
          <span className="text-sm text-white/70">{role}</span>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
