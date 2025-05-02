
import React from 'react';
import { Shield, Lock, Search, FileCheck, Building, Key, Radar, Security } from 'lucide-react';
import { motion } from 'framer-motion';
import { Animated } from '@/components/ui/AnimatedElements';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-1">
        <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-lg h-full flex flex-col">
          <div className="bg-sapp-blue/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="font-semibold text-sapp-dark text-lg mb-2">{title}</h3>
          <p className="text-sapp-gray text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ApproachSection: React.FC = () => {
  const services = [
    "Site perimeter assessment",
    "Access control evaluation",
    "Security technology audits",
    "Personnel security procedures",
    "CCTV & surveillance reviews",
    "Alarm system testing",
    "Security lighting assessment",
    "Penetration testing",
    "Key management systems",
    "Visitor management procedures",
    "Emergency response planning",
    "Security staff training reviews"
  ];

  // Split services into two columns
  const halfwayPoint = Math.ceil(services.length / 2);
  const firstColumn = services.slice(0, halfwayPoint);
  const secondColumn = services.slice(halfwayPoint);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative">
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white to-transparent"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-10 w-64 h-64 bg-sapp-blue/5 rounded-full blur-3xl transform rotate-45"></div>
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <Animated animation="fade-up">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Methodology</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              Comprehensive Security Assessment Process
            </h2>
            <p className="text-sapp-gray max-w-3xl mx-auto">
              Our assessment process is methodical and thorough, designed to identify vulnerabilities in your physical security infrastructure and provide actionable recommendations.
            </p>
          </div>
        </Animated>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={<Shield className="text-sapp-blue h-6 w-6" />}
            title="Threat Assessment"
            description="We identify potential threats specific to your organization, location, and industry context."
            index={0}
          />
          <FeatureCard
            icon={<Search className="text-sapp-blue h-6 w-6" />}
            title="Vulnerability Detection"
            description="Our experts conduct thorough inspections to identify security weaknesses throughout your premises."
            index={1}
          />
          <FeatureCard
            icon={<Lock className="text-sapp-blue h-6 w-6" />}
            title="Security Gap Analysis"
            description="We evaluate the difference between your current security posture and best practice standards."
            index={2}
          />
          <FeatureCard
            icon={<FileCheck className="text-sapp-blue h-6 w-6" />}
            title="Remediation Planning"
            description="Clear, actionable recommendations prioritized by risk level and implementation complexity."
            index={3}
          />
        </div>
        
        <Animated animation="fade-up" delay={200}>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full opacity-70 blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full md:w-1/3">
                  <h3 className="text-2xl font-display font-bold text-sapp-dark mb-4">
                    Our Assessment Services
                  </h3>
                  <p className="text-sapp-gray mb-6">
                    We provide a comprehensive range of physical security assessment services tailored to meet the specific needs of your organization.
                  </p>
                  <div className="hidden md:block">
                    <motion.div 
                      className="relative h-40"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      viewport={{ once: true }}
                    >
                      {[Building, Security, Radar, Key].map((Icon, index) => (
                        <motion.div
                          key={index}
                          className="absolute"
                          style={{ left: `${index * 25}%`, top: `${index * 20}%` }}
                          initial={{ scale: 0, rotate: -20 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
                          viewport={{ once: true }}
                        >
                          <div className={`bg-gradient-to-br from-white to-blue-50 p-4 rounded-lg shadow-lg border border-gray-100`}>
                            <Icon className="h-8 w-8 text-sapp-blue" />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                    <div>
                      <ul className="space-y-3">
                        {firstColumn.map((service, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true, margin: "-50px" }}
                          >
                            <div className="bg-sapp-blue/10 rounded-full p-1">
                              <Shield className="h-4 w-4 text-sapp-blue" />
                            </div>
                            <span className="text-sapp-dark">{service}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-3">
                        {secondColumn.map((service, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index + halfwayPoint) * 0.1, duration: 0.5 }}
                            viewport={{ once: true, margin: "-50px" }}
                          >
                            <div className="bg-sapp-blue/10 rounded-full p-1">
                              <Shield className="h-4 w-4 text-sapp-blue" />
                            </div>
                            <span className="text-sapp-dark">{service}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default ApproachSection;
