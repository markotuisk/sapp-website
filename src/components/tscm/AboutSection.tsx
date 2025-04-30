
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Shield } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={cn(
            "transition-all duration-1000",
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-white rounded-2xl h-96 shadow-lg overflow-hidden relative before:absolute before:inset-0 before:bg-grid before:opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-sapp-blue/5 to-accent-dark-blue/5"></div>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                    <Shield className="h-16 w-16 text-sapp-blue/70 mx-auto mb-4" />
                    <span className="text-xl font-medium text-sapp-dark">SAPP Security TSCM Team</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-sapp-blue/10 rounded-full"></div>
              <div className="absolute -top-4 -left-4 h-16 w-16 bg-sapp-blue/10 rounded-full"></div>
            </div>
          </div>
          
          <div className={cn(
            "transition-all duration-1000 delay-300",
            inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              Expert TSCM Services from SAPP Security
            </h2>
            
            <p className="text-lg text-sapp-gray mb-6">
              SAPP Security is a specialized provider of Technical Surveillance Countermeasures, offering discreet, professional bug sweeping and counterespionage services to protect high-value corporate environments and private individuals.
            </p>
            
            <div className="space-y-6 mb-8">
              {[
                {
                  number: "01",
                  title: "Discretion and Confidentiality",
                  description: "We understand the sensitive nature of surveillance concerns and maintain absolute confidentiality."
                },
                {
                  number: "02",
                  title: "Expertise and Innovation",
                  description: "Our team of certified engineers uses cutting-edge equipment and techniques."
                },
                {
                  number: "03",
                  title: "Ethical, Non-invasive Solutions",
                  description: "We provide thorough inspections with minimal disruption to your operations."
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start transition-all duration-700 transform"
                  style={{ 
                    transitionDelay: `${400 + (index * 200)}ms`,
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <div className="w-14 h-14 rounded-xl bg-sapp-blue/10 flex items-center justify-center flex-shrink-0 mr-5 border border-sapp-blue/20">
                    <span className="text-sapp-blue font-semibold">{item.number}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-sapp-dark">{item.title}</h3>
                    <p className="text-sapp-gray">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div 
              className="p-5 bg-gradient-to-r from-sapp-blue/5 to-accent-dark-blue/5 rounded-lg border-l-4 border-sapp-blue"
              style={{ 
                transitionDelay: `1000ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <p className="text-lg font-medium text-sapp-blue italic">
                "We don't just sweep—we give you peace of mind."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
