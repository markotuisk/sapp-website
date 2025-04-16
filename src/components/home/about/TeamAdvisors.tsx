
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TeamAdvisors = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-sapp-dark">Our Team Advisors</h2>
          <p className="text-sapp-gray">Led by experts with decades of experience in security, technology, and risk management</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="/lovable-uploads/team-member-1.jpg" 
                  alt="James Wilson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-display font-semibold mb-1 text-accent-dark-blue">James Wilson</h3>
              <p className="text-accent-teal text-sm font-medium mb-3">Chief Executive Officer</p>
              <p className="text-sapp-gray text-sm">
                Former head of technical operations at MI5 with over 20 years of experience in counter-intelligence and security systems integration.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="/lovable-uploads/team-member-2.jpg" 
                  alt="Sarah Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-display font-semibold mb-1 text-accent-dark-blue">Sarah Chen</h3>
              <p className="text-accent-teal text-sm font-medium mb-3">Chief Technology Officer</p>
              <p className="text-sapp-gray text-sm">
                Cybersecurity expert with background in developing secure systems for financial institutions and critical infrastructure protection.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="/lovable-uploads/team-member-3.jpg" 
                  alt="Marcus Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-display font-semibold mb-1 text-accent-dark-blue">Marcus Johnson</h3>
              <p className="text-accent-teal text-sm font-medium mb-3">Head of Physical Security</p>
              <p className="text-sapp-gray text-sm">
                Former military specialist with expertise in threat assessment, security system design, and implementation for high-risk environments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TeamAdvisors;
