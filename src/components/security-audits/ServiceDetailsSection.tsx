import { Shield, FileText, Lock, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TranslatedText from '@/components/ui/TranslatedText';

const ServiceDetailsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Services</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-6">
              Comprehensive Security Audit Services
            </h2>
            <p className="text-sapp-gray mb-6">
              The objective of our security audit is to detect and identify any potential gaps and oversights providing detailed risk-based recommendations for improvement. We use a methodical approach to ensure all aspects of your security are thoroughly evaluated.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-lg">
                <Shield className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Physical Security</h4>
                <p className="text-sm text-sapp-gray">Comprehensive assessment of physical security measures.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <FileText className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Systems Testing</h4>
                <p className="text-sm text-sapp-gray">Thorough evaluation of security systems effectiveness.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <FileCheck className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Compliance Audits</h4>
                <p className="text-sm text-sapp-gray">Ensure adherence to industry standards and regulations.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <Lock className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Penetration Tests</h4>
                <p className="text-sm text-sapp-gray">Identify vulnerabilities before they can be exploited.</p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
            >
              <TranslatedText textKey="contactUs" />
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl opacity-0"></div>
            <img 
              src="/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
              alt="Security Audit Process" 
              className="rounded-xl w-full h-auto object-cover max-w-[90%] mx-auto shadow-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsSection;
