
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, DollarSign, Building, Users, ChevronRight, CheckCircle, Lightbulb } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const ChallengesSection: React.FC = () => {
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);

  const challenges = [
    {
      icon: DollarSign,
      title: 'Resource Allocation',
      problem: 'Limited budget and time constraints can make comprehensive compliance audits seem overwhelming.',
      solution: 'We define a clear scope to optimize time and budget, focusing on critical areas with the highest risk impact. Our phased approach allows you to spread costs and see immediate value.',
      benefits: ['Prioritized risk-based assessment', 'Flexible payment options', 'Quick wins identification'],
      color: 'emerald'
    },
    {
      icon: Building,
      title: 'Complex Environments',
      problem: 'Organizations with multiple facilities, remote offices, or diverse technology environments face unique audit challenges.',
      solution: 'We tailor audits to account for diverse facilities and provide remote assessment capabilities. Our team has experience across various environments from data centers to distributed offices.',
      benefits: ['Multi-site coordination', 'Remote assessment options', 'Unified reporting framework'],
      color: 'blue'
    },
    {
      icon: AlertTriangle,
      title: 'Maintaining Ongoing Compliance',
      problem: 'Achieving initial certification is one thing; maintaining compliance over time requires continuous effort and monitoring.',
      solution: 'We provide guidance on surveillance audits, continuous improvement processes, and automated monitoring systems. Our clients receive ongoing support between formal audit cycles.',
      benefits: ['Automated compliance monitoring', 'Regular health checks', 'Proactive gap identification'],
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Stakeholder Buy-In',
      problem: 'Getting leadership support and staff engagement for compliance initiatives can be challenging without clear business justification.',
      solution: 'We engage leadership early to secure support and align audit goals with business objectives. Our approach emphasizes business value and ROI rather than just compliance checkboxes.',
      benefits: ['Executive-level reporting', 'Business case development', 'Clear ROI demonstration'],
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-200',
      blue: 'bg-blue-500/10 text-blue-500 border-blue-200',
      purple: 'bg-purple-500/10 text-purple-500 border-purple-200',
      orange: 'bg-orange-500/10 text-orange-500 border-orange-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">SOLUTIONS & STRATEGIES</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Overcoming Compliance Challenges
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            We understand the common obstacles organizations face when implementing compliance programs 
            and have developed proven strategies to address each challenge effectively.
          </p>
        </Animated>

        <div className="space-y-6">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setActiveChallenge(activeChallenge === index ? null : index)}
                className="w-full p-6 text-left hover:bg-slate-50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`rounded-full p-3 ${getColorClasses(challenge.color)}`}>
                      <challenge.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-sapp-dark">{challenge.title}</h3>
                      <p className="text-sapp-gray text-sm mt-1">Click to see our solution approach</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeChallenge === index ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-5 w-5 text-sapp-gray" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {activeChallenge === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-6 bg-slate-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Problem */}
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <h4 className="font-semibold text-sapp-dark">The Challenge</h4>
                          </div>
                          <p className="text-sapp-gray mb-6">{challenge.problem}</p>
                        </div>

                        {/* Solution */}
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <Lightbulb className="h-5 w-5 text-emerald-500" />
                            <h4 className="font-semibold text-sapp-dark">Our Solution</h4>
                          </div>
                          <p className="text-sapp-gray mb-6">{challenge.solution}</p>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-semibold text-sapp-dark mb-4 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                          Key Benefits
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {challenge.benefits.map((benefit, benefitIndex) => (
                            <motion.div
                              key={benefitIndex}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: benefitIndex * 0.1 }}
                              className="bg-white rounded-lg p-4 border border-gray-200"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="text-sm font-medium text-sapp-dark">{benefit}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Success Metrics */}
        <Animated animation="fade-up" delay={600}>
          <div className="mt-16 bg-gradient-to-r from-sapp-blue/5 to-emerald-50 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-sapp-dark mb-4">
                Proven Results Across Industries
              </h3>
              <p className="text-sapp-gray">
                Our strategic approach to compliance challenges delivers measurable outcomes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">95%</div>
                <p className="text-sm text-sapp-gray">First-time certification success rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
                <p className="text-sm text-sapp-gray">Average time reduction to certification</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                <p className="text-sm text-sapp-gray">Client satisfaction with audit process</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">40%</div>
                <p className="text-sm text-sapp-gray">Reduction in compliance-related incidents</p>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default ChallengesSection;
