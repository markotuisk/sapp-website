
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, Home, Car, Building } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Briefcase className="h-6 w-6 text-sapp-blue" />,
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
      icon: <Home className="h-6 w-6 text-sapp-blue" />,
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
      icon: <Car className="h-6 w-6 text-sapp-blue" />,
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
      icon: <Building className="h-6 w-6 text-sapp-blue" />,
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
    <section ref={ref} className="py-20 md:py-28 bg-white" id="services">
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
            Our TSCM Services
          </h2>
          <p className="text-lg text-sapp-gray">
            Comprehensive technical surveillance countermeasures tailored to your specific needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 border border-gray-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="p-7">
                <div className="flex items-center mb-5">
                  <div className="w-12 h-12 bg-sapp-blue/10 rounded-full flex items-center justify-center mr-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-sapp-dark">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-sapp-gray mb-6">
                  {service.description}
                </p>
                
                <div className="bg-gray-50 rounded-lg p-5 mb-6">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-5 h-5 bg-sapp-blue/10 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="block h-1.5 w-1.5 rounded-full bg-sapp-blue"></span>
                        </span>
                        <span className="text-sm text-sapp-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white transition-all duration-300 hover:shadow-lg" 
                  asChild
                >
                  <Link to={service.path}>Learn More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-sapp-blue text-sapp-blue hover:bg-sapp-blue/10 hover:shadow-lg transition-all duration-300"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
