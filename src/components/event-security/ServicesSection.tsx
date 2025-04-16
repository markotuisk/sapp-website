
import React from 'react';
import ServiceCard from '@/components/ui/ServiceCard';

interface ServicesSectionProps {
  serviceDetails: Array<{
    title: string;
    description: string;
    href: string;
    imagePath: string;
  }>;
  onLearnMore: (serviceTitle: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ serviceDetails, onLearnMore }) => {
  return (
    <section className="py-16 bg-slate-50" id="executive-events">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Security Solutions</h3>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">
            Event Security Services We Offer
          </h2>
          <p className="text-sapp-gray">
            Our comprehensive suite of event security services provides tailored protection for your confidential corporate meetings and executive gatherings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceDetails.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              items={[]}
              href={service.href}
              imagePath={service.imagePath}
              onLearnMoreClick={() => onLearnMore(service.title)}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
