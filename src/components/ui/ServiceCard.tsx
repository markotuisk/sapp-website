
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { Animated } from '@/components/ui/AnimatedElements';

interface ServiceCardProps {
  title: string;
  description: string;
  items?: string[];
  delay?: number;
  href: string;
  imagePath?: string;
  onLearnMoreClick?: () => void;
}

const ServiceCard = ({ 
  title, 
  description, 
  items = [], 
  delay = 0,
  href,
  imagePath,
  onLearnMoreClick
}: ServiceCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const handleNavigation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 overflow-hidden transition-all duration-200 ease-in-out h-full flex flex-col",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >      
      <Animated animation="fade-up" delay={delay + 100} className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-display font-semibold mb-3 text-sapp-dark">{title}</h3>
        <p className="text-sapp-gray text-sm mb-4 flex-grow">{description}</p>
        
        <div className="flex flex-row gap-2 mt-2">
          <Link 
            to={href} 
            onClick={handleNavigation}
            aria-label={`Discover our ${title.toLowerCase()} solutions and services`}
          >
            <Button 
              variant="outline" 
              className="text-sm border-sapp-blue text-sapp-dark rounded-md font-medium transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md"
            >
              {`Explore ${title}`}
            </Button>
          </Link>
          <Button 
            className="bg-sapp-blue hover:bg-sapp-blue/90 text-white text-sm rounded-md font-medium transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md"
            onClick={() => setContactDialogOpen(true)}
            aria-label={`Get detailed information about our ${title.toLowerCase()} services`}
          >
            {`Request ${title} Details`}
          </Button>
        </div>
      </Animated>
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage={`I'm interested in learning more about ${title} services.`}
        serviceName={title}
      />
    </div>
  );
};

export default ServiceCard;
