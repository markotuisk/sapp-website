
import { Shield, FileText, Lock, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TranslatedText from '@/components/ui/TranslatedText';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Animated } from '@/components/ui/AnimatedElements';

const ServiceDetailsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Services</h3>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Comprehensive Security Audit Services
          </h2>
          
          <p className="text-sapp-gray max-w-3xl mx-auto mb-8">
            The objective of our security audit is to detect and identify any potential gaps and oversights providing detailed risk-based recommendations for improvement. We use a methodical approach to ensure all aspects of your security are thoroughly evaluated.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Animated animation="fade-up" delay={150} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Shield className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Diplomatic Facilities</h4>
                <p className="text-sm text-sapp-gray">Protection strategies for embassies, consulates, and treaty negotiation sites.</p>
              </Animated>
              <Animated animation="fade-up" delay={200} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <FileText className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Tech Labs</h4>
                <p className="text-sm text-sapp-gray">Assessments for ultra-sensitive R&D environments handling next-gen computation.</p>
              </Animated>
              <Animated animation="fade-up" delay={250} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <FileCheck className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Esports Headquarters</h4>
                <p className="text-sm text-sapp-gray">Security compliance and TSCM support for competitive gaming ecosystems.</p>
              </Animated>
              <Animated animation="fade-up" delay={300} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Lock className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Pharma & Biosecurity Sites</h4>
                <p className="text-sm text-sapp-gray">Evaluation of biotech research and high-containment laboratory protocols.</p>
              </Animated>
            </div>
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
            >
              <TranslatedText textKey="contactUs" />
            </Button>
          </div>
          <Animated animation="fade-up" delay={200} className="relative h-full flex items-center">
            <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
            <div className="w-full h-full relative z-10 rounded-xl shadow-md overflow-hidden">
              <AspectRatio ratio={4/3} className="w-full">
                <img 
                  src="/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
                  alt="Security Audit Process" 
                  className="w-full h-full object-cover hover:scale-[1.02] transition-all duration-300"
                />
              </AspectRatio>
            </div>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsSection;
