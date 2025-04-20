import { Wifi, Server, Database, Lock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TranslatedText from '@/components/ui/TranslatedText';
import { Animated } from '@/components/ui/AnimatedElements';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

const ServicesSection = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Why IoT Device Security</h3>
          </div>
          
          <Animated animation="fade-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              Why IoT Device Security Matters
            </h2>
            
            <p className="text-sapp-gray max-w-3xl mx-auto mb-8">
              In the vast landscape of cyber threats and security, IoT devices are often a weak link in the overall cyber security strategy. In addition to connected IoT devices, organisations have no inventory and security over the off-network or personal devices that people bring to the workplace.
            </p>
          </Animated>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-7xl mx-auto">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Animated animation="fade-up" delay={150} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <ShieldCheck className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Weak Link in Cyber</h4>
                <p className="text-sm text-sapp-gray">IoT devices are often a weak link in the overall cyber security strategy.</p>
              </Animated>
              <Animated animation="fade-up" delay={200} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Wifi className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Always Connected</h4>
                <p className="text-sm text-sapp-gray">IoT devices are always online, making organisations vulnerable to cyber attacks.</p>
              </Animated>
              <Animated animation="fade-up" delay={250} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Database className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Problem at Scale</h4>
                <p className="text-sm text-sapp-gray">Large volume of diverse devices are not visible in the company network.</p>
              </Animated>
              <Animated animation="fade-up" delay={300} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Lock className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Personal Devices</h4>
                <p className="text-sm text-sapp-gray">No inventory and security over the off-network devices that people bring to the workplace.</p>
              </Animated>
            </div>
            <Animated animation="fade-up" delay={350}>
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                <TranslatedText textKey="contactUs" />
              </Button>
            </Animated>
          </div>
          <Animated animation="fade-up" delay={200} className="relative h-full flex items-center">
            <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
            <div className="w-full h-full relative z-10 rounded-xl shadow-md overflow-hidden">
              <AspectRatio ratio={4/3} className="w-full">
                <img 
                  src="/lovable-uploads/82e41510-c98d-49d5-a90e-4408b9bc5cd6.png"
                  alt="IoT Devices Network Security" 
                  className="w-full h-full object-cover hover:scale-[1.02] transition-all duration-300"
                />
              </AspectRatio>
            </div>
          </Animated>
        </div>
      </div>

      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your IoT security services."
        serviceName="IoT Device Security"
      />
    </section>
  );
};

export default ServicesSection;
