
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  features: string[];
  className?: string;
  delay?: number;
}

const FeatureCard = ({ 
  title, 
  features, 
  className,
  delay = 0 
}: FeatureCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 overflow-hidden transition-all duration-200 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      <div className="p-6">
        <h3 className="text-lg font-display font-semibold mb-4 pb-4 border-b border-gray-100 text-sapp-dark">
          {title}
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start py-1">
              <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
              <span className="text-sm text-sapp-gray">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeatureCard;
