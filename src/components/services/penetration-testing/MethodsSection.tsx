
import React from 'react';
import { motion } from 'framer-motion';
import { User, Fingerprint, Lock, Bluetooth, UserCheck } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const methodItems = [
  {
    icon: <User />,
    title: "Social Engineering",
    description: "Impersonation, tailgating, phishing, vishing, and pretexting techniques to test human vulnerability factors.",
    color: "bg-blue-500/10"
  },
  {
    icon: <Lock />,
    title: "Physical Bypass",
    description: "Lockpicking, fence climbing, door forcing, and other physical entry methods to test barriers.",
    color: "bg-amber-500/10"
  },
  {
    icon: <Fingerprint />,
    title: "RFID Cloning",
    description: "Testing the security of RFID access control systems by attempting to clone or bypass access cards.",
    color: "bg-purple-500/10"
  },
  {
    icon: <Bluetooth />,
    title: "Wireless Attacks",
    description: "Bluetooth hacking, signal jamming, and other wireless vulnerabilities assessment.",
    color: "bg-green-500/10"
  },
  {
    icon: <UserCheck />,
    title: "Employee Testing",
    description: "Evaluating adherence to security policies and procedures through real-world scenarios.",
    color: "bg-red-500/10"
  }
];

const MethodsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up">
          <div className="text-center mb-12">
            <h3 className="uppercase text-sapp-blue text-sm font-medium tracking-wider mb-2">Comprehensive Approach</h3>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">Testing Methods</h2>
            <p className="text-sapp-gray max-w-2xl mx-auto">
              We use a combination of methods to provide comprehensive testing of all aspects of your physical security infrastructure.
            </p>
          </div>
        </Animated>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {methodItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-lg p-6 border border-gray-100 shadow transition-all"
            >
              <div className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center text-sapp-blue mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-sapp-dark mb-2">{item.title}</h3>
              <p className="text-sapp-gray text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-slate-50 to-white p-8 rounded-xl shadow-sm border border-gray-100">
          <Animated animation="fade-up">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-sapp-dark mb-2">Non-destructive Testing Approach</h3>
                <p className="text-sapp-gray">
                  While we simulate real-world attacks, our primary approach is non-destructive. 
                  We test security controls without damaging infrastructure or disrupting operations.
                  Destructive testing is only performed with explicit client approval in specific scenarios.
                </p>
              </div>
              <div className="flex-shrink-0 w-24 h-24 bg-sapp-blue/10 rounded-full flex items-center justify-center">
                <Lock className="h-10 w-10 text-sapp-blue" />
              </div>
            </div>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default MethodsSection;
