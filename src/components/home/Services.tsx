
import React from 'react';
import { servicesData } from '../../data/servicesData';
import ServiceCard from '../ui/ServiceCard';

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h3 className="uppercase text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium">
          OUR COMPETENCE
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
