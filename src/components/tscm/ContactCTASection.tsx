
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';

const ContactCTASection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-gradient-to-br from-sapp-dark via-sapp-dark to-accent-dark-blue text-white relative overflow-hidden">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-grid"></div>
      </div>
      
      {/* Accent circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-sapp-blue/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-dark-blue/20 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={cn(
            "max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10 transition-all duration-1000",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
                Ready to Secure Your Environment?
              </h2>
              
              <p className="text-lg md:text-xl text-gray-200 mb-6">
                Contact our TSCM specialists for a confidential consultation and free estimate.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Certified TSCM professionals",
                  "Non-invasive, discreet procedures",
                  "Comprehensive detection & reporting",
                  "24/7 emergency availability"
                ].map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-center transition-all duration-700"
                    style={{ 
                      transitionDelay: `${400 + (index * 150)}ms`,
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateX(0)' : 'translateX(-20px)'
                    }}
                  >
                    <span className="w-5 h-5 rounded-full bg-sapp-blue/20 flex items-center justify-center mr-3">
                      <span className="block h-2 w-2 rounded-full bg-sapp-blue"></span>
                    </span>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-sm text-gray-300">
                All inquiries are treated with the utmost confidentiality. Our specialists are available 24/7 for urgent matters.
              </p>
            </div>
            
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div 
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg transform transition-all duration-700 delay-300"
                style={{ 
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="flex flex-col gap-5">
                  <Button 
                    size="lg" 
                    className="bg-white text-sapp-blue hover:bg-white/90 text-lg py-6 h-auto shadow-lg flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Request a Free Estimate
                  </Button>
                  
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 text-lg py-6 h-auto flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-1"
                  >
                    Contact Us
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTASection;
