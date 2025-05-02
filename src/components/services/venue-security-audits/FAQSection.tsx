
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs: FAQ[] = [
    {
      question: "What is involved in a venue security audit?",
      answer: "A venue security audit is a comprehensive assessment of a location's security measures and vulnerabilities. We examine physical security, access control systems, surveillance capabilities, staff protocols, and emergency response procedures to ensure your event space meets security requirements for executive and corporate gatherings."
    },
    {
      question: "How long does a venue security audit take?",
      answer: "The duration depends on the size and complexity of the venue. A standard audit typically takes 1-2 business days for assessment and 3-5 business days for full report delivery. Expedited services are available for urgent situations."
    },
    {
      question: "Can you audit a venue before we sign a contract with them?",
      answer: "Yes, we frequently conduct pre-contract audits to help organizations evaluate potential venues before making financial commitments. This helps you identify any security issues that might require additional investment to remedy."
    },
    {
      question: "What do you provide after completing the audit?",
      answer: "You'll receive a detailed report documenting all findings, including vulnerabilities identified, security strengths, and prioritized recommendations for improvements. We also provide implementation guidance and can assist with security enhancements if requested."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up">
          <div className="text-center mb-12">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Common Questions</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-sapp-gray max-w-3xl mx-auto">
              Find answers to commonly asked questions about our venue security audit services.
            </p>
          </div>
        </Animated>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-4"
            >
              <div 
                className={`border ${openIndex === index ? 'border-sapp-blue/30' : 'border-gray-200'} rounded-lg overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md' : ''}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-sapp-dark">{faq.question}</h3>
                  <div className="flex-shrink-0 ml-4">
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-sapp-blue" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-sapp-gray" />
                    )}
                  </div>
                </button>
                
                <div 
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="p-5 pt-0 border-t border-gray-100">
                    <p className="text-sapp-gray">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
