
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  icon?: React.ReactNode; // Made optional as we'll be removing icons
  title: string;
  description: string;
  items: string[];
  delay?: number;
  href: string;
  imagePath?: string;
  onLearnMoreClick?: () => void;
}

const ServiceCard = ({ 
  title, 
  description, 
  items, 
  delay = 0,
  href,
  imagePath,
  onLearnMoreClick
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
      {imagePath && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imagePath} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
        </div>
      )}
      
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-display font-semibold mb-2 text-sapp-dark">{title}</h3>
        <p className="text-sapp-gray text-sm mb-6">{description}</p>
        {items.length > 0 && (
          <ul className="space-y-2 mb-6">
            {items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                <span className="text-sm text-sapp-gray">{item}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Link to={href} className="w-full">
            <Button 
              variant="outline" 
              className="w-full transition-all duration-300 hover:bg-gray-100"
              aria-label={`Read more about ${title}`}
            >
              Read Details
            </Button>
          </Link>
          <Button 
            className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white transition-all duration-300"
            aria-label={`Learn more about ${title}`}
            onClick={onLearnMoreClick}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
