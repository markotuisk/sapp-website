
import React from 'react';
import { motion } from 'framer-motion';
import { Animated } from '@/components/ui/AnimatedElements';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How disruptive is a physical penetration test?",
      answer: "Physical penetration tests are designed to be minimally disruptive. We work with you to determine appropriate testing windows and establish clear rules of engagement that limit any potential operational impact. Our primary approach is non-destructive, and we avoid triggering alarms or creating disturbances unless specifically agreed upon beforehand."
    },
    {
      question: "Is there any risk of damage during testing?",
      answer: "We employ non-destructive testing methods by default to minimize any risk of damage. Any potentially destructive testing methods would only be employed with explicit client approval and under carefully controlled conditions. All our testers are highly trained professionals who prioritize your property's safety and integrity."
    },
    {
      question: "How often should we conduct penetration testing?",
      answer: "For most organizations, we recommend conducting physical penetration testing annually or after significant changes to your facilities, security systems, or personnel. Organizations in high-risk industries or with stringent compliance requirements may benefit from more frequent testing, such as bi-annually."
    },
    {
      question: "Who knows about the penetration test?",
      answer: "This depends on the type of test. For black box testing, knowledge is limited to a small group of stakeholders to maintain the element of surprise and provide the most realistic assessment. For other testing types, awareness may be broader. We'll work with you to determine the appropriate level of awareness based on your testing objectives."
    },
    {
      question: "How do you handle sensitive information discovered during testing?",
      answer: "All information gathered during testing is treated with the utmost confidentiality. Our team follows strict data handling protocols, and all findings are securely communicated only to authorized stakeholders. Our reports are encrypted and delivered through secure channels, and we can sign additional NDAs if required."
    },
    {
      question: "What qualifications do your penetration testers have?",
      answer: "Our penetration testers hold industry-recognized certifications such as CPP (Certified Protection Professional), PSP (Physical Security Professional), CISSP, and CEH (Certified Ethical Hacker). They have extensive backgrounds in physical security, law enforcement, military, or corporate security, with specialized training in penetration testing methodologies."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Animated animation="fade-up">
            <h3 className="uppercase text-sapp-blue text-sm font-medium tracking-wider mb-2">Common Questions</h3>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sapp-gray">
              We understand you may have questions about our physical penetration testing services.
              Here are answers to the most common queries.
            </p>
          </Animated>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`} className="border border-gray-100 rounded-lg mb-4 overflow-hidden shadow-sm">
                  <AccordionTrigger className="px-5 py-4 hover:bg-slate-50 text-left font-medium text-sapp-dark">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 py-4 bg-white text-sapp-gray">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <Animated animation="fade-up" delay={400}>
            <p className="text-sapp-gray mb-4">
              Have a question that's not answered here?
            </p>
            <div className="inline-block bg-slate-50 px-5 py-3 rounded-lg border border-gray-100">
              <p className="text-sapp-dark font-medium flex items-center justify-center">
                Contact us at{" "}
                <a href="mailto:security@sappsecurity.com" className="text-sapp-blue ml-1 hover:underline">
                  security@sappsecurity.com
                </a>
              </p>
            </div>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
