import React, { useState } from 'react';
import { Cpu, Scale, Wrench, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Animated } from '@/components/ui/AnimatedElements';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

const SolutionsSection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <div className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Why Choose Our Solutions</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <Animated animation="fade-up" delay={100} className="relative order-2 md:order-1 md:col-span-6">
            <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
            <img 
              src="/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png"
              alt="Security Installation Services" 
              className="relative z-10 rounded-xl shadow-2xl w-full h-auto object-cover hover:scale-[1.02] transition-all duration-300"
            />
          </Animated>
          <div className="order-1 md:order-2 md:col-span-6">
            <Animated animation="fade-up" delay={150}>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-6">
                Competent Next Gen Installations
              </h2>
              <p className="text-sapp-gray mb-6">
                There is an increasing demand for sophisticated, intelligent security installations that leverage advanced technologies. Our approach integrates cutting-edge AI and data-driven solutions to transform traditional security infrastructure into smart, adaptive systems that provide enhanced protection, operational efficiency, and scalable performance.
              </p>
            </Animated>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Animated animation="fade-up" delay={200} className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Cpu className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Cyber & Physical</h4>
                <p className="text-sm text-sapp-gray">Converge cyber and physical security in new AI-driven systems.</p>
              </Animated>
              <Animated animation="fade-up" delay={250} className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Scale className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Legacy Systems</h4>
                <p className="text-sm text-sapp-gray">Replace legacy systems with scalable technology.</p>
              </Animated>
              <Animated animation="fade-up" delay={300} className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Wrench className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Agile Installations</h4>
                <p className="text-sm text-sapp-gray">No installation is too complex or small for SAPP team.</p>
              </Animated>
              <Animated animation="fade-up" delay={350} className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Award className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Accredited & Documented</h4>
                <p className="text-sm text-sapp-gray">Each installation is fully documented and includes manufacturer certificates.</p>
              </Animated>
            </div>
            <Animated animation="fade-up" delay={400}>
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                onClick={() => setContactOpen(true)}
              >
                Request a Consultation
              </Button>
              
              <ContactFormDialog 
                open={contactOpen}
                onOpenChange={setContactOpen}
                defaultMessage="I'm interested in discussing installation services for my organization."
                serviceName="Installation Services"
              />
            </Animated>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
