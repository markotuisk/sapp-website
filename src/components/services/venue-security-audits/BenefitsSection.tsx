
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, Star, Award, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Animated } from '@/components/ui/AnimatedElements';

interface BenefitsSectionProps {
  onRequestAudit: () => void;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onRequestAudit }) => {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-sapp-blue" />,
      title: "Comprehensive Protection",
      description: "Our audits go beyond surface-level checks to identify potential vulnerabilities that could compromise your event security."
    },
    {
      icon: <Check className="h-6 w-6 text-sapp-blue" />,
      title: "Risk Mitigation",
      description: "Proactively identify and address security gaps before they can be exploited, protecting your organization's sensitive information."
    },
    {
      icon: <Star className="h-6 w-6 text-sapp-blue" />,
      title: "Industry Expertise",
      description: "Our security professionals bring decades of experience across corporate, government, and high-profile event security."
    },
    {
      icon: <Award className="h-6 w-6 text-sapp-blue" />,
      title: "Customized Solutions",
      description: "Each audit is tailored to your specific event requirements, venue characteristics, and security concerns."
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Why Choose Us</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              The SAPP Security Advantage
            </h2>
            <p className="text-sapp-gray max-w-3xl mx-auto">
              Our venue security audits provide comprehensive protection for your events, ensuring that your organization's sensitive information remains secure.
            </p>
          </div>
        </Animated>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="bg-white h-full border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="bg-sapp-blue/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg text-sapp-dark">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <Animated animation="fade-up" delay={300}>
          <Card className="border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 p-8">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center mb-4">
                    <div className="bg-sapp-blue/10 rounded-full p-2 mr-3">
                      <Handshake className="h-6 w-6 text-sapp-blue" />
                    </div>
                    <CardTitle className="text-xl text-sapp-dark">Partner With The Security Experts</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0 mb-6">
                  <p className="text-sapp-gray mb-4">
                    Our team of security professionals has protected some of the most high-profile corporate events across the globe. We understand the unique challenges that organizations face when hosting sensitive meetings and executive gatherings.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Pre-event security planning and consultation",
                      "On-site vulnerability assessment",
                      "Access control system evaluation",
                      "Staff security protocol review",
                      "Detailed recommendation report with actionable insights"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="text-sapp-blue mr-2 mt-1">•</div>
                        <span className="text-sm text-sapp-gray">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-0">
                  <Button 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                    onClick={onRequestAudit}
                  >
                    Request a Security Audit
                  </Button>
                </CardFooter>
              </div>
              <div className="bg-gradient-to-br from-sapp-blue to-accent-dark-blue hidden lg:block relative">
                <div className="absolute inset-0 bg-[url('/lovable-uploads/69dca9cd-0e56-44b6-b741-8faeebcb21e9.png')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
              </div>
            </div>
          </Card>
        </Animated>
      </div>
    </section>
  );
};

export default BenefitsSection;
