
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "What exactly is TSCM?",
      answer: "TSCM stands for Technical Surveillance Countermeasures. It's the process of detecting, locating, and neutralizing electronic surveillance devices (bugs), technical security hazards, and eavesdropping technologies. TSCM services include physical inspections, electronic sweeps, and radio frequency (RF) analysis to identify potential security threats."
    },
    {
      question: "How do I know if I need a TSCM inspection?",
      answer: "Consider a TSCM inspection if you've experienced unusual events such as information leaks, competitors with unexplained knowledge of your plans, strange noises on phone calls, or if your premises have been accessed by unauthorized individuals. Additionally, regular inspections are recommended for high-security environments, executive offices, and before important confidential meetings."
    },
    {
      question: "How long does a typical TSCM inspection take?",
      answer: "The duration depends on the size and complexity of the area being inspected. A typical office or residential sweep might take 2-6 hours, while larger corporate facilities could require multiple days. We work around your schedule to minimize disruption, including conducting sweeps during off-hours if necessary."
    },
    {
      question: "Are TSCM services discreet?",
      answer: "Absolutely. We place the highest priority on discretion and confidentiality. Our technicians arrive in unmarked vehicles, dress appropriately for the environment, and can work during off-hours. All findings are reported directly to designated personnel only, and we sign comprehensive NDAs before beginning any work."
    },
    {
      question: "What happens if you find a surveillance device?",
      answer: "If a device is discovered, we follow a careful protocol. We document its location and technical specifications, and consult with you about the best course of action. Options include leaving the device in place while implementing countermeasures (to mislead eavesdroppers), removing it for forensic analysis, or involving law enforcement. We provide guidance based on your specific situation and security needs."
    },
    {
      question: "How often should TSCM inspections be conducted?",
      answer: "For high-security environments, quarterly inspections are recommended. For standard business environments, bi-annual sweeps are typically sufficient. However, we also recommend inspections after specific events such as termination of sensitive positions, before/after major business deals, following renovation work by outside contractors, or prior to important confidential meetings."
    },
    {
      question: "Can you check personal devices like phones and laptops?",
      answer: "Yes, we offer technical security evaluations for personal devices to check for spyware, malware, and unauthorized monitoring applications. These checks can be included as part of a comprehensive TSCM service or provided as standalone assessments."
    },
    {
      question: "What's included in the final report?",
      answer: "Our comprehensive reports include detailed findings from the inspection, technical analysis of any anomalies or devices found, photographic documentation, risk assessment, and specific recommendations for improving security. The report is delivered in a secure format to authorized personnel only."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-sapp-gray">
            Common questions about our TSCM services
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-b border-gray-200">
                <AccordionTrigger className="text-left font-medium text-sapp-dark hover:text-sapp-blue py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sapp-gray pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sapp-gray max-w-2xl mx-auto">
            Have more questions? Contact our TSCM specialists for confidential assistance with your specific concerns.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
