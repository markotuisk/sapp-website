
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-sapp-dark via-sapp-dark to-accent-dark-blue pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-grid"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Is Someone Listening? We Find Out.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Discreet TSCM Sweeps & Bug Detection Services for Business and Private Clients.
          </p>
          
          <div className="mb-10">
            <Button 
              size="lg"
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white text-lg px-8 py-6 h-auto shadow-lg"
            >
              Request a Free Estimate
            </Button>
          </div>
          
          <p className="text-gray-300 text-sm md:text-base">
            Trusted by professionals in law, media, finance, and high-level security.
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-16 relative z-10 px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-10 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-white text-center mb-8">
            How TSCM Works in 60 Seconds
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-sapp-blue/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Assessment</h3>
              <p className="text-gray-300">We evaluate your needs and risk profile through discreet consultation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-sapp-blue/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Inspection</h3>
              <p className="text-gray-300">Our experts sweep premises using advanced detection equipment</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-sapp-blue/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Security Report</h3>
              <p className="text-gray-300">Receive detailed findings and recommendations for ongoing protection</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
