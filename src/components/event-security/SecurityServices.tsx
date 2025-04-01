
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '@/components/ui/ServiceCard';
import LearnMoreModal from '@/components/ui/LearnMoreModal';

interface SecurityService {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  href: string;
  imagePath: string;
}

interface SecurityServicesProps {
  services: SecurityService[];
}

const SecurityServices: React.FC<SecurityServicesProps> = ({ services }) => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleLearnMoreClick = (index: number) => {
    setSelectedService(index);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleContactClick = () => {
    navigate('/#contact');
    setSelectedService(null);
  };

  return (
    <section id="executive-events" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-sapp-dark mb-4 text-center">
          How We Secure Executive Events
        </h2>
        <p className="text-sapp-gray text-center max-w-3xl mx-auto mb-12">
          Our specialized services are designed to provide comprehensive protection for sensitive corporate meetings and executive gatherings.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div key={index} className="h-full">
              <ServiceCard 
                {...service}
                delay={100 * (index + 1)}
                onLearnMoreClick={() => handleLearnMoreClick(index)}
              />
            </div>
          ))}
        </div>
        
        {selectedService !== null && (
          <LearnMoreModal
            title={services[selectedService].title}
            description={services[selectedService].description}
            features={services[selectedService].items}
            isOpen={selectedService !== null}
            onClose={handleCloseModal}
            onContact={handleContactClick}
          />
        )}
      </div>
    </section>
  );
};

export default SecurityServices;
