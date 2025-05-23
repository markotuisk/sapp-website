
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Target, Lightbulb, CheckCircle, Star } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const WhyChooseSection: React.FC = () => {
  const capabilities = [
    {
      icon: Award,
      title: 'Certified Specialists',
      description: 'Our team holds ISO 27001 Lead Auditor certifications and extensive experience across industries.',
      highlight: '100+ audits completed'
    },
    {
      icon: Target,
      title: 'Tailored Approach',
      description: 'We customize our audit methodology to your organization\'s specific needs, industry, and risk profile.',
      highlight: 'Industry-specific expertise'
    },
    {
      icon: Lightbulb,
      title: 'Actionable Insights',
      description: 'Clear, prioritized recommendations that align with business objectives and provide practical implementation guidance.',
      highlight: 'Business-focused outcomes'
    },
    {
      icon: Users,
      title: 'Collaborative Process',
      description: 'We work closely with your teams, providing knowledge transfer and building internal security capabilities.',
      highlight: 'Knowledge transfer included'
    }
  ];

  const differentiators = [
    'ISO 27001 Lead Auditor certified team',
    'Industry best practices alignment',
    'Post-audit implementation support',
    'Continuous improvement guidance',
    'Multi-industry experience',
    'Executive-level reporting'
  ];

  const testimonialQuote = {
    text: "SAPP Security's compliance audit not only helped us achieve ISO 27001 certification but also transformed our approach to security governance. Their practical recommendations have strengthened our security posture while improving operational efficiency.",
    author: "Sarah Mitchell",
    position: "CISO, TechFlow Solutions",
    company: "Global Technology Company"
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">EXPERTISE & EXPERIENCE</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Why Choose SAPP Security
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Partner with certified professionals who bring deep expertise, 
            practical experience, and a commitment to your organization's long-term success.
          </p>
        </Animated>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-sapp-blue/10 rounded-full p-3 flex-shrink-0">
                  <capability.icon className="h-6 w-6 text-sapp-blue" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-sapp-dark mb-2">{capability.title}</h3>
                  <p className="text-sapp-gray text-sm mb-3">{capability.description}</p>
                  <div className="bg-emerald-50 rounded-lg px-3 py-1 inline-block">
                    <span className="text-emerald-700 text-xs font-medium">{capability.highlight}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <Animated animation="fade-up" delay={400}>
          <div className="bg-gradient-to-r from-sapp-blue/5 to-emerald-50 rounded-xl p-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl font-medium text-sapp-dark text-center mb-6 italic">
                "{testimonialQuote.text}"
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-sapp-dark">{testimonialQuote.author}</p>
                <p className="text-sm text-sapp-gray">{testimonialQuote.position}</p>
                <p className="text-xs text-sapp-gray">{testimonialQuote.company}</p>
              </div>
            </div>
          </div>
        </Animated>

        {/* Differentiators */}
        <Animated animation="fade-up" delay={600}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-sapp-dark mb-8">
              What Sets Us Apart
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {differentiators.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-sapp-dark">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Animated>

        {/* Methodology Comparison */}
        <Animated animation="fade-up" delay={800}>
          <div className="mt-16 bg-white border border-gray-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-sapp-dark text-center mb-8">
              Our Methodology vs. Traditional Approaches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-sapp-dark mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  SAPP Security Approach
                </h4>
                <ul className="space-y-2 text-sm text-sapp-gray">
                  <li>• Business-aligned compliance strategy</li>
                  <li>• Continuous improvement focus</li>
                  <li>• Executive engagement throughout</li>
                  <li>• Industry-specific best practices</li>
                  <li>• Post-audit implementation support</li>
                  <li>• Knowledge transfer and capability building</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-sapp-dark mb-4 flex items-center gap-2">
                  <span className="h-5 w-5 bg-gray-300 rounded-full"></span>
                  Traditional Audit Approach
                </h4>
                <ul className="space-y-2 text-sm text-sapp-gray">
                  <li>• Checkbox compliance mentality</li>
                  <li>• One-time assessment focus</li>
                  <li>• Limited stakeholder involvement</li>
                  <li>• Generic recommendations</li>
                  <li>• Audit ends with report delivery</li>
                  <li>• Minimal knowledge transfer</li>
                </ul>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default WhyChooseSection;
