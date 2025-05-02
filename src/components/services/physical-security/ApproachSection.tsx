
import React from 'react';
import { Shield, Lock, Search, FileCheck } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

// Import the new components
import FeatureCard from './components/FeatureCard';
import ServicesList from './components/ServicesList';
import ServiceIllustration from './components/ServiceIllustration';
import MethodologyHeader from './components/MethodologyHeader';

const ApproachSection: React.FC = () => {
  const featureCards = [
    {
      icon: <Shield className="text-sapp-blue h-6 w-6" />,
      title: "Threat Assessment",
      description: "We identify potential threats specific to your organization, location, and industry context."
    },
    {
      icon: <Search className="text-sapp-blue h-6 w-6" />,
      title: "Vulnerability Detection",
      description: "Our experts conduct thorough inspections to identify security weaknesses throughout your premises."
    },
    {
      icon: <Lock className="text-sapp-blue h-6 w-6" />,
      title: "Security Gap Analysis",
      description: "We evaluate the difference between your current security posture and best practice standards."
    },
    {
      icon: <FileCheck className="text-sapp-blue h-6 w-6" />,
      title: "Remediation Planning",
      description: "Clear, actionable recommendations prioritized by risk level and implementation complexity."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative">
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white to-transparent"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-10 w-64 h-64 bg-sapp-blue/5 rounded-full blur-3xl transform rotate-45"></div>
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <MethodologyHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featureCards.map((card, index) => (
            <FeatureCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              index={index}
            />
          ))}
        </div>
        
        <Animated animation="fade-up" delay={200}>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full opacity-70 blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full md:w-1/3">
                  <h3 className="text-2xl font-display font-bold text-sapp-dark mb-4">
                    Our Assessment Services
                  </h3>
                  <p className="text-sapp-gray mb-6">
                    We provide a comprehensive range of physical security assessment services tailored to meet the specific needs of your organization.
                  </p>
                  <ServiceIllustration />
                </div>
                
                <ServicesList />
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default ApproachSection;
