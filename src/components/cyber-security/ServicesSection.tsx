
import { Wifi, Server, Database, Lock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TranslatedText from '@/components/ui/TranslatedText';
import { Animated } from '@/components/ui/AnimatedElements';

const ServicesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Solutions</h3>
          </div>
          
          <Animated animation="fade-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              Comprehensive Cyber Security Services
            </h2>
            
            <p className="text-sapp-gray max-w-3xl mx-auto mb-8">
              Our cyber security services are designed to protect your digital assets from a wide range of threats. We focus on securing IoT devices, which are often the most vulnerable points in corporate networks, with 98% being unencrypted and invisible in company networks.
            </p>
          </Animated>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Animated animation="fade-up" delay={150} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Server className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Network Security</h4>
                <p className="text-sm text-sapp-gray">Comprehensive protection for your network infrastructure.</p>
              </Animated>
              <Animated animation="fade-up" delay={200} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Lock className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Data Protection</h4>
                <p className="text-sm text-sapp-gray">Robust encryption and data security solutions.</p>
              </Animated>
              <Animated animation="fade-up" delay={250} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Database className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Cloud Security</h4>
                <p className="text-sm text-sapp-gray">Secure cloud infrastructure and applications.</p>
              </Animated>
              <Animated animation="fade-up" delay={300} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Wifi className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">IoT Security</h4>
                <p className="text-sm text-sapp-gray">Protection for Internet of Things devices.</p>
              </Animated>
            </div>
            <Animated animation="fade-up" delay={350}>
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
              >
                <TranslatedText textKey="contactUs" />
              </Button>
            </Animated>
          </div>
          <Animated animation="fade-up" delay={200} className="relative">
            <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
            <img 
              src="/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png"
              alt="Cyber Security Services" 
              className="relative z-10 rounded-xl shadow-md w-full h-auto object-cover hover:scale-[1.02] transition-all duration-300"
            />
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
