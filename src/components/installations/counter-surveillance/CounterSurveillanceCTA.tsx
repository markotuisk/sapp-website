
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CounterSurveillanceCTA = () => {
  const { toast } = useToast();

  const contactMethods = [
    {
      icon: Phone,
      title: 'Emergency Response',
      description: '24/7 immediate threat assessment',
      action: 'Call Now',
      urgent: true
    },
    {
      icon: Mail,
      title: 'Consultation Request',
      description: 'Comprehensive security evaluation',
      action: 'Get Quote',
      urgent: false
    },
    {
      icon: Clock,
      title: 'Scheduled Assessment',
      description: 'Regular security audits and updates',
      action: 'Schedule',
      urgent: false
    }
  ];

  const handleEmergencyCall = () => {
    toast({
      title: "Emergency Response Activated",
      description: "Our 24/7 response team will contact you immediately for urgent threat assessment.",
    });
  };

  const handleGetQuote = () => {
    toast({
      title: "Quote Request Submitted",
      description: "Our specialists will provide a comprehensive security evaluation quote within 24 hours.",
    });
  };

  const handleSchedule = () => {
    toast({
      title: "Assessment Scheduled",
      description: "We'll arrange regular security audits and updates according to your schedule.",
    });
  };

  const handleContactMethod = (method: typeof contactMethods[0]) => {
    switch (method.title) {
      case 'Emergency Response':
        handleEmergencyCall();
        break;
      case 'Consultation Request':
        handleGetQuote();
        break;
      case 'Scheduled Assessment':
        handleSchedule();
        break;
      default:
        toast({
          title: "Contact Request",
          description: "We'll get back to you shortly regarding your security needs.",
        });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="h-20 w-20 text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Don't Wait for a Breach
            </h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
              Every moment your communications remain unprotected is a moment of vulnerability. 
              Take action today to secure your privacy and protect what matters most.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 text-white">
                <Clock className="h-6 w-6" />
                <span className="text-lg font-semibold">
                  Free initial consultation within 24 hours
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => {
              const MethodIcon = method.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    method.urgent ? 'bg-yellow-500' : 'bg-white/20'
                  }`}>
                    <MethodIcon className={`h-8 w-8 ${method.urgent ? 'text-red-700' : 'text-white'}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {method.title}
                  </h3>
                  <p className="text-red-100 mb-6">
                    {method.description}
                  </p>
                  <Button 
                    onClick={() => handleContactMethod(method)}
                    className={`w-full ${
                      method.urgent 
                        ? 'bg-yellow-500 hover:bg-yellow-400 text-red-700 font-bold' 
                        : 'bg-white hover:bg-gray-100 text-red-700'
                    }`}
                  >
                    {method.action}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Immediate Steps You Can Take
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-white mb-2">Right Now:</h4>
                  <ul className="text-red-100 space-y-1 text-sm">
                    <li>• Turn off unnecessary microphones and cameras</li>
                    <li>• Check for unknown devices in your space</li>
                    <li>• Vary your routine and meeting locations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">This Week:</h4>
                  <ul className="text-red-100 space-y-1 text-sm">
                    <li>• Schedule a professional TSCM sweep</li>
                    <li>• Review and update security protocols</li>
                    <li>• Train your team on surveillance awareness</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CounterSurveillanceCTA;
