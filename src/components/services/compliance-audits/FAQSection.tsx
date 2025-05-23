
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, CheckCircle, Clock, Users } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const FAQSection: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How long does a compliance audit typically take?',
      answer: 'The duration varies based on organization size and complexity. Stage 1 (Readiness) typically takes 1-2 weeks, Stage 2 (Certification) takes 2-4 weeks. For a medium-sized organization (100-500 employees), expect 4-6 weeks total from start to certification.',
      icon: Clock,
      category: 'Timeline'
    },
    {
      question: 'What\'s the difference between compliance audits and penetration testing?',
      answer: 'Compliance audits verify that your security controls meet established standards (like ISO 27001) through documentation review and process assessment. Penetration testing actively attempts to exploit vulnerabilities. Audits focus on certification and ongoing compliance, while pen tests identify specific security weaknesses.',
      icon: CheckCircle,
      category: 'Methodology'
    },
    {
      question: 'Do we need to be ISO 27001 certified to benefit from a compliance audit?',
      answer: 'No, compliance audits are valuable at any stage. If you\'re not certified, we conduct gap analyses to identify what needs to be implemented. If you\'re pursuing certification, we help ensure readiness. Even certified organizations benefit from ongoing compliance verification.',
      icon: Users,
      category: 'Requirements'
    },
    {
      question: 'How much does a compliance audit cost?',
      answer: 'Costs vary based on organization size, complexity, and scope. A typical audit for a medium-sized organization ranges from £10,000-£25,000. We offer detailed quotes after an initial consultation to understand your specific needs and provide transparent pricing.',
      icon: HelpCircle,
      category: 'Investment'
    },
    {
      question: 'What happens if we fail the audit?',
      answer: 'Audit "failure" is rare with proper preparation. If non-conformities are identified, we provide detailed remediation plans with prioritized actions. Most issues can be resolved quickly, and we offer re-assessment options. Our goal is to help you succeed, not just identify problems.',
      icon: CheckCircle,
      category: 'Process'
    },
    {
      question: 'Can you audit multiple locations or remote offices?',
      answer: 'Yes, we have extensive experience with multi-site audits. We can conduct assessments across multiple locations, including remote offices, using a combination of on-site visits and remote assessment techniques. We coordinate all activities to minimize business disruption.',
      icon: Users,
      category: 'Scope'
    },
    {
      question: 'How often should we conduct compliance audits?',
      answer: 'For ISO 27001, annual surveillance audits are required, with full recertification every three years. However, we recommend quarterly internal assessments and annual third-party reviews to maintain optimal compliance posture and catch issues early.',
      icon: Clock,
      category: 'Frequency'
    },
    {
      question: 'What documentation do we need to prepare?',
      answer: 'Key documents include your ISMS policy, risk assessments, security procedures, incident logs, training records, and asset inventories. We provide a comprehensive checklist during the planning phase and can help develop missing documentation if needed.',
      icon: HelpCircle,
      category: 'Preparation'
    }
  ];

  const categories = ['All', 'Timeline', 'Methodology', 'Requirements', 'Investment', 'Process', 'Scope', 'Frequency', 'Preparation'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">FREQUENTLY ASKED QUESTIONS</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Everything You Need to Know
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Common questions about compliance audits, our process, and what to expect when working with SAPP Security.
          </p>
        </Animated>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-sapp-blue text-white'
                  : 'bg-slate-100 text-sapp-gray hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                className="w-full p-6 text-left hover:bg-slate-100 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-sapp-blue/10 rounded-full p-2">
                      <faq.icon className="h-5 w-5 text-sapp-blue" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-sapp-dark text-left">{faq.question}</h3>
                      <span className="text-xs text-sapp-blue bg-sapp-blue/10 rounded-full px-2 py-1 mt-2 inline-block">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-sapp-gray" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {activeFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-6 bg-white">
                      <p className="text-sapp-gray leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <Animated animation="fade-up" delay={400}>
          <div className="mt-12 text-center bg-gradient-to-r from-sapp-blue/5 to-emerald-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-sapp-dark mb-4">
              Still Have Questions?
            </h3>
            <p className="text-sapp-gray mb-6">
              Our compliance experts are here to help. Schedule a consultation to discuss your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-sm text-sapp-gray">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Free initial consultation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-sapp-gray">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>No obligation assessment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-sapp-gray">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Expert guidance included</span>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default FAQSection;
