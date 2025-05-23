
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Wifi, Smartphone, Shield, FileText, Radio, CheckCircle, Info } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { Button } from '@/components/ui/button';

interface ServiceCategoriesSectionProps {
  onRequestMonitoring: () => void;
}

const ServiceCategoriesSection: React.FC<ServiceCategoriesSectionProps> = ({ onRequestMonitoring }) => {
  const [activeCategory, setActiveCategory] = useState<'core' | 'specialized'>('core');

  const coreServices = [
    {
      icon: Eye,
      title: "Real-time Surveillance",
      description: "HD CCTV and drone monitoring with central command coordination",
      features: ["360° venue coverage", "Thermal imaging capability", "Facial recognition integration", "Real-time alerting system"]
    },
    {
      icon: Shield,
      title: "Access Control",
      description: "Multi-layered entry protocols and crowd management",
      features: ["Biometric verification", "RFID tracking", "VIP area protection", "Emergency evacuation routes"]
    },
    {
      icon: Radio,
      title: "Incident Response",
      description: "Rapid response protocols for all security scenarios",
      features: ["24/7 response team", "Medical emergency coordination", "Law enforcement liaison", "Crisis communication"]
    }
  ];

  const specializedServices = [
    {
      icon: Wifi,
      title: "Secure Network Setup",
      description: "Isolated, monitored networks for event communications",
      features: ["Military-grade encryption", "Network intrusion detection", "Bandwidth management", "Guest network isolation"]
    },
    {
      icon: Smartphone,
      title: "Device Isolation Service",
      description: "Non-intrusive control over mobile device functionality",
      features: ["Camera/recording blocking", "Network access control", "Attendee convenience maintained", "Real-time device monitoring"]
    },
    {
      icon: FileText,
      title: "Document Security",
      description: "Secure disposal and area sanitization services",
      features: ["On-site shredding", "Whiteboard cleaning", "Room sanitization", "Lost item security"]
    }
  ];

  const currentServices = activeCategory === 'core' ? coreServices : specializedServices;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">SERVICE PORTFOLIO</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Modular Event Monitoring Solutions
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Our services are designed to be mixed and matched based on your event's specific requirements. 
            Each solution integrates seamlessly to provide comprehensive protection.
          </p>
        </Animated>

        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveCategory('core')}
              className={`px-6 py-3 rounded-md transition-all duration-300 font-medium ${
                activeCategory === 'core'
                  ? 'bg-sapp-blue text-white shadow-lg'
                  : 'text-sapp-gray hover:text-sapp-dark'
              }`}
            >
              Core Services
            </button>
            <button
              onClick={() => setActiveCategory('specialized')}
              className={`px-6 py-3 rounded-md transition-all duration-300 font-medium ${
                activeCategory === 'specialized'
                  ? 'bg-sapp-blue text-white shadow-lg'
                  : 'text-sapp-gray hover:text-sapp-dark'
              }`}
            >
              Specialized Services
            </button>
          </div>
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {currentServices.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <div key={index} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="bg-sapp-blue/10 rounded-lg p-3 w-fit mb-4">
                  <ServiceIcon className="h-6 w-6 text-sapp-blue" />
                </div>
                <h4 className="font-semibold text-sapp-dark mb-3">{service.title}</h4>
                <p className="text-sapp-gray mb-4 text-sm">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs text-sapp-gray">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>

        <Animated animation="fade-up" delay={400} className="text-center mt-12">
          <div className="bg-gradient-to-r from-accent-teal to-sapp-blue rounded-xl p-8 text-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Info className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Customized Service Combinations</h3>
            </div>
            <p className="mb-6 max-w-2xl mx-auto opacity-90">
              Every event is unique. Our site assessment determines the optimal combination of services 
              for your specific venue, attendee profile, and security requirements.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white text-sapp-blue hover:bg-white/90 border-0"
              onClick={onRequestMonitoring}
            >
              Schedule Site Assessment
            </Button>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default ServiceCategoriesSection;
