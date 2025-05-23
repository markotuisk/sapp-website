
import React from 'react';
import { motion } from 'framer-motion';
import { Animated } from '@/components/ui/AnimatedElements';
import { Shield, FileCheck, Bell, LineChart, FileText, Search } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-sapp-blue" />,
      title: "Identify Real-World Vulnerabilities",
      description: "Discover security gaps that could be exploited by malicious actors before they do."
    },
    {
      icon: <FileCheck className="h-6 w-6 text-sapp-blue" />,
      title: "Meet Regulatory Compliance",
      description: "Satisfy requirements for HIPAA, GLBA, PCI DSS, and other regulatory frameworks."
    },
    {
      icon: <Bell className="h-6 w-6 text-sapp-blue" />,
      title: "Prevent Security Incidents",
      description: "Proactively address weaknesses to prevent breaches and unauthorized access."
    },
    {
      icon: <Search className="h-6 w-6 text-sapp-blue" />,
      title: "Test Staff Security Awareness",
      description: "Evaluate how well employees follow security protocols and identify training needs."
    },
    {
      icon: <LineChart className="h-6 w-6 text-sapp-blue" />,
      title: "Optimize Security Investment",
      description: "Focus resources on addressing actual vulnerabilities rather than perceived risks."
    },
    {
      icon: <FileText className="h-6 w-6 text-sapp-blue" />,
      title: "Actionable Recommendations",
      description: "Receive clear, prioritized guidance on how to improve your security posture."
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Animated animation="fade-up">
            <h3 className="uppercase text-sapp-blue text-sm font-medium tracking-wider mb-2">Value Proposition</h3>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
              Why Conduct Physical Penetration Testing?
            </h2>
            <p className="text-sapp-gray">
              Physical security penetration testing provides tangible benefits for your organization's security posture,
              risk management, and regulatory compliance efforts.
            </p>
          </Animated>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-sapp-blue/10 rounded-full flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-sapp-dark mb-2">{benefit.title}</h3>
              <p className="text-sapp-gray">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <Animated animation="fade-up" delay={300}>
          <div className="mt-16 bg-gradient-to-r from-sapp-blue/10 to-white p-8 rounded-xl border border-sapp-blue/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/4">
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
                  <Shield className="h-10 w-10 text-sapp-blue" />
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-2xl font-bold text-sapp-dark mb-4">The True Measure of Security</h3>
                <p className="text-sapp-gray mb-4">
                  Security isn't about appearances—it's about effectiveness against real threats. Penetration testing is 
                  the most reliable way to assess your actual security posture under realistic attack conditions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                      <FileCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <span className="text-sm text-sapp-gray">Realistic attack simulation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                      <FileCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <span className="text-sm text-sapp-gray">Evidence-based findings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                      <FileCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <span className="text-sm text-sapp-gray">Actionable recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                      <FileCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <span className="text-sm text-sapp-gray">Risk-based prioritization</span>
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

export default BenefitsSection;
