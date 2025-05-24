
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Shield, Clock, Users, Settings } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqCategories = [
    {
      icon: Shield,
      title: "Security & Technology",
      faqs: [
        {
          question: "How secure are your communication systems?",
          answer: "We use military-grade AES-256 encryption for all communications, the same standard used by government agencies. Our networks are completely isolated from public internet, and all equipment undergoes regular security auditing to ensure maximum protection."
        },
        {
          question: "Can our existing devices work with your secure networks?",
          answer: "Yes, most modern devices are compatible with our secure networks. During our pre-event assessment, we test all your equipment and provide any necessary adapters or configurations to ensure seamless integration."
        },
        {
          question: "What happens if there's a security incident during our event?",
          answer: "Our monitoring team detects threats in real-time and responds immediately. We have protocols for isolating compromised systems, alerting relevant personnel, and maintaining communication continuity while addressing any security issues."
        }
      ]
    },
    {
      icon: Clock,
      title: "Implementation & Timeline",
      faqs: [
        {
          question: "How quickly can you deploy secure communications for our event?",
          answer: "For standard deployments, we need 48-72 hours notice. However, we can provide emergency services within 24 hours if needed. Complex installations requiring custom network architecture may need 1-2 weeks planning time."
        },
        {
          question: "Do you provide training for our staff?",
          answer: "Absolutely. We include comprehensive training for all staff who will use our systems. This covers radio operation, network access protocols, security procedures, and emergency protocols. Training typically takes 30-60 minutes per person."
        },
        {
          question: "What happens to our data after the event?",
          answer: "All temporary data is securely wiped using military-grade deletion protocols. Physical documents are shredded on-site with certificates of destruction provided. We maintain no copies of your sensitive information after equipment collection."
        }
      ]
    },
    {
      icon: Users,
      title: "Service & Support",
      faqs: [
        {
          question: "Do you provide 24/7 support during events?",
          answer: "Yes, for Standard and High security levels, we provide round-the-clock on-site technical support. Our technicians monitor all systems continuously and can resolve most issues within minutes without disrupting your event."
        },
        {
          question: "Can you integrate with our venue's existing security systems?",
          answer: "We work with venue security teams and can integrate with most existing systems including CCTV, access control, and alarm systems. This creates a unified security approach that enhances overall event protection."
        },
        {
          question: "What if our event size changes last minute?",
          answer: "Our systems are designed to be scalable. We can accommodate reasonable increases in attendee numbers with 24-48 hours notice. For significant changes, we may need to adjust equipment allocation, but we'll work with you to find solutions."
        }
      ]
    },
    {
      icon: Settings,
      title: "Customization & Flexibility",
      faqs: [
        {
          question: "Can you customize services for different types of events?",
          answer: "Every deployment is customized based on your specific needs. A corporate conference requires different security measures than a music festival. We assess your venue, attendees, content sensitivity, and risk factors to create the perfect solution."
        },
        {
          question: "Do you offer services for multi-day events?",
          answer: "Yes, we specialize in extended events including conferences, festivals, and corporate retreats lasting several days. Our equipment is designed for continuous operation, and we can provide ongoing support throughout your entire event duration."
        },
        {
          question: "How do you handle international events or remote locations?",
          answer: "We have experience with events in challenging locations including remote venues and international settings. We bring our own power solutions, satellite connectivity if needed, and can coordinate with local authorities and venue requirements worldwide."
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
            Your Questions Answered
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Get clarity on how our secure communication services work, what to expect, 
            and how we can tailor solutions to your specific event needs.
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

        <Animated animation="fade-up" delay={500} className="text-center mt-12">
          <div className="bg-gradient-to-r from-sapp-blue to-accent-dark-blue rounded-xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Still Have Questions?</h3>
            <p className="mb-6 opacity-90">
              Our security experts are ready to discuss your specific requirements and provide personalized recommendations.
            </p>
            <button className="bg-white text-sapp-blue px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Speak with a Security Expert
            </button>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default FAQSection;
