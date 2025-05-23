
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Shield, Clock, Users, PoundSterling } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqCategories = [
    {
      icon: Shield,
      title: "Service & Security",
      faqs: [
        {
          question: "How do you ensure attendee privacy while monitoring devices?",
          answer: "Our device isolation technology is completely non-intrusive. Attendees keep their devices with them at all times. We simply disable specific functions like camera or network access without accessing personal data or installing any software. The process is instant and reversible."
        },
        {
          question: "What makes your TSCM sweeping different from standard security checks?",
          answer: "Our TSCM team uses military-grade detection equipment to identify sophisticated surveillance devices that standard security cannot detect. We scan for RF signals, infrared emissions, and magnetic anomalies, ensuring even the most advanced eavesdropping devices are found and neutralized."
        },
        {
          question: "Can your services be customized for different event types?",
          answer: "Absolutely. Our modular approach allows us to mix and match services based on your specific needs. A board meeting might require TSCM and device isolation, while a conference might need crowd management and network security. We tailor every deployment to your event's unique requirements."
        }
      ]
    },
    {
      icon: Clock,
      title: "Planning & Timeline",
      faqs: [
        {
          question: "How far in advance should we book your services?",
          answer: "For optimal service delivery, we recommend booking 4-6 weeks in advance. This allows time for comprehensive site assessment, custom planning, and equipment preparation. However, we can accommodate shorter timeframes for urgent requirements."
        },
        {
          question: "What happens during the initial site assessment?",
          answer: "Our security experts conduct a thorough evaluation of your venue, identifying vulnerabilities, assessing crowd flow, evaluating network infrastructure, and understanding your specific security concerns. This forms the basis for our customized service recommendations."
        },
        {
          question: "Do you coordinate with existing venue security?",
          answer: "Yes, we work seamlessly with venue security teams, local law enforcement, and event organizers. Our approach is collaborative, enhancing existing security measures rather than replacing them."
        }
      ]
    },
    {
      icon: Users,
      title: "Event Experience",
      faqs: [
        {
          question: "Will attendees notice the security measures?",
          answer: "Our approach is designed to be as unobtrusive as possible. While some measures like access control are visible, our advanced technologies like device isolation and network monitoring operate completely in the background. Attendees experience enhanced security without inconvenience."
        },
        {
          question: "How do you handle VIP or high-profile attendees?",
          answer: "We offer specialized close protection services with our team of trained military personnel. This includes discrete personal security, secure transportation coordination, and enhanced monitoring of VIP areas, all while maintaining the event's professional atmosphere."
        },
        {
          question: "What if an attendee needs to use their device during isolation?",
          answer: "Our device isolation service can be selectively disabled for specific functions or timeframes. Break periods, emergencies, or designated communication windows can be easily accommodated while maintaining overall event security."
        }
      ]
    },
    {
      icon: PoundSterling,
      title: "Investment & Value",
      faqs: [
        {
          question: "How is your service priced?",
          answer: "Pricing is based on the specific combination of services required, event duration, venue size, and attendee count. Our modular approach means you only pay for the services you need. We provide detailed quotes following the initial site assessment."
        },
        {
          question: "What's the ROI of professional event monitoring?",
          answer: "The cost of a security incident far exceeds our service fees. A single data breach averages £3.5M in costs, while reputation damage can impact business for years. Our services provide measurable protection for your investment, stakeholder relationships, and competitive advantage."
        },
        {
          question: "Are there additional costs for specialized equipment?",
          answer: "All standard equipment is included in our service fees. Specialized requirements like extended TSCM sweeping, additional secure networks, or enhanced surveillance coverage may incur additional costs, which we'll discuss transparently during planning."
        }
      ]
    }
  ];

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
            Get answers to common questions about our event monitoring services, 
            from technical capabilities to practical implementation.
          </p>
        </Animated>

        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div key={categoryIndex} className="bg-slate-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-sapp-blue/10 rounded-lg p-2">
                    <CategoryIcon className="h-5 w-5 text-sapp-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-sapp-dark">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 10 + faqIndex;
                    const isOpen = openFAQ === globalIndex;
                    
                    return (
                      <div key={faqIndex} className="bg-white rounded-lg border border-gray-200">
                        <button
                          onClick={() => setOpenFAQ(isOpen ? null : globalIndex)}
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
                        >
                          <span className="font-medium text-sapp-dark pr-4">{faq.question}</span>
                          <div className="flex-shrink-0">
                            {isOpen ? (
                              <Minus className="h-5 w-5 text-sapp-blue" />
                            ) : (
                              <Plus className="h-5 w-5 text-sapp-blue" />
                            )}
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-sapp-gray border-t border-gray-100">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
