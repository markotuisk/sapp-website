
import React from 'react';
import { Shield, Lock, Eye, Search } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
            Why Choose Our TSCM Services
          </h2>
          <p className="text-lg text-sapp-gray">
            Comprehensive technical surveillance countermeasures from certified professionals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Detect Hidden Devices */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-sapp-blue/10 rounded-full flex items-center justify-center mb-5">
              <Search className="h-7 w-7 text-sapp-blue" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-sapp-dark">
              Detect Hidden Devices
            </h3>
            <p className="text-sapp-gray">
              Discover covert surveillance devices using specialized equipment and methodologies.
            </p>
          </div>
          
          {/* Protect Conversations & Data */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-sapp-blue/10 rounded-full flex items-center justify-center mb-5">
              <Shield className="h-7 w-7 text-sapp-blue" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-sapp-dark">
              Protect Conversations & Data
            </h3>
            <p className="text-sapp-gray">
              Ensure your sensitive discussions and information remain private and secure.
            </p>
          </div>
          
          {/* Discreet, Non-Disruptive Methods */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-sapp-blue/10 rounded-full flex items-center justify-center mb-5">
              <Eye className="h-7 w-7 text-sapp-blue" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-sapp-dark">
              Discreet, Non-Disruptive Methods
            </h3>
            <p className="text-sapp-gray">
              Our processes are subtle and minimally invasive to your daily operations.
            </p>
          </div>
          
          {/* Certified, Independent Engineers */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-sapp-blue/10 rounded-full flex items-center justify-center mb-5">
              <Lock className="h-7 w-7 text-sapp-blue" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-sapp-dark">
              Certified, Independent Engineers
            </h3>
            <p className="text-sapp-gray">
              Fully qualified professionals with extensive experience and industry certifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
