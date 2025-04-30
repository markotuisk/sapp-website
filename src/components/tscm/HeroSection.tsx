
import React from 'react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative bg-gradient-to-br from-sapp-dark to-accent-dark-blue pt-36 pb-20 overflow-hidden">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-grid transform rotate-12"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-grid transform -rotate-12"></div>
      </div>
      
      {/* Accent shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sapp-blue/10 filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent-dark-blue/20 filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={cn(
            "transition-all duration-1000 text-center lg:text-left",
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <div className="inline-block mb-6 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white">
              Technical Surveillance Countermeasures
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
              Is Someone <span className="text-sapp-blue">Listening?</span>
              <br />
              We Find Out.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
              Professional bug sweeping services for corporate boardrooms, executive offices, and private residences. Protect your sensitive conversations and data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center max-w-md mx-auto lg:mx-0">
              <Button 
                size="lg"
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1"
                asChild
              >
                <Link to="#contact">
                  Request Consultation
                </Link>
              </Button>
              <Button 
                variant="link" 
                className="text-white hover:text-sapp-blue flex items-center gap-1.5 group"
                asChild
              >
                <Link to="#how-it-works">
                  How It Works
                  <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 text-sm text-gray-300">
              <span className="block mb-2">Trusted by professionals in:</span>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2">
                <span className="px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full">Law</span>
                <span className="px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full">Finance</span>
                <span className="px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full">Media</span>
                <span className="px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full">Government</span>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "transition-all duration-1000 delay-300",
            inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sapp-blue/30 to-accent-dark-blue/30 rounded-2xl blur-2xl opacity-70"></div>
              <div className="relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="p-1">
                  <div className="bg-gradient-to-br from-sapp-dark/80 to-accent-dark-blue/80 rounded-xl p-6 md:p-8">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-sapp-blue/20 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-sapp-blue" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-display text-white text-center font-medium mb-6">Professional TSCM in 3 Steps</h3>
                    
                    <div className="space-y-5">
                      {[
                        {
                          number: "01",
                          title: "Confidential Consultation",
                          desc: "Discuss your concerns in a secure environment"
                        },
                        {
                          number: "02",
                          title: "Technical Inspection",
                          desc: "Expert sweep using advanced detection equipment"
                        },
                        {
                          number: "03",
                          title: "Detailed Report",
                          desc: "Receive findings and security recommendations"
                        }
                      ].map((step, index) => (
                        <div key={index} className="flex items-center gap-4 group">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-sapp-blue font-medium group-hover:bg-sapp-blue/20 transition-colors duration-300">
                            {step.number}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{step.title}</h4>
                            <p className="text-gray-300 text-sm">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                      <p className="text-white">Ready to secure your privacy?</p>
                      <Button 
                        variant="link" 
                        className="text-sapp-blue hover:text-sapp-blue/80 flex items-center gap-1 mx-auto mt-2 group"
                        asChild
                      >
                        <Link to="#contact">
                          Book a Free Estimate
                          <ArrowRight className="h-3 w-3 transform transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
