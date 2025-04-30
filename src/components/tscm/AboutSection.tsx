
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const AboutSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 md:py-24 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={cn(
            "transition-all duration-700",
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <div className="bg-gradient-to-br from-slate-200 to-white rounded-xl h-96 shadow-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center">
                  <span className="text-5xl mb-3 block text-sapp-blue/40">🛡️</span>
                  <span className="text-xl font-medium text-sapp-gray">SAPP Security TSCM Team</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "transition-all duration-700 delay-300",
            inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              Expert TSCM Services from SAPP Security
            </h2>
            
            <p className="text-lg text-sapp-gray mb-6">
              SAPP Security is a specialized provider of Technical Surveillance Countermeasures, offering discreet, professional bug sweeping and counterespionage services to protect high-value corporate environments and private individuals.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-sapp-blue/10 flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-sapp-blue font-semibold">01</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-sapp-dark">Discretion and Confidentiality</h3>
                  <p className="text-sapp-gray">We understand the sensitive nature of surveillance concerns and maintain absolute confidentiality.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-sapp-blue/10 flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-sapp-blue font-semibold">02</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-sapp-dark">Expertise and Innovation</h3>
                  <p className="text-sapp-gray">Our team of certified engineers uses cutting-edge equipment and techniques.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-sapp-blue/10 flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-sapp-blue font-semibold">03</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-sapp-dark">Ethical, Non-invasive Solutions</h3>
                  <p className="text-sapp-gray">We provide thorough inspections with minimal disruption to your operations.</p>
                </div>
              </div>
            </div>
            
            <p className="text-lg font-medium text-sapp-blue italic">
              "We don't just sweep—we give you peace of mind."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
