
import React from 'react';
import { Shield, Lock, Eye, Search } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const BenefitsSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: Search,
      title: "Detect Hidden Devices",
      description: "Discover covert surveillance devices using specialized equipment and methodologies."
    },
    {
      icon: Shield,
      title: "Protect Conversations & Data",
      description: "Ensure your sensitive discussions and information remain private and secure."
    },
    {
      icon: Eye,
      title: "Discreet, Non-Disruptive Methods",
      description: "Our processes are subtle and minimally invasive to your daily operations."
    },
    {
      icon: Lock,
      title: "Certified, Independent Engineers",
      description: "Fully qualified professionals with extensive experience and industry certifications."
    }
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div 
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
            Why Choose Our TSCM Services
          </h2>
          <p className="text-lg text-sapp-gray">
            Comprehensive technical surveillance countermeasures from certified professionals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={cn(
                "group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="h-2 bg-gradient-to-r from-sapp-blue to-accent-dark-blue transform origin-left transition-all duration-300 group-hover:scale-x-100"></div>
              <div className="p-7">
                <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-sapp-blue/10 transition-all duration-300">
                  <benefit.icon className="h-7 w-7 text-sapp-blue" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-sapp-dark group-hover:text-sapp-blue transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-sapp-gray">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
