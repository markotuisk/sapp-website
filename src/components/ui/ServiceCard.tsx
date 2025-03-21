
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  delay?: number;
  href: string;
}

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  items, 
  delay = 0,
  href 
}: ServiceCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-xl overflow-hidden group transition-all duration-700 shadow-md hover:shadow-xl border border-gray-100 h-full flex flex-col",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      <div className="p-6 flex-grow">
        <div className="bg-sapp-blue/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-sapp-blue group-hover:text-white">
          {icon}
        </div>
        <h3 className="text-xl font-display font-semibold mb-2 text-sapp-dark">{title}</h3>
        <p className="text-sapp-gray text-sm mb-6">{description}</p>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
              <span className="text-sm text-sapp-gray">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-100">
        <a
          href={href}
          className="flex items-center justify-between px-6 py-4 text-sapp-blue font-medium text-sm group-hover:bg-sapp-blue/5 transition-colors"
        >
          <span>Learn more</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
