
import React from 'react';
import { Shield, Calendar, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InfoSectionProps {
  setServicesOpen: (open: boolean) => void;
}

const InfoSection: React.FC<InfoSectionProps> = ({ setServicesOpen }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Corporate Event Security</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Why Event Security Matters
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto mb-8">
            Protect any meetings or events that are classified confidential, restricted or sensitive with real-time monitoring as live discussions are most vulnerable to potential espionage attacks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out">
                <Shield className="h-6 w-6 text-sapp-blue mb-3" />
                <h4 className="font-semibold text-sapp-dark mb-2">Board Meetings</h4>
                <p className="text-sm text-sapp-gray">Comprehensive security protocols for board meetings and sensitive discussions.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out">
                <Calendar className="h-6 w-6 text-sapp-blue mb-3" />
                <h4 className="font-semibold text-sapp-dark mb-2">Results Rehearsals</h4>
                <p className="text-sm text-sapp-gray">Ensure confidentiality for sensitive financial presentations and forecasts.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out">
                <FileText className="h-6 w-6 text-sapp-blue mb-3" />
                <h4 className="font-semibold text-sapp-dark mb-2">Strategy Planning</h4>
                <p className="text-sm text-sapp-gray">Protect confidential strategic discussions from competitors and threats.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out">
                <Users className="h-6 w-6 text-sapp-blue mb-3" />
                <h4 className="font-semibold text-sapp-dark mb-2">Negotiations</h4>
                <p className="text-sm text-sapp-gray">Secure environment for sensitive negotiations and partnerships.</p>
              </div>
            </div>
            <div className="text-center md:text-left">
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-transform duration-300 hover:scale-105"
                onClick={() => setServicesOpen(true)}
              >
                Explore Our Services
              </Button>
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <img 
              src="/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png" 
              alt="Corporate Event Security" 
              className="rounded-xl w-full h-auto object-cover shadow-md transition-all duration-200 hover:shadow-xl hover:scale-[1.01]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
