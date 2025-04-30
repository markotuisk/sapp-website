
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const ServicesSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      title: "Corporate TSCM Inspections",
      description: "Protect your boardrooms, executive offices, and other sensitive spaces from corporate espionage.",
      features: [
        "Full spectrum RF analysis",
        "Physical search for hidden devices",
        "Meeting room security assessment",
        "Secure communications consulting"
      ],
      path: "/tscm/corporate"
    },
    {
      title: "Private & Residential TSCM",
      description: "Ensure your home and personal spaces remain private and free from unwanted surveillance.",
      features: [
        "Home-wide electronic sweep",
        "Vehicle inspection",
        "Personal device security check",
        "Privacy enhancement recommendations"
      ],
      path: "/tscm/residential"
    },
    {
      title: "Vehicle & Travel TSCM",
      description: "Secure your vehicles, hotel rooms, and temporary spaces during travel and important events.",
      features: [
        "Vehicle bug sweeps",
        "Hotel room inspections",
        "Temporary secure zones",
        "Travel security protocols"
      ],
      path: "/tscm/travel"
    },
    {
      title: "Enterprise TSCM Programs",
      description: "Ongoing protection and monitoring for organizations requiring continuous security assurance.",
      features: [
        "Regular scheduled inspections",
        "Staff security awareness training",
        "Technical security policies",
        "Incident response planning"
      ],
      path: "/tscm/enterprise"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="services" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
            Our TSCM Services
          </h2>
          <p className="text-lg text-sapp-gray">
            Comprehensive technical surveillance countermeasures tailored to your specific needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} 
              className={cn(
                "transition-all duration-700 transform",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-display text-sapp-dark">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-sapp-blue mr-2 text-lg">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-4 bg-sapp-blue hover:bg-sapp-blue/90 text-white w-full" asChild>
                    <Link to={service.path}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="border-sapp-blue text-sapp-blue hover:bg-sapp-blue/10">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
