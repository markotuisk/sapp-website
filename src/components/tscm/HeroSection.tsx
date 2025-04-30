
import React from 'react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Shield, Lock, Scan } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative bg-gradient-to-br from-sapp-dark to-accent-dark-blue pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-grid"></div>
      </div>
      
      <div 
        className={cn(
          "container mx-auto px-4 relative z-10 transition-all duration-1000",
          inView ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            <span className="inline-block transform transition-all duration-700 delay-100" 
                  style={{ transform: inView ? 'translateY(0)' : 'translateY(20px)' }}>
              Is Someone Listening?
            </span>
            <br />
            <span className="inline-block transform transition-all duration-700 delay-300 text-sapp-blue"
                  style={{ transform: inView ? 'translateY(0)' : 'translateY(20px)' }}>
              We Find Out.
            </span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-gray-200 mb-8 transform transition-all duration-700 delay-500"
            style={{ transform: inView ? 'translateY(0)' : 'translateY(20px)', opacity: inView ? 1 : 0 }}
          >
            Discreet TSCM Sweeps & Bug Detection Services for Business and Private Clients.
          </p>
          
          <div 
            className="mb-10 transform transition-all duration-700 delay-700"
            style={{ transform: inView ? 'translateY(0)' : 'translateY(20px)', opacity: inView ? 1 : 0 }}
          >
            <Button 
              size="lg"
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transform transition-all duration-300 hover:translate-y-[-2px]"
            >
              Request a Free Estimate
            </Button>
          </div>
          
          <p 
            className="text-gray-300 text-sm md:text-base transform transition-all duration-700 delay-900"
            style={{ opacity: inView ? 0.8 : 0 }}
          >
            Trusted by professionals in law, media, finance, and high-level security.
          </p>
        </div>
      </div>
      
      <div 
        className="max-w-6xl mx-auto mt-16 relative z-10 px-4 transform transition-all duration-1000 delay-500"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)' }}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-10 shadow-2xl border border-white/10">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-white text-center mb-8">
            How TSCM Works in 60 Seconds
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Scan className="h-8 w-8 text-sapp-blue" />,
                step: "1",
                title: "Assessment",
                desc: "We evaluate your needs and risk profile through discreet consultation"
              },
              {
                icon: <Shield className="h-8 w-8 text-sapp-blue" />,
                step: "2",
                title: "Inspection",
                desc: "Our experts sweep premises using advanced detection equipment"
              },
              {
                icon: <Lock className="h-8 w-8 text-sapp-blue" />,
                step: "3",
                title: "Security Report",
                desc: "Receive detailed findings and recommendations for ongoing protection"
              },
            ].map((item, index) => (
              <div 
                key={index} 
                className="text-center transform transition-all duration-700"
                style={{ 
                  transitionDelay: `${700 + (index * 200)}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 border border-sapp-blue/30">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
