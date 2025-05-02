
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, AlertTriangle, ExternalLink } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { Link } from 'react-router-dom';

const SecurityApproachSection = () => {
  const approachCards = [
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Proactive Protection",
      description: "We identify and address vulnerabilities before they become security incidents, ensuring your venue is secure for high-level executives and sensitive corporate discussions.",
      color: "bg-sapp-blue",
      delay: 0.1
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-white" />,
      title: "Threat Assessment",
      description: "Our experts analyze potential security threats specific to your event venue, industry, and attendee profiles to create targeted security measures.",
      color: "bg-accent-dark-blue",
      delay: 0.2
    },
    {
      icon: <Lock className="h-8 w-8 text-white" />,
      title: "Confidentiality Focus",
      description: "We understand the sensitive nature of executive events and ensure that all security audits are conducted with the utmost discretion and confidentiality.",
      color: "bg-sapp-dark",
      delay: 0.3
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Approach</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              Comprehensive Security Assessment
            </h2>
            <p className="text-sapp-gray max-w-3xl mx-auto">
              Our venue security audits provide a systematic evaluation of security measures to protect your organization's most important discussions and gatherings.
            </p>
          </div>
        </Animated>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {approachCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: card.delay }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col h-full"
            >
              <div className={`${card.color} p-6 rounded-t-xl flex justify-center`}>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  {card.icon}
                </div>
              </div>
              <div className="bg-white p-6 rounded-b-xl flex-grow shadow-md border border-gray-100 border-t-0">
                <h3 className="text-xl font-semibold text-sapp-dark mb-3">{card.title}</h3>
                <p className="text-sapp-gray mb-4">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Link 
            to="/tscm" 
            className="text-sapp-blue font-medium flex items-center hover:underline"
          >
            <span>Learn about our TSCM inspection services</span>
            <ExternalLink className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SecurityApproachSection;
