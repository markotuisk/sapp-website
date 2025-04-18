import React from 'react';
import { Shield, Lock, Search, FileCheck } from 'lucide-react';
import FeatureCard from '@/components/ui/FeatureCard';

interface FeatureBoxProps {
  /** Icon component to display */
  icon: React.ReactNode;
  /** Title of the feature */
  title: string;
  /** Description of the feature */
  description: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ icon, title, description }) => (
  <div className="flex flex-col">
    <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
      {icon}
      <div>
        <h3 className="font-semibold text-sapp-dark mb-2">{title}</h3>
        <p className="text-sm text-sapp-gray">{description}</p>
      </div>
    </div>
  </div>
);

const ApproachSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Approach</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Comprehensive Security Evaluation
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto">
            Our physical security assessments provide a thorough evaluation of your organization's security infrastructure, identifying vulnerabilities and recommending solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureBox
            icon={<Shield className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />}
            title="Threat Assessment"
            description="Comprehensive analysis of potential threats specific to your organization and environment."
          />
          <FeatureBox
            icon={<Lock className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />}
            title="Access Control Evaluation"
            description="Assessment of current access control systems and identification of potential security breaches."
          />
          <FeatureBox
            icon={<Search className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />}
            title="Vulnerability Detection"
            description="Identification of physical security vulnerabilities through comprehensive examination of premises."
          />
          <FeatureBox
            icon={<FileCheck className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />}
            title="Detailed Reporting"
            description="Comprehensive reports with actionable recommendations to improve security posture."
          />
        </div>
        
        <div className="mt-12">
          <FeatureCard
            title="Our Physical Security Assessment Services"
            features={[
              "Comprehensive site security surveys",
              "Access control system evaluation",
              "Surveillance system assessment",
              "Alarm system testing",
              "Security personnel procedures review",
              "Physical barrier assessment",
              "Security lighting evaluation",
              "Emergency response planning",
              "Penetration testing",
              "Critical infrastructure protection",
              "Executive protection assessments",
              "Security policy development"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
