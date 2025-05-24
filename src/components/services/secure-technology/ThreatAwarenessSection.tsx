
import React from 'react';
import { Shield, Wifi, Radio, FileText, AlertTriangle } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const ThreatAwarenessSection: React.FC = () => {
  const threats = [
    {
      icon: Radio,
      title: "Intercepted Communications",
      description: "Unencrypted radios and calls can be easily monitored by anyone with basic equipment",
      impact: "Operational plans and sensitive discussions exposed to competitors or bad actors"
    },
    {
      icon: Wifi,
      title: "Unsecured Networks",
      description: "Public WiFi and unencrypted networks expose all data transmitted during events",
      impact: "Attendee data, payment information, and confidential files at risk of theft"
    },
    {
      icon: FileText,
      title: "Document Vulnerabilities",
      description: "Physical and digital files left unsecured can be accessed by unauthorized personnel",
      impact: "Strategic plans, attendee lists, and operational details compromised"
    },
    {
      icon: AlertTriangle,
      title: "Surveillance Devices",
      description: "Hidden recording devices can capture private conversations and confidential information",
      impact: "Complete breach of privacy and potential blackmail or competitive disadvantage"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-red-500/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-red-600 tracking-wider">COMMUNICATION THREATS</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Why Your Event Communications Are at Risk
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Every event generates valuable information that bad actors want to access. 
            Understanding these threats is the first step to protecting your organisation.
          </p>
        </Animated>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {threats.map((threat, index) => {
            const ThreatIcon = threat.icon;
            return (
              <Animated key={index} animation="fade-up" delay={100 * (index + 1)}>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-500/10 rounded-lg p-3 flex-shrink-0">
                      <ThreatIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sapp-dark mb-2">{threat.title}</h4>
                      <p className="text-sapp-gray mb-3 text-sm">{threat.description}</p>
                      <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-500">
                        <p className="text-red-700 text-xs font-medium">Impact: {threat.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Animated>
            );
          })}
        </div>

        <Animated animation="fade-up" delay={500} className="text-center">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-6">The Cost of Inadequate Communication Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-yellow-300">£3.5M</div>
                <p className="text-sm opacity-90">average cost of a data breach in the UK</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">72%</div>
                <p className="text-sm opacity-90">of events use unsecured communications</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">24 hours</div>
                <p className="text-sm opacity-90">average time for information to reach competitors</p>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default ThreatAwarenessSection;
