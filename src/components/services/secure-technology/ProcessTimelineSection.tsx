
import React from 'react';
import { Phone, Calendar, Settings, Shield, Truck, CheckCircle } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const ProcessTimelineSection: React.FC = () => {
  const timelineSteps = [
    {
      icon: Phone,
      title: 'Initial Consultation',
      description: 'We assess your event requirements, security needs, and potential vulnerabilities',
      timeframe: '2-4 weeks before event',
      details: [
        'Risk assessment of venue and attendees',
        'Review of existing communication systems',
        'Custom security recommendation',
        'Budget and timeline planning'
      ]
    },
    {
      icon: Calendar,
      title: 'Security Planning',
      description: 'Detailed planning phase where we design your bespoke communication security solution',
      timeframe: '1-2 weeks before event',
      details: [
        'Equipment specification and procurement',
        'Network architecture design',
        'Personnel assignment and briefing',
        'Integration with existing security measures'
      ]
    },
    {
      icon: Settings,
      title: 'Setup & Installation',
      description: 'Professional deployment of all security equipment and systems',
      timeframe: '24-48 hours before event',
      details: [
        'Secure network installation',
        'Radio programming and testing',
        'TSCM sweeps of venue',
        'Staff training and briefing'
      ]
    },
    {
      icon: Shield,
      title: 'Event Monitoring',
      description: 'Continuous monitoring and support throughout your event',
      timeframe: 'During event',
      details: [
        '24/7 network monitoring',
        'Real-time threat detection',
        'On-site technical support',
        'Emergency response protocols'
      ]
    },
    {
      icon: Truck,
      title: 'Secure Collection',
      description: 'Safe removal and disposal of all equipment and sensitive materials',
      timeframe: 'Within 24 hours after event',
      details: [
        'Equipment retrieval and inspection',
        'Secure data wiping',
        'Document destruction',
        'Chain of custody documentation'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Post-Event Report',
      description: 'Comprehensive security report and recommendations for future events',
      timeframe: '48-72 hours after event',
      details: [
        'Security incident summary',
        'Performance metrics',
        'Lessons learned',
        'Recommendations for improvement'
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">OUR PROCESS</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            From Consultation to Completion
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Our proven six-step process ensures seamless implementation and maximum security for your event communications.
          </p>
        </Animated>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-0.5 w-1 bg-gradient-to-b from-sapp-blue to-accent-dark-blue opacity-20 h-full"></div>

          <div className="space-y-12">
            {timelineSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <Animated key={index} animation="fade-up" delay={100 * index}>
                  <div className={`flex flex-col lg:flex-row items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`lg:w-5/12 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-sapp-blue/10 rounded-lg p-2">
                            <StepIcon className="h-6 w-6 text-sapp-blue" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-sapp-dark">{step.title}</h3>
                            <p className="text-sm text-sapp-blue font-medium">{step.timeframe}</p>
                          </div>
                        </div>
                        
                        <p className="text-sapp-gray mb-4">{step.description}</p>
                        
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center gap-2 text-sm text-sapp-gray">
                              <span className="text-sapp-blue">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Timeline Icon */}
                    <div className="lg:w-2/12 flex justify-center">
                      <div className="bg-sapp-blue rounded-full p-4 shadow-lg relative z-10">
                        <StepIcon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* Spacer for alternate layout */}
                    <div className="lg:w-5/12 hidden lg:block"></div>
                  </div>
                </Animated>
              );
            })}
          </div>
        </div>

        <Animated animation="fade-up" delay={600} className="text-center mt-12">
          <div className="bg-gradient-to-r from-sapp-blue to-accent-dark-blue rounded-xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Ready to Secure Your Event Communications?</h3>
            <p className="mb-6 opacity-90">
              Our process begins with a free consultation to understand your specific needs and recommend the right solution.
            </p>
            <button className="bg-white text-sapp-blue px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Your Security Journey
            </button>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default ProcessTimelineSection;
