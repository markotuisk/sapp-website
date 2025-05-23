
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Briefcase, Award, CheckCircle } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const ScenarioSection: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState(0);

  const scenarios = [
    {
      icon: Building2,
      title: "Board Meeting",
      subtitle: "Confidential Strategic Planning",
      challenge: "High-stakes M&A discussions requiring absolute privacy and security",
      threats: ["Corporate espionage", "Information leaks", "Unauthorized recording", "Network intrusion"],
      solution: "Complete TSCM sweeping, device isolation, secure network, and document security",
      outcome: "100% confidentiality maintained, strategic advantage preserved",
      services: ["TSCM Inspection", "Device Isolation", "Secure Networks", "Document Security"]
    },
    {
      icon: Users,
      title: "Annual Conference",
      subtitle: "Multi-Day Corporate Event",
      challenge: "500+ attendees with varying security clearances and device policies",
      threats: ["Data breaches", "Unauthorized access", "Crowd incidents", "Recording violations"],
      solution: "Tiered access control, selective device monitoring, crowd management, and incident response",
      outcome: "Zero security incidents, positive attendee feedback, brand protection",
      services: ["Access Control", "Surveillance", "Crowd Management", "Incident Response"]
    },
    {
      icon: Briefcase,
      title: "Product Launch",
      subtitle: "Confidential Technology Reveal",
      challenge: "Protecting proprietary technology from industrial espionage",
      threats: ["Technology theft", "Media leaks", "Competitor infiltration", "IP violations"],
      solution: "Multi-layered security with advanced surveillance and network protection",
      outcome: "Successful launch with maintained competitive advantage",
      services: ["TSCM Inspection", "Surveillance", "Access Control", "Network Security"]
    },
    {
      icon: Award,
      title: "VIP Reception",
      subtitle: "High-Profile Networking Event",
      challenge: "Protecting dignitaries while maintaining elegant atmosphere",
      threats: ["Personal security risks", "Privacy violations", "Reputation damage", "Protocol breaches"],
      solution: "Discreet protection with advanced monitoring and close protection services",
      outcome: "Seamless event execution with enhanced reputation",
      services: ["Close Protection", "Surveillance", "Device Control", "Incident Response"]
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-orange-500/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-orange-600 tracking-wider">REAL-WORLD SCENARIOS</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Tailored Solutions for Every Event Type
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            See how our customizable monitoring services address specific challenges 
            across different corporate event scenarios.
          </p>
        </Animated>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {scenarios.map((scenario, index) => {
              const ScenarioIcon = scenario.icon;
              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveScenario(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeScenario === index
                      ? 'bg-sapp-blue text-white shadow-lg scale-105'
                      : 'bg-white hover:bg-slate-50 hover:shadow-md'
                  }`}
                  whileHover={{ scale: activeScenario === index ? 1.05 : 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      activeScenario === index ? 'bg-white/20' : 'bg-sapp-blue/10'
                    }`}>
                      <ScenarioIcon className={`h-6 w-6 ${
                        activeScenario === index ? 'text-white' : 'text-sapp-blue'
                      }`} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${
                        activeScenario === index ? 'text-white' : 'text-sapp-dark'
                      }`}>
                        {scenario.title}
                      </h4>
                      <p className={`text-sm ${
                        activeScenario === index ? 'text-white/80' : 'text-sapp-gray'
                      }`}>
                        {scenario.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={activeScenario}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              {React.createElement(scenarios[activeScenario].icon, { 
                className: "h-8 w-8 text-sapp-blue" 
              })}
              <div>
                <h3 className="text-xl font-bold text-sapp-dark">
                  {scenarios[activeScenario].title}
                </h3>
                <p className="text-sm text-sapp-gray">
                  {scenarios[activeScenario].subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-sapp-dark mb-2">Challenge:</h4>
                <p className="text-sapp-gray text-sm">{scenarios[activeScenario].challenge}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sapp-dark mb-3">Key Threats:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {scenarios[activeScenario].threats.map((threat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sapp-gray">{threat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sapp-dark mb-2">Our Solution:</h4>
                <p className="text-sapp-gray text-sm mb-3">{scenarios[activeScenario].solution}</p>
                <div className="grid grid-cols-2 gap-2">
                  {scenarios[activeScenario].services.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-sapp-gray">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-4 border-l-4 border-emerald-500">
                <h4 className="font-semibold text-emerald-800 mb-2">Outcome:</h4>
                <p className="text-emerald-700 text-sm">{scenarios[activeScenario].outcome}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScenarioSection;
